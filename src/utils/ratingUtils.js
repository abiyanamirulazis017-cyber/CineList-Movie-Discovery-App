// Warna badge berdasarkan skor rating
export function getRatingColor(rating) {
  if (rating == null) return "text-gray-600 bg-gray-50";
  if (rating >= 7.5) return "text-green-600 bg-green-50";
  if (rating >= 6) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
}

// Format rating jadi 1 desimal, handle null
export function formatRating(rating) {
  if (rating == null) return "N/A";
  return rating.toFixed(1);
}

// Array 5 elemen untuk render bintang
// index < rating → bintang penuh, sisanya kosong
export function getStarArray(rating) {
  const rounded = Math.round(rating || 0);
  return Array.from({ length: 5 }, (_, i) => i < rounded);
}

// Konversi rating 0-10 → 0-5 bintang
export function toStars(rating) {
  if (rating == null) return 0;
  return Math.round(rating / 2);
}