import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple password hashing using Web Crypto API
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

interface AuthRequest {
  action: "login" | "verify" | "logout";
  email?: string;
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
    
    const { action, email, password, token }: AuthRequest = await req.json();
    
    console.log(`[investor-auth] Action: ${action}`);
    
    if (action === "login") {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: "Email and password are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Validate input lengths
      if (email.length > 255 || password.length > 128) {
        return new Response(
          JSON.stringify({ error: "Invalid input" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const passwordHash = await hashPassword(password);
      
      // Find user with matching credentials
      const { data: user, error: userError } = await supabase
        .from("investor_users")
        .select("id, email, name, company")
        .eq("email", email.toLowerCase().trim())
        .eq("password_hash", passwordHash)
        .single();
      
      if (userError || !user) {
        console.log(`[investor-auth] Login failed for email: ${email}`);
        return new Response(
          JSON.stringify({ error: "Invalid email or password" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Create session token (expires in 24 hours)
      const sessionToken = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      const { error: sessionError } = await supabase
        .from("investor_sessions")
        .insert({
          investor_id: user.id,
          token: sessionToken,
          expires_at: expiresAt,
        });
      
      if (sessionError) {
        console.error("[investor-auth] Session creation error:", sessionError);
        return new Response(
          JSON.stringify({ error: "Failed to create session" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Update last login
      await supabase
        .from("investor_users")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", user.id);
      
      console.log(`[investor-auth] Login successful for: ${email}`);
      
      return new Response(
        JSON.stringify({
          success: true,
          token: sessionToken,
          user: {
            email: user.email,
            name: user.name,
            company: user.company,
          },
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
        .select("investor_id, expires_at, investor_users(email, name, company)")
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
          user: session.investor_users,
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