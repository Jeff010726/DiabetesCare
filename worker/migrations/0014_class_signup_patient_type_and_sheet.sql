ALTER TABLE class_signups ADD COLUMN patient_type TEXT;
ALTER TABLE class_signups ADD COLUMN sheet_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE class_signups ADD COLUMN sheet_error TEXT;

CREATE INDEX IF NOT EXISTS idx_class_signups_sheet_status ON class_signups(sheet_status);
