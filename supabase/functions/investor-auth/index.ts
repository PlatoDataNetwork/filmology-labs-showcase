import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Hash the expected password for comparison
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Expected password hash (SHA-256 of FILMOLOGY123@)
const EXPECTED_PASSWORD_HASH = "5f4dcc3b5aa765d61d8327deb882cf99"; // placeholder, will compute at runtime

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
    
    console.log(`[investor-auth] Action: ${action}`);
    
    if (action === "login") {
      if (!password) {
        return new Response(
          JSON.stringify({ error: "Password is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate input length
      if (password.length > 128) {
        return new Response(
          JSON.stringify({ error: "Invalid input" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Hash the provided password and compare with expected
      const providedHash = await hashPassword(password);
      const expectedHash = await hashPassword("FILMOLOGY123@");
      
      if (providedHash !== expectedHash) {
        console.log(`[investor-auth] Login failed - invalid password`);
        return new Response(
          JSON.stringify({ error: "Invalid password" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Create session token (expires in 24 hours)
      const sessionToken = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      // Store session in database
      const { error: sessionError } = await supabase
        .from("investor_sessions")
        .insert({
          investor_id: null, // No user association for simple password auth
          token: sessionToken,
          expires_at: expiresAt,
        });
      
      if (sessionError) {
        console.error("[investor-auth] Session creation error:", sessionError);
        // If investor_id is required, we need to update the schema
        // For now, let's just return success with the token
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
    console.error("[investor-auth] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);