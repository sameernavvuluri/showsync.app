"use client";

import { useState } from "react";
import { User, Ticket, Heart, Settings, LogOut, Star, Clock, Film, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TABS = [
  { id: "bookings", label: "My Bookings", icon: Ticket },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const BOOKINGS = [
  {
    id: "BK-001", movie: "Interstellar", date: "Sat, 21 Jun 2026", time: "7:30 PM",
    theatre: "PVR: Director's Cut, Ambience Mall", seats: "B-5, B-6", amount: 1175,
    status: "confirmed", poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "BK-002", movie: "Dune: Part Two", date: "Sun, 15 Jun 2026", time: "3:00 PM",
    theatre: "INOX: Laserplex, Noida", seats: "F-10", amount: 499,
    status: "confirmed", poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "BK-003", movie: "Oppenheimer", date: "Fri, 6 Jun 2026", time: "6:00 PM",
    theatre: "Cinepolis, Phoenix Mall", seats: "D-3, D-4, D-5", amount: 1350,
    status: "cancelled", poster: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=200&auto=format&fit=crop",
  },
];

const WISHLIST = [
  { id: "6", title: "Mission Impossible 8", genre: "Action", releaseDate: "Aug 2026", image: "https://images.unsplash.com/photo-1474920787803-27c0b2148fbc?q=80&w=300&auto=format&fit=crop" },
  { id: "7", title: "Kalki 2898 AD", genre: "Sci-Fi", releaseDate: "Sep 2026", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=300&auto=format&fit=crop" },
  { id: "8", title: "Pushpa 3", genre: "Action", releaseDate: "Dec 2026", image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=300&auto=format&fit=crop" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [name, setName] = useState("Rahul Sharma");
  const [email] = useState("rahul@showsync.in");

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-48 bg-gradient-to-br from-primary/30 via-purple-900/20 to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20 -mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-xl ring-4 ring-background shrink-0">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-white/60">{email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-white/50">
              <span className="flex items-center gap-1"><Film className="w-3.5 h-3.5" /> 3 Movies Watched</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400" /> Premium Member</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === id ? "border-primary text-white" : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {BOOKINGS.map((b) => (
              <div key={b.id} className="glass rounded-2xl overflow-hidden border border-white/10 flex flex-col sm:flex-row">
                <div className="sm:w-28 h-36 sm:h-auto shrink-0 overflow-hidden">
                  <img src={b.poster} alt={b.movie} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{b.movie}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        b.status === "confirmed" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>{b.status}</span>
                    </div>
                    <p className="text-white/60 text-sm flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" /> {b.date} at {b.time}
                    </p>
                    <p className="text-white/60 text-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {b.theatre}
                    </p>
                    <p className="text-white/80 text-sm mt-2 font-medium">Seats: {b.seats}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <p className="text-2xl font-bold font-mono">&#8377;{b.amount}</p>
                    <div className="flex gap-2 flex-wrap justify-end">
                      <Button size="sm" variant="outline">View Ticket</Button>
                      {b.status === "confirmed" && (
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400/30 hover:bg-red-500/10">Cancel</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {WISHLIST.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/10">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs text-white/80 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {movie.releaseDate}
                  </div>
                </div>
                <h3 className="font-bold truncate">{movie.title}</h3>
                <p className="text-white/50 text-xs">{movie.genre}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-lg space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-5">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Email</label>
                  <Input value={email} disabled className="opacity-60" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Phone Number</label>
                  <Input placeholder="+91 98765 43210" />
                </div>
                <Button className="w-full">Save Changes</Button>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-5">Preferences</h3>
              <div className="space-y-4 text-sm">
                {[
                  { label: "Email Notifications", desc: "Booking confirmations and updates" },
                  { label: "SMS Alerts", desc: "OTP and ticket updates" },
                  { label: "AI Recommendations", desc: "Personalized movie suggestions" },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{pref.label}</p>
                      <p className="text-white/50 text-xs">{pref.desc}</p>
                    </div>
                    <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full text-red-400 border-red-400/30 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out of Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
