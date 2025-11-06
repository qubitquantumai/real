/*
  # Add name field to agent_requests table

  1. Schema Changes
    - Add `name` column to `agent_requests` table
    - Set as required field for capturing user's full name

  2. Security
    - No changes to existing RLS policies needed
    - Name field will be included in existing policies

  3. Performance
    - Add index for name field for future search capabilities
*/

-- Add name column to agent_requests table
ALTER TABLE agent_requests 
ADD COLUMN name text NOT NULL DEFAULT '';

-- Add index for name field (for future search capabilities)
CREATE INDEX IF NOT EXISTS idx_agent_requests_name ON agent_requests(name);