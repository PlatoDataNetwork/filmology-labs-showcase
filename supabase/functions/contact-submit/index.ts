import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function sanitizeString(str: string): string {
  // Remove any HTML tags and trim
  return str.replace(/<[^>]*>/g, "").trim();
}

function validateSubmission(data: any): { valid: boolean; errors: string[]; sanitized?: ContactSubmission } {
  const errors: string[] = [];
  
  // Validate name
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required");
  } else if (data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }
  
  // Validate email
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else if (!validateEmail(data.email)) {
    errors.push("Invalid email address");
  }
  
  // Validate message
  if (!data.message || typeof data.message !== "string") {
    errors.push("Message is required");
  } else if (data.message.length > 2000) {
    errors.push("Message must be less than 2000 characters");
  } else if (data.message.length < 10) {
    errors.push("Message must be at least 10 characters");
  }
  
  // Validate company (optional)
  if (data.company && typeof data.company === "string" && data.company.length > 100) {
    errors.push("Company name must be less than 100 characters");
  }
  
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  
  return {
    valid: true,
    errors: [],
    sanitized: {
      name: sanitizeString(data.name),
      email: sanitizeString(data.email).toLowerCase(),
      company: data.company ? sanitizeString(data.company) : undefined,
      message: sanitizeString(data.message),
    },
  };
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
    
    const body = await req.json();
    
    console.log("[contact-submit] Received submission");
    
    // Validate input
    const validation = validateSubmission(body);
    
    if (!validation.valid) {
      console.log("[contact-submit] Validation failed:", validation.errors);
      return new Response(
        JSON.stringify({ success: false, errors: validation.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { sanitized } = validation;
    
    // Store submission in database
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name: sanitized!.name,
        email: sanitized!.email,
        company: sanitized!.company || null,
        message: sanitized!.message,
      });
    
    if (insertError) {
      console.error("[contact-submit] Database error:", insertError);
      return new Response(
        JSON.stringify({ success: false, errors: ["Failed to submit form. Please try again."] }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log("[contact-submit] Submission saved successfully");
    
    return new Response(
      JSON.stringify({ success: true, message: "Thank you for your inquiry. We will be in touch soon." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("[contact-submit] Error:", error);
    return new Response(
      JSON.stringify({ success: false, errors: ["Internal server error"] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);