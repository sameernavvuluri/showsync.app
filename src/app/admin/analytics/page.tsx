"use client";

import { TrendingUp, TrendingDown, DollarSign, Users, Ticket, Star } from "lucide-react";

export default function AdminAnalytics() {
  const weeklyRevenue = [45000, 62000, 58000, 71000, 84000, 79000, 92000];
  const maxRevenue = Math.max(...weeklyRevenue);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const kpis = [
    { label: "This Week Revenue", value: "₹4,91,000", change: "+18.4%", up: true, icon: DollarSign },
    { label: "New Users", value: "382", change: "+12.1%", up: true, icon: Users },
    { label: "Tickets Sold", value: "2,140", change: "+9.3%", up: true, icon: Ticket },
    { label: "Avg Rating", value: "4.6 / 5", change: "-0.1", up: false, icon: Star },
  ];

  const topMovies = [
    { title: "Interstellar", revenue: "₹1,45,000", tickets: 420, pct: 85 },
    { title: "Dune: Part Two", revenue: "₹1,12,000", tickets: 310, pct: 65 },
    { title: "The Batman", revenue: "₹78,000", tickets: 215, pct: 45 },
    { title: "Oppenheimer", revenue: "₹56,000", tickets: 140, pct: 30 },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-white/60">Platform performance overview for the last 7 days.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded ${
                  kpi.up ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                }`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-white/60 text-sm mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-3 glass p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-2">Weekly Revenue</h2>
          <p className="text-white/60 text-sm mb-6">Revenue generated over the past 7 days</p>
          
          <div className="flex items-end gap-3 h-48">
            {weeklyRevenue.map((val, i) => {
              const heightPct = (val / maxRevenue) * 100;
              const isToday = i === 6;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-white/40 font-mono">
                    {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                  </span>
                  <div className="w-full relative flex items-end" style={{ height: '140px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-white/10 hover:bg-white/20'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{days[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Movies Performance */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-2">Top Movies</h2>
          <p className="text-white/60 text-sm mb-6">By revenue this week</p>
          
          <div className="space-y-5">
            {topMovies.map((movie, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">{movie.title}</p>
                    <p className="text-xs text-white/40">{movie.tickets} tickets</p>
                  </div>
                  <span className="font-mono text-sm font-medium">{movie.revenue}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-700" 
                    style={{ width: `${movie.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
