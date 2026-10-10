import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ASR_URL = () => (process.env.NEIOS_ASR_URL ?? "http://127.0.0.1:8765").replace(/\/+$/, "");

/** GET /api/asr — health proxy for the local N-ATLAS ASR shim. */
export async function GET() {
  try {
    const res = await fetch(`${ASR_URL()}/health`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return NextResponse.json({ status: "downstream_error" }, { status: 502 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ status: "offline" }, { status: 503 });
  }
}

/** POST /api/asr — proxy multipart audio to /v1/audio/transcriptions. */
export async function POST(req: Request) {
  let upstream: Response;
  try {
    upstream = await fetch(`${ASR_URL()}/v1/audio/transcriptions`, {
      method: "POST",
      headers: { "content-type": req.headers.get("content-type") ?? "" },
      body: req.body,
      // @ts-expect-error Node fetch requires duplex for streaming bodies
      duplex: "half",
      signal: AbortSignal.timeout(120_000),
    });
  } catch (err) {
    const msg = err instanceof Error && err.name === "TimeoutError" ? "ASR request timed out" : "ASR service offline";
    return NextResponse.json({ error: msg }, { status: 503 });
  }
  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") ?? "application/json" },
  });
}
