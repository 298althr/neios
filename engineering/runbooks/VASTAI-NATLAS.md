# Runbook: N-ATLAS on vast.ai (Ollama, OpenAI-compatible)

> Path locked by D-0015/D-0016. Budget: $5 vast.ai credit. Billing is **per
> second** from the moment the instance is created — stop when not in use.

## Live instance (created 2026-10-08, G0-passed)

| Field | Value |
|---|---|
| Instance ID | `54838985` |
| Offer | #53250098 — 1× RTX 3090 24 GB, Sweden, verified, EPYC 7443, ~3200 MB/s disk, ~7.8 Gbps net |
| Rate | ~$0.178/hr compute (~$0.195/hr all-in incl. 40 GB disk) |
| SSH | `ssh -p 15170 root@ssh3.vast.ai` (proxy; key `~/.ssh/id_ed25519`, registered as vast key id 1514879) |
| Public IP | `194.14.47.19` (port 11434 auto-mapped to :23326 — **unauthenticated**, do not rely on it) |
| Image | `ollama/ollama:latest` (~1.5 GB — boots in minutes, unlike the 18 GB vLLM image that stalled >60 min on a slow-disk host) |
| Model | `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M` — official NCAIR1/N-ATLaS 8B weights, Q4_K_M quant, **ungated mirror** (no HF token needed) |
| API | Ollama OpenAI-compatible server on container `:11434` |
| Exposure | SSH tunnel preferred; the auto-mapped public port has no auth — treat as temporary |

## Destroyed predecessor

Instance `54832982` (vLLM image, slow-disk host) — destroyed after >60 min
stuck in image extraction. Cost ~$0.23. Lesson: filter offers by `disk_bw` —
avoid hosts <300 MB/s disk for anything image-pull heavy.

## Daily workflow

```bash
VASTAI="/c/Users/Sav-Dev/AppData/Local/Programs/Python/Python313/Scripts/vastai.exe"

# 1. start (if stopped)
"$VASTAI" start instance 54838985
"$VASTAI" show instance 54838985       # wait for actual_status=running
#    (ssh port may CHANGE on restart — re-check ssh_host/ssh_port in the raw output)

# 2. tunnel the API to localhost:18000 (separate terminal, leave running)
#    DO NOT use local port 11434 — this machine runs its own Ollama
#    (llama3.2:1b) on 127.0.0.1:11434; hitting it silently swaps the model.
ssh -N -L 18000:localhost:11434 -o ServerAliveInterval=30 -i ~/.ssh/id_ed25519 -p 15170 root@ssh3.vast.ai

# 3. verify you reached N-ATLaS, NOT local Ollama:
curl -s http://127.0.0.1:18000/v1/models
#    must show hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M — if it shows llama3.2
#    you hit the local Ollama by mistake.

# 4. run things
node scripts/natlas-smoke-test.ts            # G0 evidence -> engineering/evidence/
node scripts/neios-run.ts                    # full governed loop
pnpm --filter vlthr-hr-web dev               # playground UI on :3000

# 5. STOP WHEN DONE — billing does not pause by itself
"$VASTAI" stop instance 54838985             # disk preserved; storage still billed ~$0.01/hr
"$VASTAI" destroy instance 54838985          # end of project only — deletes model cache
```

## Notes / caveats

- **No HF_TOKEN required** — `QuantFactory/N-ATLaS-GGUF` is a public mirror of
  the gated `NCAIR1/N-ATLaS` weights (same model, quantized). Token stays
  available in `.env.local` if a gated path is ever needed.
- **Ollama has no API auth.** Keep the tunnel workflow; do not treat the
  auto-mapped public port as secure. If the port must be public for a demo,
  put an authed reverse proxy in front or restrict to the demo window only.
- **Stopped instances still bill storage** (~$0.01/hr for 40 GB — trivial);
  destroy only at the very end.
- If lost (host reclaim/destroy): rent any verified 24 GB GPU offer with
  `disk_bw>300` and recreate per below — model re-pull is ~1 min on fast hosts.
- For the Day-4 demo recording: keep this same on-demand instance (no
  preemption risk already); just start it beforehand and warm the model with
  one request so first-demo latency isn't a cold load (~45 s → ~2–4 s).

## Recreate from scratch

```bash
"$VASTAI" create instance <OFFER_ID> \
  --image "ollama/ollama:latest" --disk 40 --ssh --direct --cancel-unavail \
  --label neios-ollama \
  --onstart-cmd 'nohup ollama serve > /root/ollama.log 2>&1 & sleep 8 && \
    ollama pull hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M >> /root/ollama.log 2>&1'
```
