import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Clock, Flame, TrendingUp, Calendar, MapPin } from "lucide-react";

import { getNowPlayingMovies, getUpcomingMovies, getImageUrl } from "@/lib/tmdb";

const EVENTS = [
  {
    id: "1", title: "Arijit Singh Live",
    venue: "DY Patil Stadium, Mumbai", date: "Sat, 28 Jun", price: "₹1,499",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop",
    category: "Concert",
  },
  {
    id: "2", title: "Kenny Sebastian Stand-up",
    venue: "NCPA, Mumbai", date: "Sun, 29 Jun", price: "₹899",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=600&auto=format&fit=crop",
    category: "Comedy",
  },
  {
    id: "3", title: "IPL Final 2026",
    venue: "Wankhede Stadium", date: "Mon, 30 Jun", price: "₹2,999",
    image: "https://images.unsplash.com/photo-1540747913346-19212a4b423d?q=80&w=600&auto=format&fit=crop",
    category: "Sports",
  },
];

export default async function Home() {
  const nowPlaying = await getNowPlayingMovies();
  const upcoming = await getUpcomingMovies();

  // Use the most popular "Now Playing" movie as the Hero background
  const topMovie = nowPlaying[0];
  const heroProps = topMovie ? {
    backdropUrl: getImageUrl(topMovie.backdrop_path),
    title: topMovie.title + "\nLike Never Before",
    overview: topMovie.overview,
  } : {};

  return (
    <main className="min-h-screen bg-background">
      <Hero {...heroProps} />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-24">

        {/* ── Now Showing ── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Now Showing</h2>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {nowPlaying.map((movie: any) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="min-w-[220px] md:min-w-[240px] snap-start group">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/10 shadow-xl">
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-yellow-400 text-xs mb-1">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                  {/* Book Now on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg shadow-primary/30">
                      Book Now
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base truncate mb-0.5">{movie.title}</h3>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <span>Release: {new Date(movie.release_date).getFullYear()}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Premium Experience Banner ── */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-900/20 to-blue-900/20" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full" />
          <div className="relative z-10">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Premium Experience</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              Cinema in a New Dimension
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              Preview your exact seat in interactive 3D before booking. Know exactly what you'll see before you sit.
            </p>
            <Link href="/theatre/3d">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/30">
                Try 3D Theatre Preview
              </Button>
            </Link>
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Coming Soon</h2>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {upcoming.map((movie: any) => (
              <div key={movie.id} className="min-w-[220px] md:min-w-[240px] snap-start group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/10">
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {movie.release_date}
                  </div>
                </div>
                <h3 className="font-bold text-base truncate mb-0.5">{movie.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ── Events Section ── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Events Near You</h2>
            </div>
            <Link href="/events">
              <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1">
                See All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map((event) => (
              <Link key={event.id} href="/events">
                <div className="glass rounded-2xl overflow-hidden group border border-white/10 hover:border-white/20 transition-all hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.category}
                    </div>
                    <div className="absolute bottom-3 right-3 font-bold text-white">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
