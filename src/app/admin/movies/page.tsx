"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminMovies() {
  const movies = [
    { id: 1, title: "Interstellar", status: "Now Showing", rating: "8.6", duration: "2h 49m" },
    { id: 2, title: "Dune: Part Two", status: "Now Showing", rating: "8.8", duration: "2h 46m" },
    { id: 3, title: "The Batman", status: "Upcoming", rating: "7.9", duration: "2h 56m" },
    { id: 4, title: "Oppenheimer", status: "Archived", rating: "8.4", duration: "3h" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Movies</h1>
          <p className="text-white/60">Add, edit, or remove movies from the platform.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Movie
        </Button>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input className="pl-9 bg-black/40 border-white/10" placeholder="Search movies..." />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Filter</Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/40 uppercase bg-black/40">
              <tr>
                <th className="px-6 py-4">Movie Title</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold">{movie.title}</td>
                  <td className="px-6 py-4">{movie.duration}</td>
                  <td className="px-6 py-4">{movie.rating}/10</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      movie.status === 'Now Showing' ? 'bg-green-500/20 text-green-400' :
                      movie.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {movie.status}
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
