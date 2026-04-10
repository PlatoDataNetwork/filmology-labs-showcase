import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_PASSWORD = "Film1234@";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { password, action } = body;

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Default action: fetch all data
    if (!action || action === "fetch") {
      const [contactsRes, loginsRes, sessionsRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(500),
        supabase.from("login_attempts").select("*").order("attempted_at", { ascending: false }).limit(200),
        supabase.from("investor_sessions").select("*").order("created_at", { ascending: false }).limit(200),
      ]);

      return new Response(JSON.stringify({
        contacts: contactsRes.data || [],
        loginAttempts: loginsRes.data || [],
        sessions: sessionsRes.data || [],
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Edit a contact submission
    if (action === "edit") {
      const { id, name, email, company, message } = body;
      if (!id) {
        return new Response(JSON.stringify({ error: "Missing id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const updateData: Record<string, string> = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (company !== undefined) updateData.company = company;
      if (message !== undefined) updateData.message = message;

      const { error } = await supabase.from("contact_submissions").update(updateData).eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Delete a contact submission
    if (action === "delete") {
      const { id } = body;
      if (!id) {
        return new Response(JSON.stringify({ error: "Missing id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send reply email
    if (action === "reply") {
      const { recipientEmail, recipientName, subject, messageBody } = body;
      if (!recipientEmail || !subject || !messageBody) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Use Resend-style API or SMTP — for now use a simple fetch to send via Lovable email
      // We'll call the project's send-transactional-email if available, otherwise use a direct approach
      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "admin-reply",
            recipientEmail,
            idempotencyKey: `admin-reply-${Date.now()}`,
            templateData: { name: recipientName, subject, message: messageBody },
          },
        });
      } catch (emailErr) {
        console.error("[admin-data] Email send failed, trying direct send:", emailErr);
        // Fallback: just log the reply attempt
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Email infrastructure not yet configured. Please set up email domain first.",
        }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Export mailing list (all unique emails)
    if (action === "export-emails") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("name, email, company, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ emails: data || [] }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[admin-data] Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
