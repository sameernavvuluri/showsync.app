"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Film, 
  MapPin, 
  CalendarDays, 
  Users, 
  Settings,
  Coffee,
  PieChart
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Movies", href: "/admin/movies", icon: Film },
  { name: "Theatres", href: "/admin/theatres", icon: MapPin },
  { name: "Shows & Events", href: "/admin/events", icon: CalendarDays },
  { name: "Snacks Menu", href: "/admin/snacks", icon: Coffee },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: PieChart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex pt-16">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 hidden md:block glass fixed h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-6">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
            Admin Panel
          </div>
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
