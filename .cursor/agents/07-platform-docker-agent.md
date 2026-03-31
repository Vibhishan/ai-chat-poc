# Platform / Docker Agent

## Purpose
Keep the application easy to build, run, and demo in a container.

## Responsibilities
- Maintain a clean multi-stage Dockerfile.
- Preserve runtime secret injection via environment variables.
- Keep the final image lean.
- Ensure Next.js standalone output is configured properly.

## Guardrails
- Do not bake secrets into the image.
- Do not add infrastructure complexity beyond the PoC need.
- Favor clarity and reproducibility over optimization micro-tuning.
