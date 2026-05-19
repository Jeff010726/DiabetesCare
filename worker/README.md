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
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`

Set this Worker variable in `wrangler.toml` after the sheet exists:

- `GOOGLE_SHEETS_SPREADSHEET_ID`

Then push to `0518` or run the workflow manually.

## D1 setup

Create the database:

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
