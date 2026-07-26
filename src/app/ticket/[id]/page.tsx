"use client";

import { Button } from "@/components/ui/button";
import { Download, Share2, CheckCircle2, Ticket as TicketIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TicketConfirmation() {
  const params = useParams();
  const ticketId = params.id as string;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
      
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-white/60">Your tickets have been sent to your email and SMS.</p>
      </div>

      {/* Ticket Card */}
      <div className="w-full max-w-md relative">
        <div className="absolute -left-4 top-1/2 -mt-4 w-8 h-8 bg-background rounded-full z-10" />
        <div className="absolute -right-4 top-1/2 -mt-4 w-8 h-8 bg-background rounded-full z-10" />
        
        <div className="glass rounded-2xl overflow-hidden flex flex-col border border-white/20">
          {/* Top Section */}
          <div className="p-6 border-b border-dashed border-white/20 relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Interstellar</h2>
                <p className="text-sm text-white/60">IMAX 3D • English</p>
              </div>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded text-sm font-medium">
                U/A
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Date</p>
                <p className="font-semibold">Today, 23 Jun</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Time</p>
                <p className="font-semibold">07:30 PM</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Theatre</p>
              <p className="font-semibold text-balance">PVR: Director's Cut, Ambience Mall</p>
              <p className="text-xs text-white/60 mt-1">Screen 4</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-6 flex flex-col items-center justify-center bg-white/5">
            <div className="w-full flex justify-between items-center mb-6">
              <div>
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Seats</p>
                <p className="text-xl font-bold text-primary">B-5, B-6</p>
                <p className="text-xs text-white/60">Platinum</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Booking ID</p>
                <p className="font-mono text-sm">{ticketId}</p>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="w-48 h-48 bg-white rounded-xl p-3 flex items-center justify-center">
              {/* This is a simple visual representation of a QR code using grid */}
              <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 opacity-90">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className={Math.random() > 0.4 ? "bg-black" : "bg-transparent"} />
                ))}
                {/* QR alignment boxes */}
                <div className="col-start-1 col-end-3 row-start-1 row-end-3 bg-black border-4 border-white outline outline-2 outline-black" />
                <div className="col-start-5 col-end-7 row-start-1 row-end-3 bg-black border-4 border-white outline outline-2 outline-black" />
                <div className="col-start-1 col-end-3 row-start-5 row-end-7 bg-black border-4 border-white outline outline-2 outline-black" />
              </div>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">Scan this QR code at the cinema entrance</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-md">
        <Button variant="outline" className="flex-1 gap-2">
          <Download className="w-4 h-4" /> Download
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>

      <Link href="/" className="mt-8 text-primary hover:underline font-medium flex items-center gap-2">
        <TicketIcon className="w-4 h-4" /> Browse more movies
      </Link>
    </div>
  );
}
