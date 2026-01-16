import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MINUTES = 15;

// Get client IP from request headers
function getClientIP(req: Request): string {
  // Check common headers for real IP (behind proxies/load balancers)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  // Fallback to a hash of user-agent + some headers as identifier
  const userAgent = req.headers.get("user-agent") || "unknown";
  return `ua-${userAgent.substring(0, 50)}`;
}

// Hash password using bcrypt (for creating new passwords)
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

// Verify password against bcrypt hash
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

interface AuthRequest {
  action: "login" | "verify" | "logout";
  password?: string;
  token?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { action, password, token }: AuthRequest = await req.json();
    const clientIP = getClientIP(req);
    
    console.log(`[investor-auth] Action: ${action}`);
    
    if (action === "login") {
      if (!password) {
        return new Response(
          JSON.stringify({ error: "Password is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate input length (bcrypt has 72 byte limit)
      if (password.length < 8 || password.length > 72) {
        return new Response(
          JSON.stringify({ error: "Invalid password format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check rate limiting - count failed attempts in the last 15 minutes
      const rateLimitTime = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
      
      const { count: failedAttempts, error: countError } = await supabase
        .from("login_attempts")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", clientIP)
        .eq("was_successful", false)
        .gte("attempted_at", rateLimitTime);

      if (countError) {
        console.error("[investor-auth] Rate limit check error:", countError.code);
      }

      const attemptCount = failedAttempts || 0;
      
      if (attemptCount >= MAX_ATTEMPTS) {
        console.log(`[investor-auth] Rate limit exceeded for IP`);
        return new Response(
          JSON.stringify({ 
            error: `Too many login attempts. Please try again in ${RATE_LIMIT_WINDOW_MINUTES} minutes.` 
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // The expected password - hash it with bcrypt for comparison
      // Note: In production, this should be stored securely, not in code
      const expectedPassword = "Filmology123@";
      const isValidPassword = password === expectedPassword;
      
      if (!isValidPassword) {
        // Record failed attempt
        await supabase
          .from("login_attempts")
          .insert({
            ip_address: clientIP,
            was_successful: false,
          });
        
        console.log(`[investor-auth] Login failed - invalid password`);
        
        // Calculate remaining attempts
        const remainingAttempts = MAX_ATTEMPTS - attemptCount - 1;
        const warningMessage = remainingAttempts <= 2 && remainingAttempts > 0 
          ? ` ${remainingAttempts} attempts remaining.`
          : "";
        
        return new Response(
          JSON.stringify({ error: `Invalid password.${warningMessage}` }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Record successful attempt and clean up old attempts
      await supabase
        .from("login_attempts")
        .insert({
          ip_address: clientIP,
          was_successful: true,
        });
      
      // Clean up old login attempts (older than 1 hour)
      await supabase.rpc("cleanup_old_login_attempts");
      
      // Create session token (expires in 24 hours)
      const sessionToken = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      // Store session in database
      const { error: sessionError } = await supabase
        .from("investor_sessions")
        .insert({
          investor_id: null,
          token: sessionToken,
          expires_at: expiresAt,
        });
      
      if (sessionError) {
        console.error("[investor-auth] Session creation error:", sessionError.code);
      }
      
      console.log(`[investor-auth] Login successful`);
      
      return new Response(
        JSON.stringify({
          success: true,
          token: sessionToken,
          expiresAt,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "verify") {
      if (!token) {
        return new Response(
          JSON.stringify({ valid: false, error: "Token required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Find valid session
      const { data: session, error: sessionError } = await supabase
        .from("investor_sessions")
        .select("expires_at")
        .eq("token", token)
        .gt("expires_at", new Date().toISOString())
        .single();
      
      if (sessionError || !session) {
        console.log("[investor-auth] Token verification failed");
        return new Response(
          JSON.stringify({ valid: false }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      console.log("[investor-auth] Token verified successfully");
      
      return new Response(
        JSON.stringify({
          valid: true,
          expiresAt: session.expires_at,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (action === "logout") {
      if (!token) {
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Delete session
      await supabase
        .from("investor_sessions")
        .delete()
        .eq("token", token);
      
      console.log("[investor-auth] Logout successful");
      
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("[investor-auth] Error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
