export type TabType = 'home' | 'legal' | 'civic' | 'complaint' | 'awareness' | 'civiclens' | 'about';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Official {
  id: string;
  name: string;
  designation: string;
  department: string;
  jurisdiction: string;
  phone?: string;
  email?: string;
  description: string;
  verified: boolean;
  id_proof_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CivicIssue {
  id?: string;
  title: string;
  description: string;
  location: string;
  category: string;
  authority: string;
  image_url?: string;
  status?: string;
  priority?: string;
  contact_info?: any;
  created_at?: string;
  updated_at?: string;
}

export interface LegalQuery {
  id?: string;
  query: string;
  category?: string;
  user_location?: string;
  urgency?: string;
  created_at?: string;
}

export interface ComplaintGuidance {
  id?: string;
  issue_type: string;
  description: string;
  location?: string;
  urgency?: string;
  contact_details?: any;
  created_at?: string;
}

export interface AwarenessQuery {
  id?: string;
  topic: string;
  query: string;
  user_type?: string;
  created_at?: string;
}

export interface UserFeedback {
  id?: string;
  service_type: string;
  rating: number;
  feedback?: string;
  suggestions?: string;
  created_at?: string;
}
