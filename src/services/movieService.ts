import axios from "axios";
import type { Movie } from "../types/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<MoviesResponse> {
  const { data } = await movieApi.get<MoviesResponse>("/search/movie", {
    params: { query },
  });

  return data;
}
