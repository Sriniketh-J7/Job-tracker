-- ─────────────────────────────────────────────
--  PASTE THIS ENTIRE SCRIPT INTO SUPABASE
--  SQL Editor → New Query → Paste → Run
-- ─────────────────────────────────────────────

CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  job_title TEXT NOT NULL,
  status TEXT DEFAULT 'Applied' CHECK (status IN ('Applied', 'Interview', 'Scheduled', 'Accepted', 'Rejected', 'Ghosted')),
  date DATE DEFAULT CURRENT_DATE,
  location TEXT,
  link TEXT,
  resume_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable public read/write via anon key (since we handle auth on frontend)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations with anon key"
ON applications
FOR ALL
USING (true)
WITH CHECK (true);
