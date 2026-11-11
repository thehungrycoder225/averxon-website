"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  QualityTier,
  ResolvedQualityTier,
} from "@/experience/quality/stateTypes";

export interface QualitySelectorProps {
  value: QualityTier;
  resolvedTier: ResolvedQualityTier;
  onChange: (tier: QualityTier) => void;
}

const QUALITY_OPTIONS: { value: QualityTier; label: string }[] = [
  { value: "AUTO", label: "Auto Quality" },
  { value: "HIGH", label: "High (3D)" },
  { value: "MEDIUM", label: "Medium (3D)" },
  { value: "LOW", label: "Low (3D)" },
  { value: "STATIC", label: "Static (2D)" },
];

export function QualitySelector({
  value,
  resolvedTier,
  onChange,
}: QualitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={value}
        onValueChange={(next) => onChange(next as QualityTier)}
      >
        <SelectTrigger
          aria-label={`Visual quality mode, currently ${value} (${resolvedTier})`}
          className="min-w-[140px] max-w-[175px] border-[#30344A] bg-[#151729]/95 text-xs font-medium text-[#F5F5FA] focus:ring-[#01BEF5]"
        >
          <SelectValue placeholder="Quality Mode" />
        </SelectTrigger>
        <SelectContent>
          {QUALITY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
              {opt.value === "AUTO" ? ` (${resolvedTier})` : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
