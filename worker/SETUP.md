# Backend Setup Checklist

## D1 database

The GitHub workflow creates or finds the database automatically. Manual setup:

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
Timestamp | Name | Email | Message | Source Page | Preferred Language | Time Zone | Insurance Company | Insurance Member ID | Date of Birth | IP | User Agent | Patient Type
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

After the Worker is deployed, make sure the `api` DNS record exists and is proxied in Cloudflare. The Worker route in `wrangler.toml` is:

```txt
api.xtdiabetescare.com/*
```

## Admin hostname

The admin console is served from:

```txt
https://admin.xtdiabetescare.com
```

Make sure the `admin` DNS record exists and is proxied in Cloudflare. The Worker route in `wrangler.toml` is:

```txt
admin.xtdiabetescare.com/*
```

Set these GitHub repository secrets before deploying:

```txt
ADMIN_EMAIL
ADMIN_PASSWORD
```

The admin console:

- Return `X-Robots-Tag: noindex, nofollow`.
- Add a `robots.txt` that disallows all crawlers for the admin host.
- Do not link to the admin host from the public website.
- Require login before returning any admin data or page shell.
- Uses a separate host-only admin session cookie.
- Shows contact leads, Sheet sync status, and member registrations.
