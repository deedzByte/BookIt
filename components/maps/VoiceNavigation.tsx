"use client";

import { useEffect, useState, useCallback } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  Navigation,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface VoiceNavigationProps {
  steps: any[];
  currentStepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  isNavigating: boolean;
  distance: number;
  duration: number;
  onStop: () => void;
}

export default function VoiceNavigation({
  steps,
  currentStepIndex,
  onNext,
  onPrevious,
  isNavigating,
  distance,
  duration,
  onStop,
}: VoiceNavigationProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Text-to-Speech for voice navigation
  const speak = useCallback((text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Try to get a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Samantha') || 
      voice.name.includes('Google UK') ||
      voice.name.includes('Microsoft Zira')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  // Auto-speak when step changes
  useEffect(() => {
    if (!isNavigating || !currentStep) return;

    const instruction = currentStep.maneuver?.instruction || 
                       currentStep.instructions || 
                       'Continue straight';
    
    // Speak the instruction
    speak(instruction);

    // Also speak distance to next turn if available
    if (currentStep.distance) {
      const distText = currentStep.distance < 1000 
        ? `${Math.round(currentStep.distance)} meters`
        : `${(currentStep.distance / 1000).toFixed(1)} kilometers`;
      
      setTimeout(() => {
        speak(`In ${distText}`);
      }, 1500);
    }
  }, [currentStepIndex, isNavigating, speak, currentStep]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Check speech support
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  if (!currentStep || !isNavigating) return null;

  const instruction = currentStep.maneuver?.instruction || 
                     currentStep.instructions || 
                     'Continue straight';
  const icon = currentStep.maneuver?.modifier || 'straight';

  return (
    <div className="absolute bottom-8 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
      <div className="rounded-2xl bg-white/95 p-5 shadow-2xl backdrop-blur-xl border border-white/20 animate-in slide-in-from-bottom duration-500">
        {/* Progress Bar */}
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Turn Icon */}
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
            {getTurnEmoji(icon)}
          </div>

          {/* Instruction */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900">
              {cleanInstruction(instruction)}
            </p>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              {currentStep.distance && (
                <span className="flex items-center gap-1">
                  <Navigation size={14} />
                  {formatStepDistance(currentStep.distance)}
                </span>
              )}
            </div>
          </div>

          {/* Voice Control */}
          {speechSupported && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title={isMuted ? 'Unmute voice' : 'Mute voice'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          {/* ETA & Distance */}
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="text-sm font-bold text-gray-900">
                {formatDistance(distance)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">ETA</p>
              <p className="text-sm font-bold text-gray-900">
                {formatDuration(duration)}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onPrevious}
              disabled={currentStepIndex === 0}
              className={`
                flex h-9 w-9 items-center justify-center rounded-full transition
                ${currentStepIndex === 0 
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={onNext}
              disabled={currentStepIndex === totalSteps - 1}
              className={`
                flex h-9 w-9 items-center justify-center rounded-full transition
                ${currentStepIndex === totalSteps - 1 
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400' 
                  : 'bg-sky-500 hover:bg-sky-600 text-white'
                }
              `}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Stop Navigation Button */}
        <button
          onClick={onStop}
          className="mt-3 w-full rounded-xl bg-red-50 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Stop Navigation
        </button>
      </div>
    </div>
  );
}

function getTurnEmoji(modifier: string): string {
  const map: Record<string, string> = {
    'straight': '⬆️',
    'left': '⬅️',
    'right': '➡️',
    'sharp left': '↰',
    'sharp right': '↱',
    'slight left': '↖️',
    'slight right': '↗️',
    'u-turn': '↩️',
  };
  return map[modifier] || '📍';
}

function cleanInstruction(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
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

function formatStepDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}