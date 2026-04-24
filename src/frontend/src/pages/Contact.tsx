import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { APP_CONFIG } from "@/config";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { SiFacebook } from "react-icons/si";

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
];

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: ContactForm = { name: "", email: "", phone: "", message: "" };

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleBlur(field: keyof ContactForm) {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === "name") {
        if (!form.name.trim()) next.name = "Name is required";
        else next.name = undefined;
      }
      if (field === "email") {
        if (
          !form.email.trim() ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        )
          next.email = "Valid email is required";
        else next.email = undefined;
      }
      if (field === "message") {
        if (form.message.length < 10)
          next.message = "Message must be at least 10 characters";
        else next.message = undefined;
      }
      return next;
    });
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated submission — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    console.log("[DhobiGhat Contact]", form);
    setSubmitting(false);
    setSubmitted(true);
    setForm(EMPTY_FORM);
  }

  function change(field: keyof ContactForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
          data-ocid="contact-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm">
            We're here to help — reach us by phone, email, or send a message
            below.
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href={`tel:+91${APP_CONFIG.phone}`}
            className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-card hover:border-accent/40 transition-smooth service-card-hover"
            data-ocid="contact-phone"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm">Call Us</p>
              <p className="text-muted-foreground text-sm truncate">
                +91 {APP_CONFIG.phone}
              </p>
            </div>
          </a>

          <a
            href={`mailto:${APP_CONFIG.email}`}
            className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-card hover:border-accent/40 transition-smooth service-card-hover"
            data-ocid="contact-email"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm">Email Us</p>
              <p className="text-muted-foreground text-sm truncate">
                {APP_CONFIG.email}
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/91${APP_CONFIG.phone}?text=Hi%20DhobiGhat!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border shadow-card hover:border-green-300 transition-smooth service-card-hover"
            data-ocid="contact-whatsapp"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">WhatsApp</p>
              <p className="text-muted-foreground text-sm">
                Chat with us directly
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">
                Business Hours
              </p>
              {BUSINESS_HOURS.map((bh) => (
                <div
                  key={bh.day}
                  className="flex justify-between gap-4 text-xs text-muted-foreground leading-5"
                >
                  <span>{bh.day}</span>
                  <span className="font-medium text-foreground text-right">
                    {bh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Address + map */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden mb-8">
          <div className="p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">
                Our Location
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {APP_CONFIG.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(APP_CONFIG.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary font-medium hover:underline"
                data-ocid="contact-map-link"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
          {/* Map placeholder iframe */}
          <div className="h-48 bg-muted/50 border-t border-border relative overflow-hidden">
            <iframe
              title="DhobiGhat location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(APP_CONFIG.address)}&output=embed&z=15`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <noscript>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80 gap-2">
                <MapPin className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center px-4">
                  Map not available — {APP_CONFIG.address}
                </p>
              </div>
            </noscript>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted-foreground font-medium">
            Follow us:
          </span>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent/40 hover:bg-muted/60 transition-smooth"
            data-ocid="contact-facebook"
          >
            <SiFacebook className="w-4 h-4 text-blue-600" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent/40 hover:bg-muted/60 transition-smooth"
            data-ocid="contact-instagram"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
          </a>
          <a
            href={`https://wa.me/91${APP_CONFIG.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent/40 hover:bg-muted/60 transition-smooth"
            data-ocid="contact-social-whatsapp"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
          </a>
        </div>

        {/* Contact form */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-6">
          <h2 className="font-display font-bold text-xl text-foreground mb-1">
            Send a Message
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            We usually reply within 4–6 business hours.
          </p>

          {submitted ? (
            <div
              className="flex flex-col items-center gap-3 py-10 text-center"
              data-ocid="contact-success"
            >
              <CheckCircle className="w-14 h-14 text-green-500" />
              <p className="font-semibold text-lg text-foreground">
                Message received!
              </p>
              <p className="text-muted-foreground text-sm max-w-xs">
                Thanks for reaching out. Our team will get back to you at{" "}
                <strong>{form.email || "your email"}</strong> within 4–6 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-primary font-medium hover:underline"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  data-ocid="contact-input-name"
                  className={
                    errors.name
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email Address *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="priya@example.com"
                    value={form.email}
                    onChange={(e) => change("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    data-ocid="contact-input-email"
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone">Phone (optional)</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={(e) => change("phone", e.target.value)}
                    maxLength={10}
                    data-ocid="contact-input-phone"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe how we can help you…"
                  value={form.message}
                  onChange={(e) => change("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  rows={4}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  data-ocid="contact-input-message"
                  className={
                    errors.message
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                <div className="flex justify-between items-start">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-muted-foreground shrink-0 ml-2">
                    {form.message.length}/500
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                data-ocid="contact-submit"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
