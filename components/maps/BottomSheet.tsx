"use client";

import { X, MapPin, Clock, Phone, Star, Calendar } from "lucide-react";

const formatDistance = (distance: number) => {
  if (distance < 1000) return `${Math.round(distance)} m`;

  const km = distance / 1000;
  return `${km.toFixed(km < 10 ? 1 : 0)} km`;
};

const formatDuration = (duration: number) => {
  const minutes = Math.round(duration / 60);

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

interface BottomSheetProps {
  service: {
    id: number;
    title: string;
    icon: string;
    rating?: number;
    reviews?: number;
    phone?: string;
  };
  distance: number;
  duration: number;
  onClose: () => void;
  onBook: () => void;
  onDetails: () => void;
}

export default function BottomSheet({
  service,
  distance,
  duration,
  onClose,
  onBook,
  onDetails,
}: BottomSheetProps) {
  return (
    <div
      className={`
        absolute bottom-0 left-0 right-0
        rounded-t-3xl bg-white/95 p-6 shadow-2xl backdrop-blur-xl
        animate-in slide-in-from-bottom duration-500
        border-t border-white/20
      `}
    >
      {/* Handle */}
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300" />

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
          {service.rating && (
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">{service.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({service.reviews} reviews)
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-sky-50 p-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            Distance
          </div>
          <p className="mt-1 font-bold text-gray-900">
            {formatDistance(distance)}
          </p>
        </div>
        <div className="rounded-xl bg-sky-50 p-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            ETA
          </div>
          <p className="mt-1 font-bold text-gray-900">
            {formatDuration(duration)}
          </p>
        </div>
      </div>

      {service.phone && (
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <Phone size={18} className="text-gray-600" />
          <span className="text-sm text-gray-700">{service.phone}</span>
        </div>
      )}

      <div className="mt-5 flex gap-3">
        <button
          onClick={onBook}
          className="flex-1 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 py-3.5 font-medium text-white shadow-lg shadow-sky-500/30 transition hover:scale-[1.02] hover:shadow-sky-500/40"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar size={18} />
            Book Now
          </div>
        </button>
        <button
          onClick={onDetails}
          className="rounded-xl border-2 border-gray-200 px-6 py-3.5 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Details
        </button>
      </div>
    </div>
  );
}