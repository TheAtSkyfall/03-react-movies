import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
function App() {
  const [query, setQuery] = useState("");
  const [dataMovie, setDataMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  useEffect(() => {
    if (!query) return;
    async function getMovie() {
      setIsLoading(true);
      setIsError(false);
      setDataMovie([]);

      try {
        const { results } = await fetchMovies(query);

        if (results.length === 0) {
          toast.error("No movies found for your request.");
          return;
        }

        setDataMovie(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [query]);
  function handleSubmit(value: string): void {
    setQuery(value);
  }
  function handleSelect(movie: Movie): void {
    setSelectedMovie(movie);
  }
  function handleClose(): void {
    setSelectedMovie(null);
  }
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && dataMovie.length > 0 && (
        <MovieGrid movies={dataMovie} onSelect={handleSelect} />
      )}
      {selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </>
  );
}
export default App;
