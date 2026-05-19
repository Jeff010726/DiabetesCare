export interface Env {
  APP_ENV: string;
  APP_ORIGIN?: string;
  GOOGLE_SHEETS_SPREADSHEET_ID?: string;
  GOOGLE_SHEETS_CLIENT_EMAIL?: string;
  GOOGLE_SHEETS_PRIVATE_KEY?: string;
  DB?: D1Database;
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
