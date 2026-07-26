import { Calendar, Clock, Star } from "lucide-react";
import { ReviewsSection } from "@/components/shared/reviews-section";
import { BookingSection } from "@/components/movie/booking-section";
import { TrailerButton } from "@/components/movie/trailer-button";
import { getMovieDetails, getMovieVideos, getImageUrl } from "@/lib/tmdb";

export default async function MovieDetails({ params }: { params: { id: string } }) {
  const movieId = params.id;
  const movie = await getMovieDetails(movieId);

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Movie not found</div>;
  }

  const durationStr = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  const genresStr = movie.genres?.map((g: any) => g.name).join(" • ") || "";

  // Fetch trailer key
  const videos = await getMovieVideos(movieId);
  const trailer = videos.find((v: any) => v.site === "YouTube" && v.type === "Trailer")
    || videos.find((v: any) => v.site === "YouTube");
  const trailerKey = trailer?.key || null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Movie Backdrop Header */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <img 
          src={getImageUrl(movie.backdrop_path)} 
          alt={movie.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
        />
        
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-end md:items-center pb-8 md:pb-0 pt-20 gap-8">
          <div className="hidden md:block w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-card">
            <img src={getImageUrl(movie.poster_path, 'w500')} alt={movie.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md text-xs font-medium">{movie.adult ? 'A' : 'U/A'}</span>
              <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md text-xs font-medium">{genresStr}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">{movie.title}</h1>
            <div className="flex items-center gap-6 text-white/80 mb-6 text-sm">
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {movie.vote_average?.toFixed(1)}/10</div>
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {durationStr}</div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.release_date}</div>
            </div>
            <p className="text-white/60 max-w-3xl mb-8 line-clamp-3 md:line-clamp-none">{movie.overview}</p>
            <div className="flex gap-4">
              <TrailerButton trailerKey={trailerKey} movieTitle={movie.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <BookingSection />

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10">
        <ReviewsSection />
      </div>
    </div>
  );
}
