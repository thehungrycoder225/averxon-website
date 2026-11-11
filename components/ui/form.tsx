import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none text-[#F5F3F8] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex min-h-[44px] w-full rounded-lg border border-[#343849] bg-[#171B2A] px-3.5 py-2 text-sm text-[#F5F3F8] placeholder:text-[#B9BBC7]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8AE63] focus-visible:border-[#D8AE63] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full rounded-lg border border-[#343849] bg-[#171B2A] px-3.5 py-2.5 text-sm text-[#F5F3F8] placeholder:text-[#B9BBC7]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8AE63] focus-visible:border-[#D8AE63] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Label, Input, Textarea };
