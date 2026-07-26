"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock seat layout data
const SEAT_ROWS = [
  { id: 'A', type: 'Recliner', price: 500, seats: 12 },
  { id: 'B', type: 'Platinum', price: 350, seats: 16 },
  { id: 'C', type: 'Platinum', price: 350, seats: 16 },
  { id: 'D', type: 'Platinum', price: 350, seats: 16 },
  { id: 'E', type: 'Gold', price: 250, seats: 18 },
  { id: 'F', type: 'Gold', price: 250, seats: 18 },
  { id: 'G', type: 'Gold', price: 250, seats: 18 },
  { id: 'H', type: 'Silver', price: 150, seats: 20 },
  { id: 'I', type: 'Silver', price: 150, seats: 20 },
];

// Randomly generate some booked seats for demo
const MOCK_BOOKED = ['B-5', 'B-6', 'D-12', 'E-8', 'E-9', 'E-10', 'H-1', 'H-2'];

import { SeatViewModal } from "@/components/booking/seat-view-modal";

export default function SeatSelection() {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const toggleSeat = (seatId: string) => {
    if (MOCK_BOOKED.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const rowId = seatId.split('-')[0];
    const row = SEAT_ROWS.find(r => r.id === rowId);
    return total + (row?.price || 0);
  }, 0);

  const getSeatColor = (seatId: string, type: string) => {
    if (MOCK_BOOKED.includes(seatId)) return 'bg-white/10 cursor-not-allowed border-transparent text-transparent';
    if (selectedSeats.includes(seatId)) return 'bg-primary border-primary text-white shadow-lg shadow-primary/40';
    
    switch(type) {
      case 'Recliner': return 'border-yellow-500/50 hover:bg-yellow-500/20 text-white/80';
      case 'Platinum': return 'border-purple-500/50 hover:bg-purple-500/20 text-white/80';
      case 'Gold': return 'border-orange-500/50 hover:bg-orange-500/20 text-white/80';
      default: return 'border-white/20 hover:bg-white/10 text-white/80';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold">Interstellar: The IMAX Experience</h1>
              <p className="text-xs text-white/60">PVR: Director's Cut • Today, 07:30 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-sm mr-4">
              <span className="flex items-center gap-2"><div className="w-4 h-4 border border-white/20 rounded" /> Available</span>
              <span className="flex items-center gap-2"><div className="w-4 h-4 bg-primary rounded" /> Selected</span>
              <span className="flex items-center gap-2"><div className="w-4 h-4 bg-white/10 rounded" /> Booked</span>
            </div>
            {selectedSeats.length > 0 && (
              <Button 
                variant="default" 
                size="sm" 
                className="gap-2 bg-primary/20 text-primary hover:bg-primary hover:text-white"
                onClick={() => setIsViewModalOpen(true)}
              >
                <Eye className="w-4 h-4" />
                View from Seat
              </Button>
            )}
            <Link href="/theatre/3d">
              <Button variant="outline" size="sm" className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-white">
                <Monitor className="w-4 h-4" />
                3D Preview
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Seat Map */}
      <main className="flex-1 overflow-x-auto p-4 md:p-8">
        <div className="min-w-[800px] max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Screen */}
          <div className="w-full flex flex-col items-center mb-16">
            <Monitor className="w-8 h-8 text-white/20 mb-2" />
            <div className="w-3/4 h-2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
            <p className="text-xs text-white/40 mt-4 tracking-[0.5em] uppercase">All eyes this way</p>
          </div>

          {/* Seats */}
          <div className="space-y-6 w-full pb-32">
            {SEAT_ROWS.map((row) => (
              <div key={row.id} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
                {/* Row Label Left */}
                <div className="w-8 font-mono text-white/40 text-sm hidden sm:block">{row.id}</div>
                
                {/* Seats Container */}
                <div className="flex-1 flex justify-center gap-2">
                  {Array.from({ length: row.seats }).map((_, idx) => {
                    const seatNumber = idx + 1;
                    const seatId = `${row.id}-${seatNumber}`;
                    // Add an aisle in the middle
                    const isAisle = seatNumber === Math.floor(row.seats / 2);
                    
                    return (
                      <div key={seatId} className={`flex gap-2 ${isAisle ? 'mr-8' : ''}`}>
                        <button
                          onClick={() => toggleSeat(seatId)}
                          disabled={MOCK_BOOKED.includes(seatId)}
                          className={`w-8 h-8 rounded-t-lg rounded-b-sm border flex items-center justify-center text-[10px] font-medium transition-all ${getSeatColor(seatId, row.type)}`}
                        >
                          {selectedSeats.includes(seatId) ? seatNumber : ''}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Row Label Right & Price */}
                <div className="w-24 text-right flex flex-col hidden sm:flex">
                  <span className="text-xs text-white/40">{row.type}</span>
                  <span className="text-sm font-semibold">₹{row.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Checkout Footer */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 p-4 animate-in slide-in-from-bottom-full z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 mb-1">{selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''} Selected</p>
              <p className="font-mono text-sm">{selectedSeats.join(', ')}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white/60">Total Amount</p>
                <p className="text-2xl font-bold">₹{totalPrice}</p>
              </div>
              <Button size="lg" className="px-8 shadow-lg shadow-primary/25" onClick={() => router.push(`/book/1/snacks`)}>
                Book ₹{totalPrice}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Seat View Modal */}
      <SeatViewModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        seatId={selectedSeats[selectedSeats.length - 1]} 
      />
    </div>
  );
}
