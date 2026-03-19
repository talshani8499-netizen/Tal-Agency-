import React, { useState } from "react";
import { Button } from "./ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    // TODO: Connect to a real form service (Formspree, Netlify Forms, etc.)
    const formData = new FormData(e.currentTarget);
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  if (status === "success") {
    return (
      <div className="glass-panel border-emerald-500/30 bg-emerald-900/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-emerald-500/30">
          ✓
        </div>
        <h3 className="text-2xl font-serif text-text-heading mb-2">Message Received!</h3>
        <p className="text-text-body">
          Thanks for reaching out. One of our AI strategists will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-heading mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-heading mb-2">Work Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            placeholder="john@company.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-text-heading mb-2">Business Name</label>
        <input
          type="text"
          id="company"
          name="company"
          required
          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
          placeholder="Acme Corp"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-heading mb-2">How can we help you grow?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none"
          placeholder="Tell us about your current bottlenecks..."
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      
      <p className="text-xs text-text-muted text-center mt-4">
        By submitting this form, you agree to our <a href="/privacy-policy" className="underline hover:text-accent transition-colors">Privacy Policy</a>.
      </p>
    </form>
  );
}
