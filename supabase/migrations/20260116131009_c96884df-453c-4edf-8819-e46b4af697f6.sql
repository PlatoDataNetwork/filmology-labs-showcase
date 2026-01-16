-- Create table for tracking login attempts for rate limiting
CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  was_successful BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- No direct client access - only edge functions with service role key can access
CREATE POLICY "No direct client access to login attempts"
  ON public.login_attempts
  FOR ALL
  TO public
  USING (false);

-- Create index for efficient querying by IP and time
CREATE INDEX idx_login_attempts_ip_time ON public.login_attempts (ip_address, attempted_at DESC);

-- Create function to clean up old login attempts (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_login_attempts()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.login_attempts
  WHERE attempted_at < NOW() - INTERVAL '1 hour';
END;
$$;