// Data dummy sebagai fallback kalau API key tidak ada
export const dummyMovies = [
  {
    id: 550,
    title: "Fight Club",
    slug: "fight-club",
    overview:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path:
      "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/w500/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    vote_average: 8.433,
    release_date: "1999-10-15",
    genre_ids: [18],
    genre_names: ["Drama"],
    runtime: 139,
  },
  // Tambah 5-6 film lain dengan struktur sama
];

// Mapping TMDB genre ID → nama (dari dokumentasi TMDB)
export const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Helper: konversi array genre_ids → array nama genre
export function getGenreNames(genreIds) {
  if (!genreIds) return [];
  return genreIds
    .map((id) => GENRES[id])
    .filter(Boolean); // buang yang undefined
}