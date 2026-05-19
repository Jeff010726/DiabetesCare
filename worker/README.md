# DiabetesCare Worker API

Cloudflare Worker backend for DiabetesCare.

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
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`

Set this Worker variable in `wrangler.toml` after the sheet exists:

- `GOOGLE_SHEETS_SPREADSHEET_ID`

Then push to `0518` or run the workflow manually. Deployment syncs Google Sheets secrets, applies D1 migrations, and deploys the Worker.

## D1 setup

The `Setup Cloudflare D1` workflow creates or finds the database automatically and writes the binding into `wrangler.toml`. To do it manually:

```bash
npx wrangler d1 create diabetescare-db
```

Copy the returned `database_id` into `wrangler.toml`, then apply migrations:

```bash
npx wrangler d1 migrations apply diabetescare-db --remote
```

## Google Sheets setup

1. Create a Google Cloud service account.
2. Create a JSON key.
3. Share the Google Sheet with the service account email.
4. Store the service account email and private key as Worker secrets:

```bash
npx wrangler secret put GOOGLE_SHEETS_CLIENT_EMAIL
npx wrangler secret put GOOGLE_SHEETS_PRIVATE_KEY
```

The contact endpoint appends rows into a tab named `Contact Leads`.

## API behavior

- `GET /api/health`
- `POST /api/contact`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

The API sets CORS for the production site, returns security headers including `X-Robots-Tag: noindex, nofollow`, rate-limits auth/contact endpoints per client IP, and hides internal error details in production.
