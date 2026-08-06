"use client";

import { ReactNode } from "react";

interface MapMarkerProps {
  children: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  label?: string;
  color?: string;
}

export default function MapMarker({ 
  children, 
  isSelected = false, 
  onClick, 
  label,
  color = "sky" 
}: MapMarkerProps) {
  const colorClasses = {
    sky: {
      border: "border-sky-500",
      bg: "bg-sky-500",
      shadow: "shadow-[0_0_25px_rgba(59,130,246,.55)]",
      glow: "bg-sky-500/20",
      text: "text-sky-400",
      hover: "group-hover:shadow-[0_0_40px_rgba(59,130,246,.9)]"
    },
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-500",
      shadow: "shadow-[0_0_25px_rgba(16,185,129,.55)]",
      glow: "bg-emerald-500/20",
      text: "text-emerald-400",
      hover: "group-hover:shadow-[0_0_40px_rgba(16,185,129,.9)]"
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-500",
      shadow: "shadow-[0_0_25px_rgba(168,85,247,.55)]",
      glow: "bg-purple-500/20",
      text: "text-purple-400",
      hover: "group-hover:shadow-[0_0_40px_rgba(168,85,247,.9)]"
    }
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.sky;

  return (
    <div className="group flex cursor-pointer flex-col items-center" onClick={onClick}>
      <div
        className={`
          flex h-16 w-16 items-center justify-center rounded-full
          border-[3px] ${colors.border} bg-zinc-900 ${colors.text}
          shadow-lg ${colors.shadow} transition-all duration-300
          ${isSelected ? 'scale-110' : 'group-hover:scale-110'}
          ${isSelected ? colors.hover : 'group-hover:' + colors.hover}
          relative
        `}
      >
        {children}
        {isSelected && (
          <div className="absolute -inset-1 rounded-full border-2 border-white/30 animate-pulse" />
        )}
      </div>
      {label && (
        <div
          className={`
            mt-2 rounded-full bg-zinc-900/95 px-4 py-1 text-center
            text-sm font-semibold text-white shadow-xl backdrop-blur
            transition-all duration-300
            ${isSelected ? 'scale-105 bg-zinc-900' : ''}
          `}
        >
          {label}
        </div>
      )}
    </div>
  );
}