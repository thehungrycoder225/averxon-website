"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { PRIMARY_NAV_ITEMS } from "@/content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  activePath: string;
  /** Scroll-spy / route active nav href supplied by SiteHeader */
  activeHref?: string;
  /** When true, items scroll to in-page landing sections */
  isLanding?: boolean;
}

const MOBILE_SECTION_TARGETS: Record<string, string> = {
  "/": "awakening",
  "/about": "heritage",
  "/games": "four-worlds",
  "/achievements": "milestones",
  "/news": "news",
  "/connect": "future",
};

export function MobileNav({
  activePath,
  activeHref,
  isLanding = false,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open primary navigation menu"
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mb-6 flex flex-col gap-1 border-b border-[#343849] pb-4">
          <SheetTitle className="tracking-widest text-[#F5F3F8]">
            AVERXON
          </SheetTitle>
          <SheetDescription className="text-xs text-[#D8AE63]">
            Coding the Culture. Creating the Future.
          </SheetDescription>
        </div>
        <nav aria-label="Mobile primary navigation" className="flex flex-col gap-2">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeHref
              ? item.href === activeHref
              : item.href === "/"
                ? activePath === "/"
                : activePath.startsWith(item.href);
            const sectionId = MOBILE_SECTION_TARGETS[item.href];
            const href =
              isLanding && sectionId
                ? sectionId === "awakening"
                  ? "/"
                  : `/#${sectionId}`
                : item.href;
            return (
              <Link
                key={item.href}
                href={href}
                scroll={!isLanding}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  setOpen(false);
                  if (!isLanding || !sectionId) return;
                  const target = document.getElementById(sectionId);
                  if (!target) return;
                  event.preventDefault();
                  // Wait for the sheet to close before scrolling
                  window.setTimeout(() => {
                    if (sectionId === "awakening") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    window.history.replaceState(null, "", href);
                  }, 220);
                }}
                className={cn(
                  "relative flex min-h-[48px] items-center gap-3.5 rounded-xl px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                  isActive
                    ? "bg-[#FDB001]/10 text-[#FDB001]"
                    : "text-[#F5F3F8] hover:bg-[#151729]/70"
                )}
              >
                {/* Left Rotated Diamond Talisman Indicator */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rotate-45 transition-all",
                    isActive
                      ? "border border-[#FDB001] bg-[#FDB001] shadow-[0_0_10px_#FDB001]"
                      : "border border-[#30344A] bg-transparent"
                  )}
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-[#B9BBC7]">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
