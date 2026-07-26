"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Movies", href: "/" },
    { label: "Trailers", href: "/trailers" },
    { label: "Events", href: "/events" },
    { label: "Offers", href: "#" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.png" alt="ShowSync Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight">
            Show<span className="text-primary">Sync</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/40" />
          </div>
          <input
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-white/40"
            placeholder="Search movies, events, theatres..."
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              <Button variant="ghost" className={`text-sm ${pathname === link.href ? "text-white" : "text-white/60 hover:text-white"}`}>
                {link.label}
              </Button>
            </Link>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2" />
          <Link href="/login">
            <Button size="sm" className="gap-2">
              <User className="w-4 h-4" /> Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/80">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white">
                {link.label}
              </Button>
            </Link>
          ))}
          <Link href="/login" onClick={() => setMobileOpen(false)}>
            <Button className="w-full gap-2 mt-2">
              <User className="w-4 h-4" /> Sign In
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
