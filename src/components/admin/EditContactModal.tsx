import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface EditContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: { id: string; name: string; email: string; company: string | null; message: string } | null;
  onSaved: () => void;
}

const EditContactModal = ({ open, onClose, contact, onSaved }: EditContactModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setCompany(contact.company || "");
      setMessage(contact.message);
    }
  }, [contact]);

  const handleSave = async () => {
    if (!contact) return;
    setSaving(true);
    try {
      const pw = sessionStorage.getItem("adminAuth");
      const { data, error } = await supabase.functions.invoke("admin-data", {
        body: { password: pw, action: "edit", id: contact.id, name, email, company, message },
      });
      if (error) throw error;
      toast({ title: "Contact updated" });
      onSaved();
      onClose();
    } catch {
      toast({ title: "Error", description: "Failed to update contact", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactModal;
