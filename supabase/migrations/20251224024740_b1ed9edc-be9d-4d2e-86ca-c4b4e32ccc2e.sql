-- Allow null investor_id for simple password-only authentication
ALTER TABLE public.investor_sessions 
ALTER COLUMN investor_id DROP NOT NULL;