"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, Star, MapPin } from "lucide-react";

export default function AdminTheatres() {
  const theatres = [
    { id: "1", name: "PVR: Director's Cut", location: "Ambience Mall, Vasant Kunj", rating: 4.8, screens: 6, status: "Active" },
    { id: "2", name: "INOX: Laserplex", location: "Mall of India, Noida", rating: 4.6, screens: 8, status: "Active" },
    { id: "3", name: "Cinepolis VIP", location: "Grand Venice, Greater Noida", rating: 4.3, screens: 4, status: "Maintenance" },
    { id: "4", name: "SPI Cinemas", location: "Phoenix Mall, Chennai", rating: 4.5, screens: 5, status: "Active" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Theatres</h1>
          <p className="text-white/60">Add or modify theatres and their screen configurations.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Theatre
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Theatres", value: "14" },
          { label: "Total Screens", value: "86" },
          { label: "Cities", value: "12" },
          { label: "Avg Rating", value: "4.5 ★" },
        ].map((stat, i) => (
          <div key={i} className="glass p-4 rounded-xl border border-white/10 text-center">
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-white/60 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 justify-between items-center bg-black/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input className="pl-9 bg-black/40 border-white/10" placeholder="Search theatres..." />
          </div>
          <Button variant="outline" size="sm" className="shrink-0">Filter by City</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/40 uppercase bg-black/40">
              <tr>
                <th className="px-6 py-4">Theatre</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Screens</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {theatres.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold">{t.name}</td>
                  <td className="px-6 py-4 text-white/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> {t.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {t.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4">{t.screens}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      t.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
