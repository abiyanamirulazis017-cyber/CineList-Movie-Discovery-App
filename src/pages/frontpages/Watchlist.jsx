import { useState } from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../utils/WatchlistContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState("");
  useDocumentTitle("Watchlist");

  const filteredWatchlist = watchlist.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Empty state ─────────────────────────────────
  if (watchlist.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Watchlist Kosong
        </h1>
        <p className="mb-4">Belum ada film di watchlistmu.</p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Jelajahi Film
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Watchlist ({watchlist.length})
        </h1>
        <button
          onClick={clearWatchlist}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm transition-colors"
        >
          Kosongkan
        </button>
      </div>

      {/* Search lokal */}
      <input
        type="text"
        placeholder="Cari di watchlist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      {/* Grid watchlist */}
      {filteredWatchlist.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Tidak ada film yang cocok dengan "{searchQuery}".
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-[fadeIn_0.6s_ease-out]">
          {filteredWatchlist.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm transition-colors"
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-20 h-30 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold mb-1 text-gray-900 dark:text-white line-clamp-2">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {movie.release_date?.slice(0, 4)}
                </p>
                <p className="text-yellow-600 dark:text-yellow-500 text-sm mb-3">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}