/*
  # Add phone number field to contact submissions

  1. Schema Changes
    - Add `phone` column to `contact_submissions` table
    - Set as optional field with default empty string

  2. Security
    - No changes to existing RLS policies needed
    - Phone field will be included in existing policies

  3. Performance
    - Add index for phone number lookups if needed for future features
*/

-- Add phone column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN phone text DEFAULT '';

-- Add index for phone number (optional, for future search capabilities)
CREATE INDEX IF NOT EXISTS idx_contact_submissions_phone ON contact_submissions(phone);