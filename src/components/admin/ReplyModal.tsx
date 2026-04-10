import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  contact: { id: string; name: string; email: string; message: string } | null;
}

const ReplyModal = ({ open, onClose, contact }: ReplyModalProps) => {
  const [subject, setSubject] = useState(`Re: Inquiry from ${contact?.name || ""}`);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!contact || !subject.trim() || !body.trim()) return;
    setSending(true);
    try {
      const pw = sessionStorage.getItem("adminAuth");
      const { data, error } = await supabase.functions.invoke("admin-data", {
        body: {
          password: pw,
          action: "reply",
          recipientEmail: contact.email,
          recipientName: contact.name,
          subject,
          messageBody: body,
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: "Reply failed", description: data.error, variant: "destructive" });
      } else {
        toast({ title: "Reply sent", description: `Email sent to ${contact.email}` });
        setBody("");
        onClose();
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to send reply", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reply to {contact.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">To</p>
            <p className="text-sm font-medium">{contact.email}</p>
          </div>
          <div className="bg-muted/50 rounded-md p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Original message</p>
            <p className="text-sm text-foreground/80">{contact.message}</p>
          </div>
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="Write your reply..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} disabled={sending || !body.trim()}>
              <Send className="w-4 h-4 mr-1" />
              {sending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
