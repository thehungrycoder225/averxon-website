"use server";

import {
  ContactSubmissionSchema,
  type ContactActionResult,
} from "@/lib/validation";

export async function submitContactInquiry(
  formData: FormData
): Promise<ContactActionResult> {
  const rawPayload = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    category: String(formData.get("category") ?? "partnership"),
    message: String(formData.get("message") ?? ""),
    _gotcha: String(formData.get("_gotcha") ?? ""),
  };

  // Anti-spam honeypot check
  if (rawPayload._gotcha.trim().length > 0) {
    return {
      state: "SUCCESS",
      message: "Thank you for contacting AVERXON.",
      submittedAt: new Date().toISOString(),
    };
  }

  const parsed = ContactSubmissionSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return {
      state: "ERROR",
      message: "Please correct the highlighted validation errors and resubmit.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    state: "SUCCESS",
    message: `Thank you, ${parsed.data.fullName}. Your inquiry regarding "${parsed.data.category.replace("_", " ")}" has been logged by AVERXON.`,
    submittedAt: new Date().toISOString(),
  };
}
