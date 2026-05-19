# Backend Setup Checklist

## D1 database

Create the database:

```bash
npx wrangler d1 create diabetescare-db
```

Paste the returned `database_id` into `wrangler.toml` by uncommenting:

```toml
[[d1_databases]]
binding = "DB"
database_name = "diabetescare-db"
database_id = "<cloudflare-d1-database-id>"
migrations_dir = "worker/migrations"
```

Apply migrations:

```bash
npx wrangler d1 migrations apply diabetescare-db --remote
```

## Google Sheet for Contact

Create a Google Sheet with a tab named:

```txt
Contact Leads
```

Recommended header row:

```txt
Timestamp | Name | Email | Message | Source Page | Preferred Language | IP | User Agent
```

Create a Google Cloud service account and share the Sheet with the service account email.

Set Worker secrets:

```bash
npx wrangler secret put GOOGLE_SHEETS_CLIENT_EMAIL
npx wrangler secret put GOOGLE_SHEETS_PRIVATE_KEY
```

Set the sheet ID in `wrangler.toml`:

```toml
GOOGLE_SHEETS_SPREADSHEET_ID = "<sheet-id>"
```

## API hostname

The frontend defaults to:

```txt
https://api.xtdiabetescare.com
```

After the Worker is deployed, add a Worker route or custom domain for that hostname in Cloudflare.

## Future admin hostname

Use a non-obvious subdomain and protect it with authentication before building the UI.

When the admin app is created:

- Return `X-Robots-Tag: noindex, nofollow`.
- Add a `robots.txt` that disallows all crawlers for the admin host.
- Do not link to the admin host from the public website.
- Require login before returning any admin data or page shell.
