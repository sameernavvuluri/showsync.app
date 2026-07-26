import Link from "next/link";
import { Film, MessageCircle, Camera, PlayCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="ShowSync Logo" className="w-9 h-9 object-contain" />
              <span className="text-xl font-bold">Show<span className="text-primary">Sync</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              India's first AI-powered movie and events booking platform. Experience cinema like never before.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <PlayCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Movies */}
          <div>
            <h3 className="font-semibold mb-5 text-white">Movies</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {["Now Showing", "Upcoming", "Top Rated", "By Genre", "Regional Films"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-semibold mb-5 text-white">Events</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {["Concerts", "Stand-up Comedy", "Sports", "Workshops", "Festivals"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-5 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {["Help Centre", "Cancellation Policy", "Gift Cards", "Corporate Bookings", "Partner with Us"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mt-6 text-sm text-white/60 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@showsync.in">support@showsync.in</a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 ShowSync Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
