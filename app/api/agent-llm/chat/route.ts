import { NextRequest, NextResponse } from 'next/server';
import {
  evaluateCommunicationCompliance,
  openOllamaChatStream,
  runFastGuardCheck,
  type AgentChatMessage,
} from '@/lib/agentLlmEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messagesInput: AgentChatMessage[] = Array.isArray(body?.messages)
      ? body.messages
      : typeof body?.prompt === 'string'
        ? [{ role: 'user', content: body.prompt }]
        : [];

    const lastUser = [...messagesInput].reverse().find((m) => m.role === 'user');
    if (!lastUser?.content?.trim()) {
      return NextResponse.json({ error: 'Podaj wiadomość użytkownika.' }, { status: 400 });
    }

    const requestStart = performance.now();
    const guard = runFastGuardCheck(lastUser.content);
    const encoder = new TextEncoder();

    if (guard.classification === 'block') {
      const blockedReply = `Polecenie zostało zablokowane przez bramkę bezpieczeństwa (${guard.violations.join(', ')}). Nie wykonuję prób obejścia reguł ani ujawnienia danych systemowych.\n\nbez odbioru`;
      const compliance = evaluateCommunicationCompliance(blockedReply, false);
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'guard', guard }) + '\n'));
          controller.enqueue(
            encoder.encode(JSON.stringify({ type: 'token', content: blockedReply }) + '\n')
          );
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'done',
                blocked: true,
                compliance,
                metrics: {
                  ttftMs: Math.round(performance.now() - requestStart),
                  totalMs: Math.round(performance.now() - requestStart),
                  evalCount: 0,
                  tokensPerSec: 0,
                },
              }) + '\n'
            )
          );
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const ollamaRes = await openOllamaChatStream(messagesInput);
    if (!ollamaRes.ok || !ollamaRes.body) {
      return NextResponse.json(
        { error: `Ollama zwróciła HTTP ${ollamaRes.status}` },
        { status: 502 }
      );
    }

    const reader = ollamaRes.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(JSON.stringify({ type: 'guard', guard }) + '\n'));

        let buffer = '';
        let fullText = '';
        let firstTokenMs: number | null = null;
        let evalCount = 0;
        let evalDurationNs = 0;

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) continue;
              let chunk: {
                message?: { content?: string };
                done?: boolean;
                eval_count?: number;
                eval_duration?: number;
              };
              try {
                chunk = JSON.parse(trimmedLine);
              } catch {
                continue;
              }

              const tokenText = chunk.message?.content || '';
              if (tokenText) {
                if (firstTokenMs === null) {
                  firstTokenMs = Math.round(performance.now() - requestStart);
                }
                fullText += tokenText;
                controller.enqueue(
                  encoder.encode(JSON.stringify({ type: 'token', content: tokenText }) + '\n')
                );
              }

              if (chunk.done) {
                evalCount = Number(chunk.eval_count || 0);
                evalDurationNs = Number(chunk.eval_duration || 0);
              }
            }
          }

          const totalMs = Math.round(performance.now() - requestStart);
          const tokensPerSec =
            evalCount > 0 && evalDurationNs > 0
              ? Number((evalCount / (evalDurationNs / 1e9)).toFixed(1))
              : 0;
          const compliance = evaluateCommunicationCompliance(fullText, true);

          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'done',
                blocked: false,
                compliance,
                metrics: {
                  ttftMs: firstTokenMs ?? totalMs,
                  totalMs,
                  evalCount,
                  tokensPerSec,
                },
              }) + '\n'
            )
          );
        } catch (streamErr) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'error',
                error: streamErr instanceof Error ? streamErr.message : 'Błąd strumienia Ollama',
              }) + '\n'
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd Agent LLM' },
      { status: 500 }
    );
  }
}
