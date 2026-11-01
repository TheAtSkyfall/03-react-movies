import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((item) => {
        return (
          <li key={item.id}>
            <div className={css.card} onClick={() => onSelect(item)}>
              <img
                className={css.image}
                src={`${imageBaseUrl}${item.poster_path}`}
                alt={item.title}
                loading="lazy"
              />
              <h2 className={css.title}>{item.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
export default MovieGrid;
