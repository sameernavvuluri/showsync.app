export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Theatre {
  id: string;
  name: string;
  location: string;
  distance?: number;
  image_url?: string;
}

export interface Show {
  id: string;
  movie_id: string;
  theatre_id: string;
  show_time: string;
  price: number;
  screen_id: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
