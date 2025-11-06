/*
  # Create agent requests table for Build Agent feature

  1. New Tables
    - `agent_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, required) - Links to authenticated users only
      - `category` (text) - 'automation' or 'agent'
      - `agent_type` (text) - The specific type selected
      - `agent_name` (text) - Custom name for the agent
      - `niche` (text) - Industry/niche selection
      - `custom_niche` (text, optional) - Custom niche if "Other" selected
      - `email` (text) - Contact email
      - `whatsapp` (text) - WhatsApp number
      - `description` (text) - Detailed requirements
      - `created_at` (timestamptz) - When the request was created

  2. Security
    - Enable RLS on `agent_requests` table
    - Only authenticated users can insert their own requests
    - Users can only read their own requests
    - Service role can read all requests (for admin purposes)

  3. Indexes
    - Index on user_id for fast user-specific queries
    - Index on created_at for chronological ordering
    - Index on category for filtering
*/

CREATE TABLE IF NOT EXISTS agent_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  category text NOT NULL CHECK (category IN ('automation', 'agent')),
  agent_type text NOT NULL,
  agent_name text NOT NULL,
  niche text NOT NULL,
  custom_niche text,
  email text NOT NULL,
  whatsapp text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agent_requests ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own agent requests
CREATE POLICY "Users can create their own agent requests"
  ON agent_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to read their own agent requests
CREATE POLICY "Users can read their own agent requests"
  ON agent_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow service role to read all agent requests (for admin purposes)
CREATE POLICY "Service role can read all agent requests"
  ON agent_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agent_requests_user_id ON agent_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_requests_created_at ON agent_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_requests_category ON agent_requests(category);
CREATE INDEX IF NOT EXISTS idx_agent_requests_agent_type ON agent_requests(agent_type);