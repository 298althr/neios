# Runbook: N-ATLAS on vast.ai (Ollama, OpenAI-compatible)

> Path locked by D-0015/D-0016. Budget: $5 vast.ai credit. Billing is **per
> second** from the moment the instance is created — stop when not in use.

## Instance profile (values redacted — see owner key store)

| Field | Value |
|---|---|
| Instance ID | `<vast instance id>` — current ID held in the owner's private ops notes |
| Offer | RTX 3090 24 GB class host — filter offers by `disk_bw` ≥ ~3000 MB/s |
| Rate | ~$0.18/hr compute + ~$0.05/hr disk while stopped |
| SSH | `ssh -p <port> root@<region>.vast.ai` (proxy; key registered in owner's vast account) |
| Public IP | `<redacted>` — vast auto-maps container port 11434 to a public port with **no auth**; never rely on it, use the SSH tunnel only |
| Image | `ollama/ollama:latest` (~1.5 GB — boots in minutes, unlike the 18 GB vLLM image that stalled >60 min on a slow-disk host) |
| Model | `hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M` — official NCAIR1/N-ATLaS 8B weights, Q4_K_M quant, **ungated mirror** (no HF token needed) |
| API | Ollama OpenAI-compatible server on container `:11434` |
| Exposure | SSH tunnel only; the auto-mapped public port has no auth — treat as temporary |

## Destroyed predecessor

Instance `54832982` (vLLM image, slow-disk host) — destroyed after >60 min
stuck in image extraction. Cost ~$0.23. Lesson: filter offers by `disk_bw` —
avoid hosts <300 MB/s disk for anything image-pull heavy.

## Daily workflow

```bash
VASTAI="<path-to-vastai-cli>"

# 1. start (if stopped)
"$VASTAI" start instance <instance-id>
"$VASTAI" show instance <instance-id>       # wait for actual_status=running
#    (ssh port may CHANGE on restart — re-check ssh_host/ssh_port in the raw output)

# 2. tunnel the API to localhost:18000 (separate terminal, leave running)
#    DO NOT use local port 11434 — this machine runs its own Ollama
#    (llama3.2:1b) on 127.0.0.1:11434; hitting it silently swaps the model.
ssh -N -L 18000:localhost:11434 -o ServerAliveInterval=30 -i ~/.ssh/<key> -p <port> root@<region>.vast.ai

# 3. verify you reached N-ATLaS, NOT local Ollama:
curl -s http://127.0.0.1:18000/v1/models
#    must show hf.co/QuantFactory/N-ATLaS-GGUF:Q4_K_M — if it shows llama3.2
#    you hit the local Ollama by mistake.

# 4. run things
node scripts/natlas-smoke-test.ts            # G0 evidence -> engineering/evidence/
node scripts/neios-run.ts                    # full governed loop
pnpm --filter vlthr-hr-web dev               # playground UI on :3000

# 5. STOP WHEN DONE — billing does not pause by itself
"$VASTAI" stop instance <instance-id>             # disk preserved; storage still billed ~$0.01/hr
"$VASTAI" destroy instance <instance-id>          # end of project only — deletes model cache
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
