"use client";

import { X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeatViewModalProps {
  seatId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SeatViewModal({ seatId, isOpen, onClose }: SeatViewModalProps) {
  if (!isOpen || !seatId) return null;

  const row = seatId.split("-")[0];
  
  // Determine mock image based on row to simulate different distances from screen
  let imageUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"; // Default Middle
  let viewName = "Middle View";

  if (["A", "B"].includes(row)) {
    imageUrl = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop"; // Closer/Front view
    viewName = "Front Row View";
  } else if (["C", "D", "E"].includes(row)) {
    imageUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"; // Middle view
    viewName = "Optimal Middle View";
  } else {
    imageUrl = "https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2070&auto=format&fit=crop"; // Back view
    viewName = "Balcony / Back View";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-medium text-white">
            <Eye className="w-3.5 h-3.5" /> {viewName} (Seat {seatId})
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="bg-black/50 backdrop-blur-md hover:bg-black/80 rounded-full text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="relative w-full aspect-video overflow-hidden">
          {/* We simulate a wide panoramic view with object-cover and a slight scale/pan animation */}
          <img 
            src={imageUrl} 
            alt="View from Seat" 
            className="w-full h-full object-cover animate-[pan_20s_ease-in-out_infinite_alternate]"
            style={{ transform: "scale(1.15)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 pointer-events-none">
            <h3 className="text-xl font-bold text-white shadow-black drop-shadow-md">Seat {seatId}</h3>
            <p className="text-sm text-white/80 shadow-black drop-shadow-md">Simulated 360° panoramic view from this row.</p>
          </div>
        </div>
      </div>
      
      {/* Add keyframes for the simulated panoramic pan */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pan {
          0% { object-position: 0% 50%; }
          100% { object-position: 100% 50%; }
        }
      `}} />
    </div>
  );
}
