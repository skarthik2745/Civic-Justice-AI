-- Disable RLS for all tables
ALTER DEFAULT PRIVILEGES REVOKE ALL ON TABLES FROM anon, authenticated;

-- Officials table
CREATE TABLE officials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  jurisdiction VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  description TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  id_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Civic issues/complaints table
CREATE TABLE civic_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  authority VARCHAR(255) NOT NULL,
  image_url TEXT,
  status VARCHAR(50) DEFAULT 'Submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal queries table
CREATE TABLE legal_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Complaint guidance requests table
CREATE TABLE complaint_guidance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  urgency VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awareness rights queries table
CREATE TABLE awareness_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  query TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS on all tables
ALTER TABLE officials DISABLE ROW LEVEL SECURITY;
ALTER TABLE civic_issues DISABLE ROW LEVEL SECURITY;
ALTER TABLE legal_queries DISABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_guidance DISABLE ROW LEVEL SECURITY;
ALTER TABLE awareness_queries DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;