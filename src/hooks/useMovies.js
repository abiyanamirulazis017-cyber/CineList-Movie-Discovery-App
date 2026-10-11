import { useState, useEffect } from "react";
import { dummyMovies, getGenreNames } from "../data/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Helper: mapping field TMDB → format aplikasi kita
function mapMovie(m) {
  return {
    id: m.id,
    title: m.title,
    slug: m.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    overview: m.overview,
    poster_path: m.poster_path
      ? `${IMG_BASE}${m.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster",
    backdrop_path: m.backdrop_path
      ? `${IMG_BASE}${m.backdrop_path}`
      : null,
    vote_average: m.vote_average,
    release_date: m.release_date,
    genre_ids: m.genre_ids || [],
    genre_names: getGenreNames(m.genre_ids),
  };
}

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        // Fallback ke dummy kalau tidak ada API key
        if (!API_KEY) {
          setMovies(dummyMovies);
          return;
        }

        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        setMovies(data.results.map(mapMovie));
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
  }, []);

  return { movies, loading, error };
}