"use client";

import { Navigation, Crosshair, Layers } from "lucide-react";

interface FloatingControlsProps {
  onLocate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLayerToggle?: () => void;
}

export default function FloatingControls({
  onLocate,
  onZoomIn,
  onZoomOut,
  onLayerToggle,
}: FloatingControlsProps) {
  return (
    <div className="absolute right-6 top-24 flex flex-col gap-2">
      <button
        onClick={onLocate}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
      >
        <Crosshair size={20} className="text-sky-500" />
      </button>
      <button
        onClick={onZoomIn}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
      >
        <span className="text-2xl font-light text-gray-700">+</span>
      </button>
      <button
        onClick={onZoomOut}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
      >
        <span className="text-2xl font-light text-gray-700">−</span>
      </button>
      {onLayerToggle && (
        <button
          onClick={onLayerToggle}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white"
        >
          <Layers size={20} className="text-gray-700" />
        </button>
      )}
    </div>
  );
}