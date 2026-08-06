"use client";

import { X, Navigation, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface NavigationHeaderProps {
  destination: string;
  distance: number;
  duration: number;
  onClose: () => void;
}

export default function NavigationHeader({
  destination,
  distance,
  duration,
  onClose,
}: NavigationHeaderProps) {
  return (
    <div className="absolute left-4 right-4 top-4 z-10">
      <div className="flex items-center gap-3 rounded-xl bg-white/95 p-3 shadow-xl backdrop-blur border border-white/20">
        <button
          onClick={onClose}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Navigating to {destination}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {formatDistance(distance)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500">
          <Navigation size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}