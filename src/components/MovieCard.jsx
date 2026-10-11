import { Link } from "react-router-dom";
import { useWatchlist } from "../utils/WatchlistContext";
import { useState } from "react";
import { getRatingColor, formatRating } from "../utils/ratingUtils";

export default function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleToggle = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000); // Sembunyikan feedback setelah 2 detik
    }
  };

  const newLocal = <Link
    to={`/movie/${movie.slug}`}
    state={{ movie, movieId: movie.id }}
    className="text-blue-600 dark:text-blue-400 hover:underline font-medium mb-2"
  >
    Lihat Detail →
  </Link>;
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-xl bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 hover:-translate-y-1 group">
      <div className="overflow-hidden">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full aspect-video sm:aspect-2/3 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-base sm:text-lg line-clamp-1 text-gray-900 dark:text-white">{movie.title}</h2>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5">
          {movie.release_date?.slice(0, 4) || "—"}
          {movie.genre_names?.[0] && ` • ${movie.genre_names[0]}`}
        </p>

        <div className="mb-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs sm:text-sm font-semibold ${getRatingColor(
              movie.vote_average
            )}`}
          >
            ⭐ {formatRating(movie.vote_average)}
          </span>
          <span className="text-xs text-gray-400 ml-1">/ 10</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 flex-1 line-clamp-2 sm:line-clamp-3">
          {movie.overview}
        </p>

        {newLocal}

        <button
          onClick={handleToggle}
          className={`w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 ${
            inList
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md"
          }`}
        >
          {inList ? "✓ Sudah di Watchlist" : "+ Tambah ke Watchlist"}
        </button>

        {showFeedback && (
          <div className="mt-2 text-green-600 text-sm font-medium animate-[fadeOut_2s_ease-in]">
            Film berhasil ditambahkan ke watchlist!
          </div>
        )}
      </div>
    </div>
  );
}