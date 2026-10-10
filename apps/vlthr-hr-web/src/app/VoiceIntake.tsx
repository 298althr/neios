"use client";

import { useEffect, useRef, useState } from "react";

const LANGS = [
  { code: "en", label: "English (Nig. accent)" },
  { code: "ha", label: "Hausa" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
];

type AsrState = "checking" | "online" | "offline" | "recording" | "transcribing";

export default function VoiceIntake({ onTranscript }: { onTranscript: (text: string, lang: string) => void }) {
  const [state, setState] = useState<AsrState>("checking");
  const [lang, setLang] = useState("en");
  const [msg, setMsg] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    fetch("/api/asr")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setState(j?.status === "ok" ? "online" : "offline"))
      .catch(() => setState("offline"));
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        await transcribe(blob);
      };
      recorder.current = rec;
      rec.start();
      setState("recording");
      setMsg("recording — speak the request, then stop");
    } catch {
      setMsg("microphone unavailable — check browser permission");
    }
  }

  function stopRecording() {
    recorder.current?.stop();
    setState("transcribing");
    setMsg("transcribing with N-ATLAS ASR…");
  }

  async function transcribe(blob: Blob) {
    const fd = new FormData();
    fd.append("file", blob, "voice.webm");
    fd.append("language", lang);
    fd.append("response_format", "json");
    try {
      const res = await fetch("/api/asr", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.text) throw new Error(json.error ?? `HTTP ${res.status}`);
      onTranscript(json.text, lang);
      setState("online");
      setMsg(`transcript received — review and edit below (${json.model ?? "N-ATLAS ASR"})`);
    } catch (e) {
      setState("online");
      setMsg(`transcription failed: ${e instanceof Error ? e.message : e}`);
    }
  }

  async function uploadFile(file: File) {
    setState("transcribing");
    setMsg("transcribing uploaded audio…");
    await transcribe(file);
  }

  if (state === "checking") return null;

  return (
    <div className="voice-row">
      <span className="voice-tag">Voice intake · N-ATLAS ASR</span>
      {state === "offline" ? (
        <span className="voice-status">ASR service offline — start services/natlas-asr to enable voice intake</span>
      ) : (
        <>
          <select className="voice-lang" value={lang} onChange={(e) => setLang(e.target.value)} disabled={state === "recording" || state === "transcribing"}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          {state === "recording" ? (
            <button className="voice-btn recording" onClick={stopRecording}>■ Stop &amp; transcribe</button>
          ) : (
            <button className="voice-btn" onClick={startRecording} disabled={state === "transcribing"}>● Record</button>
          )}
          <label className="voice-btn" style={{ marginBottom: 0 }}>
            Upload audio
            <input type="file" accept="audio/*" hidden disabled={state === "transcribing"}
              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} />
          </label>
          <span className={`voice-status${state === "recording" ? " rec" : ""}`}>{msg}</span>
        </>
      )}
    </div>
  );
}
