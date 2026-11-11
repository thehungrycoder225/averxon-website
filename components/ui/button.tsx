import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030237] disabled:pointer-events-none disabled:opacity-55 min-h-[44px] px-5 py-2.5",
  {
    variants: {
      variant: {
        default:
          "bg-[#FDB001] text-[#030237] hover:bg-[#FFBE2E] active:bg-[#E09B00] shadow-sm",
        brand:
          "bg-[#087BE6] text-[#F5F5FA] border border-[#01BEF5]/40 hover:bg-[#01BEF5] hover:text-[#030237] active:bg-[#0664BD] shadow-sm",
        violet:
          "bg-[#8A45CD] text-[#F5F5FA] border border-[#01BEF5]/35 hover:bg-[#9B59DC] active:bg-[#7133B0]",
        outline:
          "border border-[#30344A] bg-[#151729]/90 text-[#F5F5FA] hover:border-[#01BEF5] hover:bg-[#22253A]",
        ghost:
          "text-[#B6B9C9] hover:bg-[#22253A] hover:text-[#F5F5FA]",
        link: "text-[#01BEF5] underline-offset-4 hover:underline min-h-0 px-1 py-1",
      },
      size: {
        default: "min-h-[44px] px-5 py-2.5",
        sm: "min-h-[44px] rounded-md px-3.5 text-xs",
        lg: "min-h-[48px] rounded-xl px-7 text-base",
        icon: "min-h-[44px] min-w-[44px] p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
