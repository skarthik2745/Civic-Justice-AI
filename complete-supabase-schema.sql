-- Disable RLS globally and create all required tables

-- Officials table for government officials directory
CREATE TABLE IF NOT EXISTS officials (
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
CREATE TABLE IF NOT EXISTS civic_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  authority VARCHAR(255) NOT NULL,
  image_url TEXT,
  status VARCHAR(50) DEFAULT 'Submitted',
  priority VARCHAR(20) DEFAULT 'Medium',
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal queries table
CREATE TABLE IF NOT EXISTS legal_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query TEXT NOT NULL,
  category VARCHAR(100),
  user_location VARCHAR(255),
  urgency VARCHAR(50) DEFAULT 'Normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Complaint guidance requests table
CREATE TABLE IF NOT EXISTS complaint_guidance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  urgency VARCHAR(50) DEFAULT 'Normal',
  contact_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awareness rights queries table
CREATE TABLE IF NOT EXISTS awareness_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  query TEXT NOT NULL,
  user_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User feedback table
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type VARCHAR(100) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System logs table for tracking usage
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Civic lens reports table
CREATE TABLE IF NOT EXISTS civic_lens_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  authority VARCHAR(255) NOT NULL,
  image_data TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Submitted',
  ai_suggestion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS on all tables
ALTER TABLE officials DISABLE ROW LEVEL SECURITY;
ALTER TABLE civic_issues DISABLE ROW LEVEL SECURITY;
ALTER TABLE legal_queries DISABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_guidance DISABLE ROW LEVEL SECURITY;
ALTER TABLE awareness_queries DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE civic_lens_reports DISABLE ROW LEVEL SECURITY;

-- Grant full permissions to anon and authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_officials_department ON officials(department);
CREATE INDEX IF NOT EXISTS idx_officials_jurisdiction ON officials(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_civic_issues_status ON civic_issues(status);
CREATE INDEX IF NOT EXISTS idx_civic_issues_category ON civic_issues(category);
CREATE INDEX IF NOT EXISTS idx_civic_issues_created_at ON civic_issues(created_at);
CREATE INDEX IF NOT EXISTS idx_legal_queries_category ON legal_queries(category);
CREATE INDEX IF NOT EXISTS idx_legal_queries_created_at ON legal_queries(created_at);
CREATE INDEX IF NOT EXISTS idx_civic_lens_reports_status ON civic_lens_reports(status);
CREATE INDEX IF NOT EXISTS idx_civic_lens_reports_category ON civic_lens_reports(category);
CREATE INDEX IF NOT EXISTS idx_civic_lens_reports_created_at ON civic_lens_reports(created_at);

-- Insert sample data for officials
INSERT INTO officials (name, designation, department, jurisdiction, phone, email, description, verified) VALUES
('John Smith', 'District Collector', 'Revenue Department', 'District A', '+1-555-0101', 'john.smith@gov.in', 'Responsible for overall district administration and revenue matters', true),
('Sarah Johnson', 'Police Commissioner', 'Police Department', 'City Metro', '+1-555-0102', 'sarah.johnson@police.gov', 'Head of city police operations and law enforcement', true),
('Michael Brown', 'Municipal Commissioner', 'Municipal Corporation', 'City Metro', '+1-555-0103', 'michael.brown@municipal.gov', 'Oversees city infrastructure and civic services', true),
('Emily Davis', 'Health Officer', 'Health Department', 'District A', '+1-555-0104', 'emily.davis@health.gov', 'District health services and public health initiatives', true);