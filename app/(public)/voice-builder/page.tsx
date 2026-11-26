'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Cpu,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ListTodo,
  ArrowLeft,
  Activity,
  ExternalLink,
  Play,
} from 'lucide-react';
import {
  ClientVoiceOutput,
  startHybridDictation,
  type HybridDictationSession,
} from '@/lib/clientSpeech';

interface ServiceProbe {
  id: string;
  label: string;
  port: number;
  url: string;
  online: boolean;
}

interface BuildTaskRecord {
  id: number | string;
  title: string;
  status: string;
  priority: string;
}

interface VoiceJournalEntry {
  id: string;
  timestamp: string;
  transcript: string;
  intent: string;
  summary: string;
  spokenReplyPl: string;
  model: string;
}

interface VoiceBuilderStatus {
  ollamaOnline: boolean;
  voiceModelReady: boolean;
  voiceModelName: string;
  guardModelReady: boolean;
  baseModelName: string;
  modelfileReady: boolean;
  services: ServiceProbe[];
  tasksSummary: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    recentTasks: BuildTaskRecord[];
  };
  journalEntries: VoiceJournalEntry[];
}

interface VoiceCommandResult {
  blocked: boolean;
  guard: {
    classification: 'pass' | 'block';
    violation_types: string[];
    cwe_codes: string[];
    engine: string;
  };
  engine: string;
  parsed: {
    intent: string;
    target: string;
    taskTitle: string;
    taskPriority: string;
    notes: string;
    openUrl: string;
    spokenReplyPl: string;
    nextSteps: string[];
    confidence: number;
  };
  executed: boolean;
  actionResult: Record<string, unknown> | null;
  statusSnapshot: VoiceBuilderStatus;
}

const VOICE_PRESETS = [
  'Sprawdź status wszystkich serwerów i portów',
  'Zweryfikuj typy TypeScript i stan budowy',
  'Dodaj zadanie o wysokim priorytecie: przetestować integrację głosową w Chronos Vault',
  'Zanotuj postęp budowy: uruchomiono lokalny model bm-voice-builder oraz dashboard VibeKit',
  'Pokaż aktualną listę zadań z tablicy budowy',
];

export default function VoiceBuilderPage() {
  const [status, setStatus] = useState<VoiceBuilderStatus | null>(null);
  const [transcript, setTranscript] = useState(VOICE_PRESETS[0]);
  const [interimText, setInterimText] = useState('');
  const [listening, setListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speakingStatus, setSpeakingStatus] = useState<string | null>(null);
  const [fallbackAudioUrl, setFallbackAudioUrl] = useState<string | null>(null);
  const [executeAction, setExecuteAction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VoiceCommandResult | null>(null);

  const voiceOutRef = useRef<ClientVoiceOutput | null>(null);
  const dictationRef = useRef<HybridDictationSession | null>(null);

  const getVoiceOut = () => {
    if (!voiceOutRef.current) {
      voiceOutRef.current = new ClientVoiceOutput();
    }
    return voiceOutRef.current;
  };

  const speakPolish = useCallback(
    async (text: string) => {
      if (!autoSpeak || !text.trim()) return;
      setSpeakingStatus('Synteza mowy PL...');
      setFallbackAudioUrl(null);
      const res = await getVoiceOut().speak(text, 'Zosia (Enhanced)');
      if (res.ok) {
        setSpeakingStatus(`Odtworzono (${res.engine})`);
        if (res.audioUrl) setFallbackAudioUrl(res.audioUrl);
      } else {
        setSpeakingStatus(res.error || 'Kliknij Odtwórz audio poniżej');
        if (res.audioUrl) setFallbackAudioUrl(res.audioUrl);
      }
    },
    [autoSpeak]
  );

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/voice-builder/status', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as VoiceBuilderStatus;
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się pobrać statusu');
    }
  }, []);

  useEffect(() => {
    void fetchStatus();
    return () => {
      voiceOutRef.current?.stop();
      dictationRef.current?.stop();
    };
  }, [fetchStatus]);

  const runCommand = useCallback(
    async (textToSend?: string) => {
      getVoiceOut().unlockOnGesture();
      const input = (textToSend ?? transcript).trim();
      if (!input) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/voice-builder/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: input, execute: executeAction }),
        });
        const data = (await res.json()) as VoiceCommandResult & { error?: string };
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        setResult(data);
        if (data.statusSnapshot) setStatus(data.statusSnapshot);
        void speakPolish(data.parsed.spokenReplyPl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Błąd wykonania polecenia');
      } finally {
        setLoading(false);
      }
    },
    [transcript, executeAction, speakPolish]
  );

  const toggleMicrophone = async () => {
    getVoiceOut().unlockOnGesture();
    if (listening && dictationRef.current) {
      dictationRef.current.stop();
      dictationRef.current = null;
      return;
    }

    setError(null);
    setInterimText('Inicjowanie mikrofonu...');
    setListening(true);

    const session = await startHybridDictation({
      onInterim: (text) => {
        setInterimText(text);
        if (text.trim()) setTranscript(text);
      },
      onFinalText: (text) => {
        setTranscript(text);
        void runCommand(text);
      },
      onError: (msg) => {
        setError(msg);
      },
      onEnd: () => {
        setListening(false);
        setInterimText('');
        dictationRef.current = null;
      },
    });

    if (!session) {
      setListening(false);
      setInterimText('');
      return;
    }
    dictationRef.current = session;
  };

  return (
    <div className="min-h-screen px-4 py-8 text-[#f5f4f1] sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section className="bm-bento-card mb-8 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dfc6a7]/35 bg-[#dfc6a7]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#dfc6a7] uppercase">
                <Mic className="h-3.5 w-3.5" />
                BM Clinic · Voice Build LLM (`bm-voice-builder:latest`)
              </div>
              <h1 className="font-serif text-3xl font-normal tracking-tight text-[#f5f4f1] sm:text-5xl">
                Sterowanie budową{' '}
                <em className="font-normal italic text-[#dfc6a7]">poleceniami głosowymi.</em>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8c2c5]">
                Lokalny model <span className="font-mono text-[#e9dccb]">bm-voice-builder:latest</span> z hybrydowym
                rozpoznawaniem mowy (Web Speech + MediaRecorder) oraz lektorem macOS WAV przez{' '}
                <span className="font-mono text-[#e9dccb]">/api/agent-llm/tts</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#dfc6a7]/35 bg-[#131c23]/80 px-4 py-2 text-xs font-semibold text-[#f5f4f1] transition hover:border-[#dfc6a7] hover:text-[#dfc6a7]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Wróć do menu
              </Link>
              <Link
                href="/agent-llm"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#dfc6a7]/45 bg-[#dfc6a7]/15 px-4 py-2 text-xs font-semibold text-[#dfc6a7] transition hover:border-[#dfc6a7] hover:bg-[#dfc6a7]/25"
              >
                <Cpu className="h-3.5 w-3.5" />
                Agent LLM
              </Link>
              <Link
                href="/superagent"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#d4d8d4] transition hover:border-[#dfc6a7]/50 hover:text-white"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#dfc6a7]" />
                Superagent Guard
              </Link>
              <Link
                href="/taskkill/"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#e9dccb] px-4 py-2 text-xs font-semibold text-[#131c23] transition hover:bg-[#dfc6a7]"
              >
                <ListTodo className="h-3.5 w-3.5" />
                Drzewo Zadań ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Status Grid */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bm-bento-card p-5">
            <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-[#b8c2c5] uppercase">
              <span>Model Głosowy LLM</span>
              <Cpu className="h-4 w-4 text-[#dfc6a7]" />
            </div>
            <div className="mt-2 font-serif text-xl text-[#f5f4f1]">
              {status?.voiceModelReady ? status.voiceModelName : 'Ładowanie...'}
            </div>
            <div className="mt-1 text-xs text-[#dfc6a7]">
              {status?.ollamaOnline ? `Baza: ${status.baseModelName}` : 'Ollama offline'}
            </div>
          </div>

          <div className="bm-bento-card p-5">
            <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-[#b8c2c5] uppercase">
              <span>Bramka Guard</span>
              <ShieldCheck className="h-4 w-4 text-[#dfc6a7]" />
            </div>
            <div className="mt-2 font-serif text-xl text-[#f5f4f1]">
              {status?.guardModelReady ? 'superagent-guard-local' : 'Lokalne reguły'}
            </div>
            <div className="mt-1 text-xs text-[#b8c2c5]">Walidacja intencji przed akcją</div>
          </div>

          <div className="bm-bento-card p-5">
            <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-[#b8c2c5] uppercase">
              <span>Aktywne Porty</span>
              <Activity className="h-4 w-4 text-[#dfc6a7]" />
            </div>
            <div className="mt-2 font-serif text-xl text-[#f5f4f1]">
              {status
                ? `${status.services.filter((s) => s.online).length} / ${status.services.length} online`
                : '...'}
            </div>
            <div className="mt-1 text-xs text-[#b8c2c5]">3016 · 3017 · 3018 · 3019 · 11434</div>
          </div>

          <div className="bm-bento-card p-5">
            <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-[#b8c2c5] uppercase">
              <span>Lektor macOS TTS</span>
              <Volume2 className="h-4 w-4 text-[#dfc6a7]" />
            </div>
            <div className="mt-2 font-serif text-xl text-[#f5f4f1]">Zosia (Enhanced)</div>
            <div className="mt-1 truncate text-xs text-[#b8c2c5]">
              {speakingStatus || (autoSpeak ? 'Auto-odtwarzanie WŁ.' : 'Wyciszony')}
            </div>
          </div>
        </section>

        {/* Main Workspace */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Voice Command Panel */}
          <section className="bm-bento-card p-6 lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl font-normal text-[#f5f4f1]">
                Konsola poleceń głosowych
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    getVoiceOut().unlockOnGesture();
                    if (autoSpeak) getVoiceOut().stop();
                    setAutoSpeak((v) => !v);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[#d4d8d4] transition hover:border-[#dfc6a7]/50"
                >
                  {autoSpeak ? (
                    <Volume2 className="h-3.5 w-3.5 text-[#dfc6a7]" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                  Lektor PL {autoSpeak ? 'Wł.' : 'Wył.'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    getVoiceOut().unlockOnGesture();
                    void speakPolish('Lektor polski Voice Builder działa poprawnie.');
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#dfc6a7]/40 bg-[#dfc6a7]/10 px-3 py-1.5 text-xs font-semibold text-[#dfc6a7]"
                >
                  <Play className="h-3.5 w-3.5" />
                  Test głosu
                </button>
                <label className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[#d4d8d4]">
                  <input
                    type="checkbox"
                    checked={executeAction}
                    onChange={(e) => setExecuteAction(e.target.checked)}
                    className="accent-[#dfc6a7]"
                  />
                  Wykonuj akcje
                </label>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void toggleMicrophone()}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
                  listening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                    : 'bg-[#dfc6a7] text-[#131c23] hover:bg-[#e9dccb]'
                }`}
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {listening ? 'Zatrzymaj i wyślij' : 'Mów po polsku (Hybrydowy STT)'}
              </button>
              {interimText && (
                <span className="text-xs italic text-[#dfc6a7]">„{interimText}”</span>
              )}
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {VOICE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTranscript(preset)}
                  className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-left text-[11px] text-[#d4d8d4] transition hover:border-[#dfc6a7]/60 hover:text-white"
                >
                  {preset}
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Powiedz lub wpisz polecenie sterujące budową..."
              className="w-full rounded-xl border border-white/15 bg-[#0e151a]/90 p-3.5 text-sm text-[#f5f4f1] placeholder:text-[#7f8d91] focus:border-[#dfc6a7] focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#8ea0a6]">
                POST /api/voice-builder/command · TTS /api/agent-llm/tts
              </span>
              <button
                type="button"
                disabled={loading || !transcript.trim()}
                onClick={() => void runCommand()}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#e9dccb] px-5 py-2 text-xs font-semibold text-[#131c23] transition hover:bg-[#dfc6a7] disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {loading ? 'Analizuję w Ollamie...' : 'Wyślij polecenie'}
              </button>
            </div>

            {fallbackAudioUrl && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#dfc6a7]/30 bg-[#0d1418] p-2.5">
                <span className="text-[11px] font-semibold text-[#dfc6a7]">Audio WAV:</span>
                <audio controls src={fallbackAudioUrl} className="h-8 flex-1" />
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-400/40 bg-red-950/40 p-3 text-xs text-red-200">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-5 space-y-3 rounded-xl border border-[#dfc6a7]/30 bg-[#0d1418]/90 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold">
                    {result.blocked ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-red-300">ZABLOKOWANO PRZEZ GUARD</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300">
                          INTENCJA: {result.parsed.intent} ({Math.round(result.parsed.confidence * 100)}%)
                        </span>
                      </>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      getVoiceOut().unlockOnGesture();
                      void speakPolish(result.parsed.spokenReplyPl);
                    }}
                    className="inline-flex items-center gap-1 rounded border border-[#dfc6a7]/35 px-2.5 py-1 text-[11px] text-[#dfc6a7]"
                  >
                    <Volume2 className="h-3 w-3" />
                    Odczytaj ponownie
                  </button>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-[#f5f4f1]">
                  <strong className="text-[#dfc6a7]">Odpowiedź głosowa:</strong>{' '}
                  {result.parsed.spokenReplyPl}
                </div>

                {result.parsed.openUrl && (
                  <div className="flex items-center gap-2">
                    <a
                      href={result.parsed.openUrl}
                      target={result.parsed.openUrl.startsWith('http') ? '_blank' : undefined}
                      rel={result.parsed.openUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#dfc6a7] px-3.5 py-1.5 text-xs font-semibold text-[#131c23]"
                    >
                      Otwórz {result.parsed.openUrl}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}

                {result.actionResult && (
                  <pre className="max-h-56 overflow-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-[#cfd8dc]">
                    {JSON.stringify(result.actionResult, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </section>

          {/* Telemetry & Journal Sidebar */}
          <section className="space-y-6 lg:col-span-5">
            <div className="bm-bento-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-serif text-lg text-[#f5f4f1]">
                <Terminal className="h-4 w-4 text-[#dfc6a7]" />
                Usługi klastra (live)
              </h3>
              <div className="space-y-2">
                {(status?.services || []).map((svc) => (
                  <div
                    key={svc.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs"
                  >
                    <span>{svc.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                        svc.online
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {svc.online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bm-bento-card p-5">
              <h3 className="mb-3 font-serif text-lg text-[#f5f4f1]">
                Ostatnie wpisy dziennika głosowego
              </h3>
              <div className="max-h-72 space-y-2 overflow-auto pr-1">
                {status?.journalEntries.length ? (
                  status.journalEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-lg border border-white/10 bg-[#0d1418]/80 p-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] text-[#8ea0a6]">
                        <span className="font-mono uppercase text-[#dfc6a7]">{entry.intent}</span>
                        <span>{new Date(entry.timestamp).toLocaleTimeString('pl-PL')}</span>
                      </div>
                      <div className="mt-1 font-medium text-[#f5f4f1]">{entry.summary}</div>
                      <div className="mt-0.5 text-[11px] text-[#b8c2c5]">{entry.spokenReplyPl}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#8ea0a6]">
                    Brak wpisów głosowych — wydaj pierwszą komendę, aby zapisać ją w dzienniku budowy.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
