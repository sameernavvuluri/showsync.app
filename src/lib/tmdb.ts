import "server-only";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getImageUrl = (path: string | null, size: string = 'original') => {
  if (!path) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Fallback data used when the TMDB API is unreachable
const FALLBACK_MOVIES = [
  {
    id: 1184918, title: "The Wild Robot",
    overview: "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.",
    poster_path: null, backdrop_path: null,
    vote_average: 8.5, release_date: "2024-09-27",
    runtime: 102, adult: false,
    genres: [{ id: 16, name: "Animation" }, { id: 878, name: "Science Fiction" }, { id: 10751, name: "Family" }],
  },
  {
    id: 693134, title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: null, backdrop_path: null,
    vote_average: 8.8, release_date: "2024-02-27",
    runtime: 166, adult: false,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }],
  },
  {
    id: 823464, title: "Godzilla x Kong: The New Empire",
    overview: "Following their fruit battle with Mechagodzilla, Godzilla and Kong are ready for a new chapter as the two mighty creatures face a colossal undiscovered threat hidden within our world.",
    poster_path: null, backdrop_path: null,
    vote_average: 7.1, release_date: "2024-03-27",
    runtime: 115, adult: false,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }],
  },
  {
    id: 786892, title: "Furiosa: A Mad Max Saga",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.",
    poster_path: null, backdrop_path: null,
    vote_average: 7.6, release_date: "2024-05-22",
    runtime: 148, adult: false,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Science Fiction" }],
  },
  {
    id: 653346, title: "Kingdom of the Planet of the Apes",
    overview: "Several generations in the future after Caesar's reign, apes are the dominant species and live harmoniously while humans have been reduced to living in the shadows.",
    poster_path: null, backdrop_path: null,
    vote_average: 7.1, release_date: "2024-05-08",
    runtime: 145, adult: false,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }, { id: 28, name: "Action" }],
  },
];

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
  try {
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY || '',
      ...params,
    });

    const res = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`TMDB API error [${res.status}]: ${endpoint}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`TMDB fetch failed for ${endpoint}:`, error);
    return null;
  }
}

export async function getNowPlayingMovies() {
  const data = await fetchTMDB('/movie/now_playing', { region: 'IN', page: '1' });
  return data?.results || FALLBACK_MOVIES;
}

export async function getUpcomingMovies() {
  const data = await fetchTMDB('/movie/upcoming', { region: 'IN', page: '1' });
  return data?.results || FALLBACK_MOVIES.slice(2);
}

export async function getMovieDetails(id: string) {
  const data = await fetchTMDB(`/movie/${id}`);
  // If the API call failed, try to find the movie in fallback data
  if (!data) {
    return FALLBACK_MOVIES.find(m => String(m.id) === id) || FALLBACK_MOVIES[0];
  }
  return data;
}

export async function getMovieVideos(id: string) {
  const data = await fetchTMDB(`/movie/${id}/videos`);
  return data?.results || [];
}

export async function getPopularMovies() {
  const data = await fetchTMDB('/movie/popular', { page: '1' });
  return data?.results || FALLBACK_MOVIES;
}
