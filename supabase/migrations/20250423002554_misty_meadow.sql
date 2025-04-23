/*
  # Create links table for storing user bookmarks

  1. New Tables
    - `links`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `title` (text, not null)
      - `url` (text, not null)
      - `category` (text, not null)
      - `description` (text, nullable)
      - `user_id` (uuid, not null, references auth.users.id)

  2. Security
    - Enable RLS on `links` table
    - Add policies for users to manage their own links
      - Users can select their own links
      - Users can insert their own links
      - Users can update their own links
      - Users can delete their own links
*/

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  url text NOT NULL,
  category text NOT NULL,
  description text,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own links"
  ON links
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own links"
  ON links
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own links"
  ON links
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own links"
  ON links
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS links_user_id_idx ON links (user_id);