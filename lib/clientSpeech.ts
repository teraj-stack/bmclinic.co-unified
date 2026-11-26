'use client';

// Minimal 1-sample silent WAV data URI for unlocking HTMLAudioElement on user click gesture
const SILENT_WAV_DATA_URI =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

interface SpeechRecognitionAltLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAltLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export interface SpeakResult {
  ok: boolean;
  engine: 'macos-tts' | 'webspeech' | 'blocked' | 'empty';
  audioUrl?: string;
  error?: string;
}

export class ClientVoiceOutput {
  private audioEl: HTMLAudioElement | null = null;
  private activeObjectUrl: string | null = null;
  private unlocked = false;

  private ensureAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioEl) {
      this.audioEl = new Audio();
      this.audioEl.preload = 'auto';
    }
    return this.audioEl;
  }

  /**
   * Call synchronously inside a click/tap handler before async fetch() calls
   * so Safari/Chrome keep audio playback permission unlocked.
   */
  unlockOnGesture(): void {
    const audio = this.ensureAudio();
    if (!audio || this.unlocked) return;
    try {
      audio.src = SILENT_WAV_DATA_URI;
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          audio.pause();
          audio.currentTime = 0;
          this.unlocked = true;
        }).catch(() => {
          // Ignore silent unlock rejection
        });
      }
    } catch {
      // Ignore
    }
  }

  stop(): void {
    if (this.audioEl) {
      try {
        this.audioEl.pause();
        this.audioEl.currentTime = 0;
      } catch {
        // Ignore
      }
    }
    if (this.activeObjectUrl) {
      URL.revokeObjectURL(this.activeObjectUrl);
      this.activeObjectUrl = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }

  private speakWebSpeech(text: string): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'pl-PL';
      utter.rate = 1.02;
      const voices = window.speechSynthesis.getVoices();
      const plVoice = voices.find((v) => v.lang.toLowerCase().startsWith('pl'));
      if (plVoice) utter.voice = plVoice;
      window.speechSynthesis.speak(utter);
      return true;
    } catch {
      return false;
    }
  }

  async speak(text: string, voice = 'Zosia (Enhanced)'): Promise<SpeakResult> {
    const clean = text.trim();
    if (!clean) return { ok: false, engine: 'empty' };

    this.stop();

    try {
      const res = await fetch('/api/agent-llm/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: clean, voice }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        this.activeObjectUrl = url;
        const audio = this.ensureAudio();
        if (audio) {
          audio.src = url;
          try {
            await audio.play();
            return { ok: true, engine: 'macos-tts', audioUrl: url };
          } catch (playErr) {
            return {
              ok: false,
              engine: 'blocked',
              audioUrl: url,
              error:
                playErr instanceof Error
                  ? playErr.message
                  : 'Przeglądarka zablokowała autoodtwarzanie — użyj przycisku Odtwórz.',
            };
          }
        }
      }
    } catch {
      // Fall back to browser speechSynthesis
    }

    const fallbackOk = this.speakWebSpeech(clean);
    return {
      ok: fallbackOk,
      engine: fallbackOk ? 'webspeech' : 'blocked',
    };
  }
}

export interface HybridDictationSession {
  stop: () => void;
}

export async function startHybridDictation(handlers: {
  onInterim: (text: string) => void;
  onFinalText: (text: string, source: 'webspeech' | 'server-transcribe') => void;
  onError: (msg: string) => void;
  onEnd: () => void;
}): Promise<HybridDictationSession | null> {
  if (typeof window === 'undefined') return null;

  const win = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const RecognitionCtor = win.SpeechRecognition || win.webkitSpeechRecognition;

  let recognition: SpeechRecognitionLike | null = null;
  let recorder: MediaRecorder | null = null;
  let mediaStream: MediaStream | null = null;
  const audioChunks: Blob[] = [];

  let finalizedText = '';
  let latestInterim = '';
  let stoppedManually = false;
  let recognitionFailed = false;
  let deliveredResult = false;

  const deliverIfNeeded = async () => {
    if (deliveredResult) return;
    const combined = `${finalizedText} ${latestInterim}`.trim();
    if (combined) {
      deliveredResult = true;
      handlers.onFinalText(combined, 'webspeech');
      return;
    }

    if (audioChunks.length > 0) {
      try {
        const blob = new Blob(audioChunks, { type: recorder?.mimeType || 'audio/webm' });
        if (blob.size > 256) {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const str = String(reader.result || '');
              resolve(str.includes(',') ? str.split(',')[1] : str);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          const resp = await fetch('/api/ai/transcribe-voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64,
              mimeType: blob.type || 'audio/webm',
            }),
          });
          const data = (await resp.json().catch(() => ({}))) as { transcript?: string };
          if (resp.ok && data.transcript?.trim()) {
            deliveredResult = true;
            handlers.onFinalText(data.transcript.trim(), 'server-transcribe');
            return;
          }
        }
      } catch {
        // Handled below
      }
    }

    handlers.onError(
      'Nie rozpoznano mowy z mikrofonu (brak transkrypcji Web Speech ani klucza Gemini STT). Możesz wpisać lub przetestować lektora.'
    );
  };

  if (navigator.mediaDevices?.getUserMedia) {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (typeof MediaRecorder !== 'undefined') {
        recorder = new MediaRecorder(mediaStream);
        recorder.ondataavailable = (ev) => {
          if (ev.data.size > 0) audioChunks.push(ev.data);
        };
        recorder.start();
      }
    } catch {
      // Continue with SpeechRecognition alone if microphone permission handled there
    }
  }

  if (RecognitionCtor) {
    try {
      recognition = new RecognitionCtor();
      recognition.lang = 'pl-PL';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (ev: SpeechRecognitionEventLike) => {
        let interim = '';
        let newlyFinal = '';
        for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
          const piece = ev.results[i]?.[0]?.transcript || '';
          if (ev.results[i]?.isFinal) {
            newlyFinal += `${piece.trim()} `;
          } else {
            interim += piece;
          }
        }
        if (newlyFinal.trim()) {
          finalizedText = `${finalizedText} ${newlyFinal.trim()}`.trim();
        }
        latestInterim = interim.trim();
        handlers.onInterim(`${finalizedText} ${latestInterim}`.trim());
      };

      recognition.onerror = (ev) => {
        if (!stoppedManually && ev.error && ev.error !== 'no-speech' && ev.error !== 'aborted') {
          recognitionFailed = true;
          if (recorder && recorder.state === 'recording') {
            handlers.onInterim('Nagrywam audio (Web Speech offline — kliknij Stop po zakończeniu)...');
          } else {
            handlers.onError(`Mikrofon Web Speech: ${ev.error}`);
          }
        }
      };

      recognition.onend = () => {
        // If Web Speech failed while MediaRecorder is still actively recording, keep recording until user clicks Stop
        if (recognitionFailed && !stoppedManually && recorder && recorder.state === 'recording') {
          return;
        }
        if (recorder && recorder.state !== 'inactive') {
          recorder.onstop = () => {
            mediaStream?.getTracks().forEach((t) => t.stop());
            void deliverIfNeeded().finally(handlers.onEnd);
          };
          recorder.stop();
        } else {
          mediaStream?.getTracks().forEach((t) => t.stop());
          void deliverIfNeeded().finally(handlers.onEnd);
        }
      };

      recognition.start();
    } catch (err) {
      recognition = null;
      if (!recorder) {
        mediaStream?.getTracks().forEach((t) => t.stop());
        handlers.onError(err instanceof Error ? err.message : 'Błąd uruchamiania mikrofonu.');
        return null;
      }
    }
  } else if (!recorder) {
    mediaStream?.getTracks().forEach((t) => t.stop());
    handlers.onError('Przeglądarka blokuje mikrofon lub nie wspiera Web Speech / MediaRecorder.');
    return null;
  }

  return {
    stop: () => {
      stoppedManually = true;
      if (recognition) {
        try {
          recognition.stop();
        } catch {
          // Ignore
        }
      } else if (recorder && recorder.state !== 'inactive') {
        recorder.onstop = () => {
          mediaStream?.getTracks().forEach((t) => t.stop());
          void deliverIfNeeded().finally(handlers.onEnd);
        };
        recorder.stop();
      } else {
        mediaStream?.getTracks().forEach((t) => t.stop());
        void deliverIfNeeded().finally(handlers.onEnd);
      }
    },
  };
}
