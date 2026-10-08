import type { NAtlasProvider, NAtlasRequest, NAtlasResponse } from "./provider.ts";

export interface OpenAICompatConfig {
  /** e.g. http://localhost:8000/v1 (SSH tunnel to vast.ai vLLM) */
  baseUrl: string;
  /** Bearer token; any non-empty string for vLLM's --api-key. */
  apiKey: string;
  /** Model id, e.g. NCAIR1/N-ATLaS. If omitted, first id from GET /models is used. */
  model?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export class NAtlasProviderError extends Error {
  readonly kind: "timeout" | "http" | "network" | "malformed";
  readonly status?: number;

  constructor(message: string, kind: NAtlasProviderError["kind"], status?: number) {
    super(message);
    this.name = "NAtlasProviderError";
    this.kind = kind;
    this.status = status;
  }
}

const RETRYABLE_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

export class OpenAICompatProvider implements NAtlasProvider {
  private readonly config: OpenAICompatConfig;

  constructor(config: OpenAICompatConfig) {
    this.config = config;
  }

  async generate(request: NAtlasRequest): Promise<NAtlasResponse> {
    const model = this.config.model ?? (await this.firstModelId());
    const messages = [
      ...(request.system ? [{ role: "system", content: request.system }] : []),
      { role: "user", content: request.prompt },
    ];
    const body = {
      model,
      messages,
      ...(request.maxTokens != null ? { max_tokens: request.maxTokens } : {}),
      ...(request.temperature != null ? { temperature: request.temperature } : {}),
      ...(request.requestId ? { user: request.requestId } : {}),
    };

    const maxAttempts = (this.config.maxRetries ?? 2) + 1;
    let lastError: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const started = Date.now();
      try {
        const res = await this.post("/chat/completions", body);
        const latencyMs = Date.now() - started;
        const choice = res?.choices?.[0];
        const text = choice?.message?.content;
        if (typeof text !== "string") {
          throw new NAtlasProviderError("malformed response: missing choices[0].message.content", "malformed");
        }
        return {
          text,
          model: res?.model ?? model,
          requestId: res?.id,
          latencyMs,
          finishReason: choice?.finish_reason,
        };
      } catch (err) {
        lastError = err;
        const retryable =
          err instanceof NAtlasProviderError &&
          (err.kind === "timeout" || err.kind === "network" || (err.status != null && RETRYABLE_STATUS.has(err.status)));
        if (!retryable || attempt === maxAttempts) break;
        await sleep(400 * attempt);
      }
    }
    throw lastError;
  }

  /** First model id reported by GET /models (vLLM reports the served model). */
  async firstModelId(): Promise<string> {
    const res = await this.request("GET", "/models");
    if (!res.ok) {
      throw new NAtlasProviderError(`GET /models -> ${res.status}`, "http", res.status);
    }
    const json = (await res.json()) as { data?: { id?: string }[] };
    const id = json?.data?.[0]?.id;
    if (!id) throw new NAtlasProviderError("malformed response: GET /models returned no ids", "malformed");
    return id;
  }

  private async post(path: string, body: unknown): Promise<Record<string, unknown>> {
    const res = await this.request("POST", path, body);
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new NAtlasProviderError(`POST ${path} -> ${res.status} ${detail.slice(0, 200)}`, "http", res.status);
    }
    return (await res.json()) as Record<string, unknown>;
  }

  private request(method: string, path: string, body?: unknown): Promise<Response> {
    const timeoutMs = this.config.timeoutMs ?? 60_000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const base = this.config.baseUrl.replace(/\/+$/, "");
    return fetch(`${base}${path}`, {
      method,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.config.apiKey}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") {
          throw new NAtlasProviderError(`request timed out after ${timeoutMs}ms`, "timeout");
        }
        throw new NAtlasProviderError(`network error: ${String(err)}`, "network");
      })
      .finally(() => clearTimeout(timer));
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
