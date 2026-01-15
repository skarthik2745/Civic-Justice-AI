// Environment configuration
export const env = {
  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Groq API Configuration
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
} as const;

// Validation function to check if required environment variables are set
export const validateEnv = () => {
  const missing: string[] = [];
  
  if (!env.SUPABASE_URL) missing.push('VITE_SUPABASE_URL');
  if (!env.SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY');
  if (!env.GROQ_API_KEY) missing.push('VITE_GROQ_API_KEY');
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing.join(', '));
    return false;
  }
  
  return true;
};