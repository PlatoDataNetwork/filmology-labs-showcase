import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema matching backend
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().max(2000, "Message must be less than 2000 characters").optional(),
});

interface ContactFormModalProps {
  trigger: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const ContactFormModal = ({ trigger, onOpenChange }: ContactFormModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    inquireRent: false,
    stayInLoop: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Client-side validation
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!formData.inquireRent && !formData.stayInLoop) {
      setErrors({ checkboxes: "Please select at least one option." });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-submit', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          message: formData.message.trim(),
        },
      });

      if (error || !data?.success) {
        const errorMessages = data?.errors?.join(', ') || 'Failed to submit form';
        toast({
          title: "Error",
          description: errorMessages,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Message Sent",
        description: data.message || "Thank you for your inquiry. We'll get back to you shortly.",
      });

      setFormData({ name: '', email: '', company: '', message: '', inquireRent: false, stayInLoop: false });
      setIsSubmitting(false);
      handleOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to submit form. Please try again later.",
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wide">Get in Touch</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Interested in renting at Filmology Labs? Fill out the form below and our team will respond promptly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="bg-background border-border"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-background border-border"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              maxLength={100}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company (optional)"
              className="bg-background border-border"
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="inquireRent"
                checked={formData.inquireRent}
                onCheckedChange={(checked) => setFormData({ ...formData, inquireRent: checked === true })}
              />
              <Label htmlFor="inquireRent" className="text-sm font-normal cursor-pointer">Inquire to Rent</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="stayInLoop"
                checked={formData.stayInLoop}
                onCheckedChange={(checked) => setFormData({ ...formData, stayInLoop: checked === true })}
              />
              <Label htmlFor="stayInLoop" className="text-sm font-normal cursor-pointer">Stay in the Loop</Label>
            </div>
          </div>
          {errors.checkboxes && (
            <p className="text-sm text-destructive">{errors.checkboxes}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              maxLength={2000}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your interest in Filmology Labs..."
              className="min-h-[120px] bg-background border-border resize-none"
            />
            <div className="flex justify-between">
              {errors.message ? (
                <p className="text-sm text-destructive">{errors.message}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">
                {formData.message.length}/2000
              </span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;