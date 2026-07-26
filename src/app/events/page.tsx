"use client";

import { useState } from "react";
import { Calendar, MapPin, Music, Mic2, Trophy, BookOpen, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { label: "All", icon: Sparkles },
  { label: "Concerts", icon: Music },
  { label: "Comedy", icon: Mic2 },
  { label: "Sports", icon: Trophy },
  { label: "Workshops", icon: BookOpen },
];

const EVENTS = [
  {
    id: "1", title: "Arijit Singh Live", category: "Concerts",
    venue: "DY Patil Stadium, Mumbai", date: "Sat, 28 Jun", time: "7:00 PM",
    price: "₹1,499", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    badge: "Selling Fast"
  },
  {
    id: "2", title: "Kenny Sebastian Stand-up", category: "Comedy",
    venue: "NCPA, Mumbai", date: "Sun, 29 Jun", time: "8:00 PM",
    price: "₹899", image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
    badge: ""
  },
  {
    id: "3", title: "IPL Final 2026", category: "Sports",
    venue: "Wankhede Stadium, Mumbai", date: "Mon, 30 Jun", time: "7:30 PM",
    price: "₹2,999", image: "https://images.unsplash.com/photo-1540747913346-19212a4b423d?q=80&w=2062&auto=format&fit=crop",
    badge: "Hot 🔥"
  },
  {
    id: "4", title: "Photography Masterclass", category: "Workshops",
    venue: "The Habitat, Mumbai", date: "Tue, 1 Jul", time: "10:00 AM",
    price: "₹499", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
    badge: ""
  },
  {
    id: "5", title: "Sunburn Arena Festival", category: "Concerts",
    venue: "MMRDA Ground, BKC", date: "Wed, 2 Jul", time: "4:00 PM",
    price: "₹3,499", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    badge: "New"
  },
  {
    id: "6", title: "AI & Startup Summit", category: "Workshops",
    venue: "Bombay Exhibition Centre", date: "Thu, 3 Jul", time: "9:00 AM",
    price: "₹1,199", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    badge: ""
  },
];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? EVENTS
    : EVENTS.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative py-24 flex flex-col items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute -left-1/4 top-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4 relative z-10">
          Events Near <span className="text-primary">You</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl relative z-10">
          Concerts, comedy nights, sports events and more — all in one place.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-10">
          <Filter className="w-5 h-5 text-white/40 shrink-0" />
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === label
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <div key={event.id} className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 border border-white/10 transition-all hover:shadow-2xl hover:shadow-primary/5">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {event.badge && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {event.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-white/90">
                  <span>{event.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 line-clamp-1">{event.title}</h3>
                <div className="space-y-1.5 text-sm text-white/60 mb-4">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0 text-primary/70" />{event.venue}</p>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 shrink-0 text-primary/70" />{event.date} • {event.time}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/40">Starting from</p>
                    <p className="text-xl font-bold">{event.price}</p>
                  </div>
                  <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
