import { getPopularMovies, getMovieVideos } from "@/lib/tmdb";
import { TrailersClient } from "@/components/trailers/trailers-client";

export default async function TrailersPage() {
  const popularMovies = await getPopularMovies();
  
  // We'll take the top 10 movies and fetch their trailers
  const moviesWithTrailers = await Promise.all(
    popularMovies.slice(0, 10).map(async (movie: any) => {
      const videos = await getMovieVideos(movie.id);
      // Find a YouTube trailer
      const trailer = videos.find((v: any) => v.site === "YouTube" && v.type === "Trailer");
      
      if (trailer) {
        return {
          id: String(movie.id),
          movieId: String(movie.id),
          title: movie.title,
          genre: "Trending Now", // We can map actual genres if needed
          videoKey: trailer.key,
        };
      }
      return null;
    })
  );

  // Filter out movies that didn't have a trailer
  const trailers = moviesWithTrailers.filter((t) => t !== null) as any[];

  return <TrailersClient trailers={trailers} />;
}
