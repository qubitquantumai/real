/*
  # Create chat messages table for chatbot conversations

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid) - Groups messages from the same chat session
      - `user_id` (uuid, optional) - Links to authenticated users
      - `message` (text) - The actual message content
      - `is_user` (boolean) - True if message is from user, false if from bot
      - `timestamp` (timestamptz) - When the message was sent
      - `session_id` (text, optional) - Browser session identifier for anonymous users
      - `user_ip` (text, optional) - User's IP address for analytics
      - `user_agent` (text, optional) - Browser information

  2. Security
    - Enable RLS on `chat_messages` table
    - Allow anyone to insert messages (for anonymous users)
    - Allow authenticated users to read their own messages
    - Allow service role to read all messages (for admin analytics)

  3. Indexes
    - Index on conversation_id for fast conversation retrieval
    - Index on user_id for user-specific queries
    - Index on timestamp for chronological ordering
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  message text NOT NULL,
  is_user boolean NOT NULL,
  timestamp timestamptz DEFAULT now(),
  session_id text,
  user_ip text,
  user_agent text
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert chat messages (for anonymous users)
CREATE POLICY "Anyone can insert chat messages"
  ON chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own messages
CREATE POLICY "Users can read their own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow service role to read all messages (for admin analytics)
CREATE POLICY "Service role can read all messages"
  ON chat_messages
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

-- Create a view for conversation summaries
CREATE OR REPLACE VIEW conversation_summaries AS
SELECT 
  conversation_id,
  user_id,
  session_id,
  COUNT(*) as message_count,
  MIN(timestamp) as started_at,
  MAX(timestamp) as last_message_at,
  COUNT(CASE WHEN is_user = true THEN 1 END) as user_messages,
  COUNT(CASE WHEN is_user = false THEN 1 END) as bot_messages
FROM chat_messages
GROUP BY conversation_id, user_id, session_id;