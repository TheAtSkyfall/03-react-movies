import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
const originalPath = "https://image.tmdb.org/t/p/original";
function MovieModal({ movie, onClose }: MovieModalProps) {
  function handleOnBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handlePressEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handlePressEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handlePressEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleOnBackdrop}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`${originalPath}${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
export default MovieModal;
