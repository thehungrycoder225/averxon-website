import { z } from "zod";

export type ContactFormLifecycleState =
  | "IDLE"
  | "VALIDATING"
  | "SUBMITTING"
  | "SUCCESS"
  | "ERROR";

export const InquiryCategorySchema = z.enum([
  "partnership",
  "cultural_academic",
  "press_media",
  "community_events",
  "general",
]);

export type InquiryCategory = z.infer<typeof InquiryCategorySchema>;

export const ContactSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer."),
  organization: z
    .string()
    .trim()
    .max(120, "Organization name must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),
  category: InquiryCategorySchema,
  message: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters so we can assist you properly.")
    .max(2000, "Message must be 2000 characters or fewer."),
  _gotcha: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactSubmissionInput = z.infer<typeof ContactSubmissionSchema>;

export interface ContactActionResult {
  state: ContactFormLifecycleState;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactSubmissionInput, string[]>>;
  submittedAt?: string;
}
