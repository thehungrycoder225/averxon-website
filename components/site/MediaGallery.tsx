"use client";

import React, { useState } from "react";
import { Expand } from "lucide-react";
import type { Media } from "@/content/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export interface MediaGalleryProps {
  items: Media[];
  gameTitle: string;
}

/**
 * MediaGallery — Locked IOCO Architectural Style
 * Clean sharp-edged gallery frames with subtle top-down hover spotlight and expand trigger.
 */
export function MediaGallery({ items, gameTitle }: MediaGalleryProps) {
  const [selected, setSelected] = useState<Media | null>(null);

  if (!items.length) return null;

  return (
    <div id="gallery" className="space-y-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, idx) => (
          <figure
            key={item.id}
            className="group overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 transition-all duration-500 hover:border-[#8A45CD]/60"
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`Inspect ${item.caption || item.alt} in full view`}
              className="relative block aspect-[16/10] w-full overflow-hidden bg-[#030237] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 right-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#FF6924]/70 bg-[#090B16]/90 text-[#FF6924] transition-colors group-hover:border-[#FDB001] group-hover:text-[#FDB001]">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#F5F5FA]/10 px-5 py-3.5 text-xs text-[#B6B9C9]">
              <span className="flex items-center gap-2.5 font-medium text-[#F5F5FA]">
                <span className="font-mono text-[10px] font-bold text-[#FF6924]">
                  0{idx + 1}
                </span>
                <span>{item.caption ?? item.alt}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent>
          {selected && (
            <div className="space-y-4">
              <DialogTitle>
                {selected.caption ?? `${gameTitle} Media`}
              </DialogTitle>
              <div className="overflow-hidden border border-[#F5F5FA]/15 bg-[#030237]">
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <DialogDescription>{selected.alt}</DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
