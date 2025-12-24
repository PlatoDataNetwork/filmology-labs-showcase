-- Create investor_users table for secure authentication
CREATE TABLE public.investor_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.investor_users ENABLE ROW LEVEL SECURITY;

-- Create policy - only authenticated service role can access (edge function)
-- No direct client access to this table
CREATE POLICY "No direct client access" 
ON public.investor_users 
FOR ALL 
USING (false);

-- Create investor_sessions table for session management
CREATE TABLE public.investor_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID NOT NULL REFERENCES public.investor_users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.investor_sessions ENABLE ROW LEVEL SECURITY;

-- No direct client access - sessions managed by edge functions
CREATE POLICY "No direct client access to sessions" 
ON public.investor_sessions 
FOR ALL 
USING (false);

-- Create contact_submissions table for storing contact form data
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No direct client access - submissions go through edge function
CREATE POLICY "No direct client access to submissions" 
ON public.contact_submissions 
FOR ALL 
USING (false);