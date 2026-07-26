"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrailerButtonProps {
  trailerKey: string | null;
  movieTitle: string;
}

export function TrailerButton({ trailerKey, movieTitle }: TrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailerKey) {
    return (
      <Button size="lg" className="gap-2 px-8 opacity-50 cursor-not-allowed" disabled>
        <Play className="w-5 h-5 fill-current" /> No Trailer Available
      </Button>
    );
  }

  return (
    <>
      <Button size="lg" className="gap-2 px-8" onClick={() => setIsOpen(true)}>
        <Play className="w-5 h-5 fill-current" /> Watch Trailer
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* YouTube Embed */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${movieTitle} - Official Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="absolute bottom-6 text-white/40 text-sm">Click outside or press ESC to close</p>
        </div>
      )}
    </>
  );
}
