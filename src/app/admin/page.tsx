"use client";

import { Ticket, Users, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹2,45,000", increase: "+14%", icon: DollarSign },
    { label: "Tickets Sold", value: "1,240", increase: "+8%", icon: Ticket },
    { label: "Active Users", value: "842", increase: "+12%", icon: Users },
    { label: "Conversion Rate", value: "3.2%", increase: "+1%", icon: TrendingUp },
  ];

  const recentBookings = [
    { id: "BK-1204", user: "Rahul Sharma", movie: "Interstellar", date: "23 Jun 2026", amount: "₹1,450", status: "Confirmed" },
    { id: "BK-1203", user: "Priya Mehta", movie: "The Batman", date: "23 Jun 2026", amount: "₹850", status: "Confirmed" },
    { id: "BK-1202", user: "Amit Kumar", movie: "Dune: Part Two", date: "22 Jun 2026", amount: "₹2,100", status: "Cancelled" },
    { id: "BK-1201", user: "Sneha Patel", movie: "Interstellar", date: "22 Jun 2026", amount: "₹1,150", status: "Confirmed" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-white/60">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <Button>Download Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  {stat.increase}
                </span>
              </div>
              <p className="text-white/60 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 glass rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white/40 uppercase bg-black/20">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Movie</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono">{booking.id}</td>
                    <td className="px-6 py-4">{booking.user}</td>
                    <td className="px-6 py-4">{booking.movie}</td>
                    <td className="px-6 py-4 font-mono">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/20'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Movies */}
        <div className="glass rounded-2xl border border-white/10">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Trending Movies</h2>
          </div>
          <div className="p-6 space-y-6">
            {[
              { title: "Interstellar", bookings: 450, trend: "+12%" },
              { title: "Dune: Part Two", bookings: 380, trend: "+5%" },
              { title: "The Batman", bookings: 290, trend: "-2%" },
            ].map((movie, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{movie.title}</h3>
                    <p className="text-xs text-white/60">{movie.bookings} bookings</p>
                  </div>
                </div>
                <span className={`text-sm ${movie.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {movie.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
