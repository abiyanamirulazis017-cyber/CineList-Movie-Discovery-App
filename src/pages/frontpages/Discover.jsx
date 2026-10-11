import { useOutletContext, Link } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import MovieCard from "../../components/MovieCard";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Discover() {
  const { searchQuery, selectedCategory } = useOutletContext();
  const { movies, loading, error } = useMovies();
  useDocumentTitle("Discover");

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Movies</h1>
        <p className="text-sm text-gray-500 mb-4">Memuat film...</p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 animate-pulse"
            >
              <div className="w-full aspect-2/3 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg font-semibold">Gagal memuat film</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  const filteredMovies = movies.filter((m) => {
    const matchSearch = m.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchGenre =
        selectedCategory === "Semua Genre" ||
        m.genre_names?.includes(selectedCategory);

    return matchSearch && matchGenre;
  });

  // Ambil film pertama untuk hero (hanya tampil kalau tidak ada search/filter)
  const heroMovie = movies[0];
  const showHero =
  !searchQuery && selectedCategory === "Semua Genre" && heroMovie;

  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      {showHero && (
        <section className="relative mb-4 rounded-lg overflow-hidden shadow-md min-h-50 sm:min-h-55 lg:min-h-60 flex items-end">
          {/* Backdrop image */}
          <div className="absolute inset-0">
            <img
              src={heroMovie.poster_path}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-5 sm:p-6 lg:p-8 max-w-xl w-full">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold mb-1.5 flex items-center gap-2">
              🔥 Trending This Week
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              {heroMovie.title}
            </h2>

            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm mb-2 flex-wrap">
              <span className="flex items-center gap-1">
                ⭐ {heroMovie.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span>•</span>
              <span>{heroMovie.release_date?.slice(0, 4) || "—"}</span>
              {heroMovie.genre_names?.[0] && (
                <>
                  <span>•</span>
                  <span>{heroMovie.genre_names.slice(0, 2).join(", ")}</span>
                </>
              )}
            </div>

            <p className="text-white/80 text-xs sm:text-sm mb-3 line-clamp-2 max-w-md">
              {heroMovie.overview}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/movie/${heroMovie.slug}`}
                state={{ movie: heroMovie, movieId: heroMovie.id }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                ▶ Lihat Detail
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── HEADER SECTION ─── */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Movies</h1>
        <p className="text-sm text-gray-500 mt-1">
          Menampilkan {filteredMovies.length} dari {movies.length} film
        </p>
      </div>

      {/* ─── GRID FILM ─── */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tidak ada film yang cocok
          </p>
          <p className="text-gray-500 dark:text-gray-400">Coba ubah kata kunci atau genre.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-[slideUp_0.4s_ease-out]">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}