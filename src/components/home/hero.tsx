"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Ticket } from "lucide-react";

interface HeroProps {
  backdropUrl?: string;
  title?: string;
  overview?: string;
}

export function Hero({ 
  backdropUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
  title = "Experience Cinema\nLike Never Before",
  overview = "Book tickets for the latest movies and events. Discover new experiences with our AI assistant and explore theatres in stunning 3D."
}: HeroProps) {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and subtle animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-all duration-1000" 
          style={{ backgroundImage: `url('${backdropUrl}')` }}
        />
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full animate-pulse-slow delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium tracking-wide uppercase text-white/80">Now Showing</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-balance whitespace-pre-line">
          {title.split('Like').map((t, i) => i === 1 ? <span key={i}>Like <span className="text-primary">Never Before</span></span> : t)}
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl text-balance line-clamp-3">
          {overview}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/#now-showing">
            <Button size="lg" className="gap-2 text-lg px-8 py-6 h-auto">
              <Ticket className="w-5 h-5" />
              Book Tickets
            </Button>
          </Link>
          <Link href="/trailers">
            <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6 h-auto border-white/20">
              <Play className="w-5 h-5" />
              Watch Trailers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
