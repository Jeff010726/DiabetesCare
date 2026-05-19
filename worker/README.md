# DiabetesCare Worker API

Cloudflare Worker backend scaffold for DiabetesCare.

## Local setup

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Add any runtime secrets with `npx wrangler secret put SECRET_NAME`.
3. Run:

```bash
npm run worker:dev
```

Health check:

```bash
curl http://localhost:8787/api/health
```

## Deploy

Set these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Then push to `0518` or run the workflow manually.
