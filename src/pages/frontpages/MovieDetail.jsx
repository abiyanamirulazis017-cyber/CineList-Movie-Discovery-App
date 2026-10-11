import { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useWatchlist } from "../../utils/WatchlistContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import {
  getRatingColor,
  formatRating,
  getStarArray,
  toStars,
} from "../../utils/ratingUtils";

export default function MovieDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Ambil movie dari state + movieId
  const movie = location.state?.movie;
  const movieId = location.state?.movieId || movie?.id;

  // Fetch detail lengkap
  const { details, loading: loadingDetail } = useMovieDetail(movieId);

  useDocumentTitle(movie?.title || "Film Detail");

  // State review
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;

    setReviews([...reviews, { id: Date.now(), rating, review }]);
    setRating(0);
    setReview("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // ─── Film tidak ditemukan ─────────────────────────
  if (!movie) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Film Tidak Ditemukan
        </h1>
        <p className="text-gray-500 mb-4">
          Silakan buka film dari halaman Discover.
        </p>
        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Kembali ke Discover
        </Link>
      </div>
    );
  }

  const inList = isInWatchlist(movie.id);

  // Helper: format runtime (mis. 139 → "2h 19m")
  const formatRuntime = (mins) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // Helper: format uang (mis. 63000000 → "$63,000,000")
  const formatMoney = (amount) => {
    if (!amount || amount === 0) return null;
    return `$${amount.toLocaleString("en-US")}`;
  };

  return (
    <div className="p-2">
      {/* ═══ TOMBOL KEMBALI ═══ */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 hover:shadow-sm hover:-translate-x-0.5 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>

      {/* ═══ WRAPPER FLEX — 2 KOLOM SAMA TINGGI ═══ */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ─── KOLOM KIRI ─── */}
        <section className="flex-3 space-y-6 w-full min-w-0">
          {/* Kartu film */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800 flex flex-col md:flex-row gap-6">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full md:w-64 rounded-lg shadow"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{movie.title}</h1>

              {/* Tagline (kalau ada) */}
              {details?.tagline && (
                <p className="text-sm text-gray-500 italic mt-1">
                  "{details.tagline}"
                </p>
              )}

              {/* Tahun • Genre • Runtime */}
              <p className="text-sm text-gray-500 mt-2">
                {movie.release_date?.slice(0, 4)} •{" "}
                {movie.genre_names?.join(", ") || "—"}
                {details?.runtime && ` • ${formatRuntime(details.runtime)}`}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-semibold ${getRatingColor(
                    movie.vote_average
                  )}`}
                >
                  ⭐ {formatRating(movie.vote_average)} / 10
                </span>
                <div className="flex items-center gap-0.5">
                  {getStarArray(movie.vote_average).map((type, i) => (
                    <span
                      key={i}
                      className={
                        type === "full" ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Sinopsis */}
              <p className="text-gray-700 dark:text-gray-300 mt-3">{movie.overview}</p>

              {/* Budget & Revenue (kalau ada) */}
              {(formatMoney(details?.budget) ||
                formatMoney(details?.revenue)) && (
                <div className="flex gap-4 mt-3 text-sm">
                  {formatMoney(details?.budget) && (
                    <div>
                      <span className="text-gray-500">Budget:</span>{" "}
                      <span className="font-medium dark:text-gray-200">
                        {formatMoney(details.budget)}
                      </span>
                    </div>
                  )}
                  {formatMoney(details?.revenue) && (
                    <div>
                      <span className="text-gray-500">Revenue:</span>{" "}
                      <span className="font-medium dark:text-gray-200">
                        {formatMoney(details.revenue)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Production Companies */}
              {details?.productionCompanies?.length > 0 && (
                <p className="text-xs text-gray-500 mt-3">
                  Produksi:{" "}
                  {details.productionCompanies
                    .slice(0, 3)
                    .map((c) => c.name)
                    .join(", ")}
                </p>
              )}

              {/* Tombol: Watchlist + Trailer */}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() =>
                    inList
                      ? removeFromWatchlist(movie.id)
                      : addToWatchlist(movie)
                  }
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    inList
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {inList ? "✓ Hapus dari Watchlist" : "+ Tambah ke Watchlist"}
                </button>

                {/* Trailer — hanya muncul kalau ada */}
                {details?.trailerKey && (
                  <a
                    href={`https://www.youtube.com/watch?v=${details.trailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    ▶ Tonton Trailer
                  </a>
                )}

                {/* Loading state untuk detail */}
                {loadingDetail && (
                  <span className="inline-flex items-center text-sm text-gray-500 px-3 py-3">
                    Memuat detail...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Daftar review */}
          <div>
            <h2 className="text-xl font-semibold mb-3 dark:text-gray-200">User Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Belum ada review.</p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((r) => (
                  <li key={r.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < r.rating ? "text-yellow-500" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {r.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{r.review}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ─── KOLOM KANAN: Form Review ─── */}
        <section className="w-full lg:w-80 xl:w-96 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tulis Review</h2>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                Rating:{" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">{rating}/5</span>
              </label>
              <div className="flex flex-wrap gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    } hover:scale-125 transition-transform`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 flex-1">
              <label className="block text-lg font-medium mb-2 text-gray-900 dark:text-white">
                Review:
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows="4"
                placeholder="Tulis pendapatmu tentang film ini..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              Submit
            </button>
          </form>
          {showSuccess && (
            <div className="mt-4 text-green-600 font-medium text-center">
              Review berhasil ditambahkan!
            </div>
          )}
        </section>
      </div>
    </div>
  );
}