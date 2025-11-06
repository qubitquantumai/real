/*
  # Add user_id column to contact_submissions table

  1. Schema Changes
    - Add `user_id` column to `contact_submissions` table
    - References `auth.users(id)` for proper foreign key relationship
    - Column is nullable to support existing records

  2. Security Updates
    - Update RLS policies to work with user_id
    - Ensure users can only see their own submissions when authenticated
    - Maintain anonymous submission capability

  3. Indexes
    - Add index on user_id for better query performance
*/

-- Add user_id column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Create index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON contact_submissions(user_id);

-- Update the existing policy to allow authenticated users to see only their own submissions
DROP POLICY IF EXISTS "Authenticated users can read all submissions" ON contact_submissions;

CREATE POLICY "Users can read their own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policy for authenticated users to insert their own submissions
CREATE POLICY "Authenticated users can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Keep the anonymous policy for backward compatibility (if needed)
-- The existing "Anyone can submit contact form" policy remains active