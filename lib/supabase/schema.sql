-- Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  username TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User saved codes
CREATE TABLE IF NOT EXISTS user_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  clerk_user_id TEXT NOT NULL, -- Direct reference to Clerk ID for easier queries
  title TEXT NOT NULL,
  description TEXT,
  liquid_code TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_codes_clerk_user_id ON user_codes(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_user_codes_public ON user_codes(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_codes_created_at ON user_codes(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_codes_updated_at BEFORE UPDATE ON user_codes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
