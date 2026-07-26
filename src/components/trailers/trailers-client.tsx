"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, Share2, MessageCircle, Info, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrailerProps {
  id: string;
  movieId: string;
  title: string;
  genre: string;
  videoKey: string;
}

export function TrailersClient({ trailers }: { trailers: TrailerProps[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We are using iframes, which makes IntersectionObserver autoplay complex due to iframe security.
  // Instead, we will just render standard iframes that the user can play.
  // A true "Reels" feel with iframes requires using the YouTube IFrame Player API.
  // For simplicity, we just set pointer-events-auto so the user can interact.

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-4 z-50">
        <Button variant="ghost" size="icon" className="text-white hover:bg-black/40 bg-black/20 backdrop-blur-md rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </Link>
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {trailers.map((trailer) => (
          <div key={trailer.id} className="relative h-full w-full snap-start flex items-center justify-center bg-black">
            
            {/* Video Player */}
            <div className="absolute inset-0 pb-[20vh]">
              <iframe
                className="w-full h-full object-cover"
                src={`https://www.youtube.com/embed/${trailer.videoKey}?autoplay=0&loop=1&playlist=${trailer.videoKey}&controls=0&modestbranding=1&rel=0`}
                title={trailer.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Bottom Info Section */}
            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 pointer-events-none flex flex-col justify-end">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-black/50 drop-shadow-md">
                {trailer.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-6 font-medium shadow-black/50 drop-shadow-md">
                {trailer.genre}
              </p>
              <Link href={`/movie/${trailer.movieId}`} className="pointer-events-auto w-fit">
                <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 rounded-full">
                  Book Tickets Now
                </Button>
              </Link>
            </div>

            {/* Right Side Interaction Bar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center pointer-events-auto">
              <button className="group flex flex-col items-center gap-1 transition-transform active:scale-95">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-black/60">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-white drop-shadow-md">24.5k</span>
              </button>
              
              <button className="group flex flex-col items-center gap-1 transition-transform active:scale-95">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-black/60">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-white drop-shadow-md">1.2k</span>
              </button>
              
              <button className="group flex flex-col items-center gap-1 transition-transform active:scale-95">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-black/60">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-white drop-shadow-md">Share</span>
              </button>
              
              <Link href={`/movie/${trailer.movieId}`}>
                <button className="group flex flex-col items-center gap-1 transition-transform active:scale-95 mt-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg shadow-white/20">
                    <Info className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-xs font-medium text-white drop-shadow-md">Details</span>
                </button>
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
