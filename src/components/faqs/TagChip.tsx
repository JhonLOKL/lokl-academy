"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TagChipProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function TagChip({ icon: Icon, label, active, onClick }: TagChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
        "border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "backdrop-blur-md shadow-lg",
        active
          ? "border-blue-400/60 bg-blue-500/80 text-white shadow-blue-500/50"
          : "border-white/40 bg-white/20 text-white hover:bg-white/30 hover:border-white/60"
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

