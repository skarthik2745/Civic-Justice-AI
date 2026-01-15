import { supabase } from '../lib/supabase'

// Officials service
export const officialsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('officials')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getByDepartment(department: string) {
    const { data, error } = await supabase
      .from('officials')
      .select('*')
      .eq('department', department)
    return { data, error }
  },

  async create(official: any) {
    const { data, error } = await supabase
      .from('officials')
      .insert([official])
      .select()
    return { data, error }
  }
}

// Civic Issues service
export const civicIssuesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('civic_issues')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async create(issue: any) {
    const { data, error } = await supabase
      .from('civic_issues')
      .insert([issue])
      .select()
    return { data, error }
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('civic_issues')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    return { data, error }
  }
}

// Legal Queries service
export const legalQueriesService = {
  async create(query: any) {
    const { data, error } = await supabase
      .from('legal_queries')
      .insert([query])
      .select()
    return { data, error }
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('legal_queries')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Complaint Guidance service
export const complaintGuidanceService = {
  async create(guidance: any) {
    const { data, error } = await supabase
      .from('complaint_guidance')
      .insert([guidance])
      .select()
    return { data, error }
  },

  async getAll() {
    const { data, error } = await supabase
      .from('complaint_guidance')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Awareness Queries service
export const awarenessQueriesService = {
  async create(query: any) {
    const { data, error } = await supabase
      .from('awareness_queries')
      .insert([query])
      .select()
    return { data, error }
  },

  async getByTopic(topic: string) {
    const { data, error } = await supabase
      .from('awareness_queries')
      .select('*')
      .eq('topic', topic)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// User Feedback service
export const userFeedbackService = {
  async create(feedback: any) {
    const { data, error } = await supabase
      .from('user_feedback')
      .insert([feedback])
      .select()
    return { data, error }
  }
}

// System Logs service
export const systemLogsService = {
  async log(action: string, tableName?: string, recordId?: string, details?: any) {
    const { data, error } = await supabase
      .from('system_logs')
      .insert([{
        action,
        table_name: tableName,
        record_id: recordId,
        details
      }])
      .select()
    return { data, error }
  }
}