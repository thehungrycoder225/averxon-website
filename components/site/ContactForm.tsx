"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Play } from "lucide-react";
import {
  ContactSubmissionSchema,
  type ContactActionResult,
  type ContactFormLifecycleState,
  type InquiryCategory,
} from "@/lib/validation";
import { Input, Label, Textarea } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ContactFormProps {
  submitAction: (formData: FormData) => Promise<ContactActionResult>;
}

/**
 * ContactForm — Locked IOCO Architectural Style
 * Uses sharp architectural panel framing and the split-chamber submit button (`Submit Inquiry | ▸`).
 */
export function ContactForm({ submitAction }: ContactFormProps) {
  const [lifecycle, setLifecycle] = useState<ContactFormLifecycleState>("IDLE");
  const [category, setCategory] = useState<InquiryCategory>("partnership");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLifecycle("VALIDATING");
    setFieldErrors({});
    setStatusMessage("");

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.set("category", category);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      category,
      message: String(formData.get("message") ?? ""),
      _gotcha: String(formData.get("_gotcha") ?? ""),
    };

    const parsed = ContactSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      setLifecycle("ERROR");
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setStatusMessage("Please review the highlighted fields and try again.");
      return;
    }

    setLifecycle("SUBMITTING");
    try {
      const result = await submitAction(formData);
      setLifecycle(result.state);
      setStatusMessage(result.message);
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      if (result.state === "SUCCESS") {
        formEl.reset();
      }
    } catch {
      setLifecycle("ERROR");
      setStatusMessage(
        "We encountered a temporary issue submitting your inquiry. Please try again."
      );
    }
  }

  return (
    <div className="border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 sm:p-9">
      <div className="mb-6 space-y-2 border-b border-[#F5F5FA]/10 pb-5">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-block h-[2px] w-5 bg-[#FF6924]"
          />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
            DIRECT DISPATCH
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
          Send an Inquiry
        </h2>
        <p className="text-xs text-[#B6B9C9]">
          All fields marked with <span className="text-[#FDB001]">*</span> are
          required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Anti-spam Honeypot Field (hidden from screen readers and keyboard users) */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-gotcha">Leave this field blank</label>
          <input
            id="contact-gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-[#FDB001]">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g., Maria Santos"
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={
              fieldErrors.fullName ? "fullName-error" : undefined
            }
          />
          {fieldErrors.fullName && (
            <p id="fullName-error" className="text-xs text-[#F87171]">
              {fieldErrors.fullName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-[#FDB001]">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@organization.ph"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-xs text-[#F87171]">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="organization">Organization / Institution</Label>
            <Input
              id="organization"
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Studio, University, or Agency"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiry-category">
              Inquiry Category <span className="text-[#FDB001]">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as InquiryCategory)}
            >
              <SelectTrigger
                id="inquiry-category"
                aria-label="Inquiry Category"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partnership">
                  Game &amp; Industry Partnership
                </SelectItem>
                <SelectItem value="cultural_academic">
                  Cultural &amp; Academic Research
                </SelectItem>
                <SelectItem value="community_events">
                  Showcases, Expos &amp; Student Events
                </SelectItem>
                <SelectItem value="press_media">
                  Press &amp; Media Inquiry
                </SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-[#FDB001]">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project, research collaboration, or event..."
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message && (
            <p id="message-error" className="text-xs text-[#F87171]">
              {fieldErrors.message[0]}
            </p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-[#B6B9C9]">
          Privacy Notice: Your contact details are validated server-side and
          used exclusively by AVERXON to respond to your inquiry. We never sell
          or share personal information with third parties.
        </p>

        {/* Locked IOCO Split-Chamber Submit Button */}
        <button
          type="submit"
          disabled={lifecycle === "SUBMITTING" || lifecycle === "VALIDATING"}
          className="group inline-flex min-h-[52px] w-full items-stretch justify-between border border-[#FF6924]/80 bg-[#090B16]/90 shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-all hover:border-[#FDB001] hover:shadow-[0_0_28px_rgba(255,105,36,0.35)] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5] sm:w-auto"
        >
          <span className="flex items-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
            {lifecycle === "SUBMITTING"
              ? "Sending Inquiry..."
              : "Submit Inquiry"}
          </span>
          <span
            aria-hidden="true"
            className="flex items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 px-4 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        </button>

        {/* Accessible Live Status Region */}
        <div
          role="status"
          aria-live="polite"
          data-testid="contact-form-status"
          data-form-state={lifecycle}
          className="pt-2"
        >
          {lifecycle === "SUCCESS" && (
            <div className="flex items-start gap-2.5 border border-[#FDB001] bg-[#151729] p-4 text-sm text-[#F5F5FA]">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FDB001]"
                aria-hidden="true"
              />
              <span>{statusMessage}</span>
            </div>
          )}
          {lifecycle === "ERROR" && statusMessage && (
            <div className="flex items-start gap-2.5 border border-[#F87171] bg-[#151729] p-4 text-sm text-[#F5F5FA]">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-[#F87171]"
                aria-hidden="true"
              />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
