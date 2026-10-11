import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export function useMovieDetail(movieId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kalau tidak ada movieId, tidak fetch
    if (!movieId) return;

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        if (!API_KEY) {
          throw new Error("API key TMDB tidak ditemukan");
        }

        // Fetch detail film + videos (trailer) sekaligus
        const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Cari trailer YouTube
        const trailer = data.videos?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setDetails({
          runtime: data.runtime,
          tagline: data.tagline,
          budget: data.budget,
          revenue: data.revenue,
          status: data.status,
          productionCompanies: data.production_companies || [],
          trailerKey: trailer?.key || null,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [movieId]);

  return { details, loading, error };
}