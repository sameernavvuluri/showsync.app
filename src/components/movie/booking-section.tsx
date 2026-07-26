"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const theatres = [
  { id: "1", name: "PVR: Director's Cut, Ambience", distance: "2.4 km", shows: ["10:00 AM", "01:30 PM", "05:15 PM", "09:00 PM"] },
  { id: "2", name: "INOX: Laserplex, Mall of India", distance: "5.1 km", shows: ["11:15 AM", "02:45 PM", "07:30 PM", "10:45 PM"] },
  { id: "3", name: "Cinepolis: VIP, Grand Venice", distance: "8.7 km", shows: ["12:00 PM", "04:00 PM", "08:15 PM"] },
];

const dates = ["Today, 23 Jun", "Tomorrow, 24 Jun", "Wed, 25 Jun", "Thu, 26 Jun", "Fri, 27 Jun"];

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
      
      {/* Date Selector */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
        {dates.map((date, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDate(idx)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl border transition-all ${
              selectedDate === idx 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-card border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            <div className="text-xs uppercase font-medium mb-1">{date.split(', ')[0]}</div>
            <div className="font-bold text-lg">{date.split(', ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Theatres List */}
      <div className="space-y-6">
        {theatres.map((theatre) => (
          <div key={theatre.id} className="glass p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <Link href={`/theatre/${theatre.id}`}>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                    {theatre.name}
                  </h3>
                </Link>
                <p className="text-white/60 text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {theatre.distance} • Parking Available • Food Court
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                M-Ticket
              </div>
            </div>

            {/* Show Timings */}
            <div className="flex flex-wrap gap-3">
              {theatre.shows.map((time, idx) => (
                <Link href={`/book/${theatre.id}-${idx}`} key={idx}>
                  <Button variant="outline" className="border-white/20 hover:border-primary hover:text-primary transition-all">
                    {time}
                    <span className="text-xs text-white/40 block w-full text-center mt-1 font-normal">ENG • 3D</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
