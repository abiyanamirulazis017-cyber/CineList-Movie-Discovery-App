import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle("Login CineList");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PENDEKATAN BARU: Pantau perubahan state 'user'
  useEffect(() => {
    // Jika user sudah login (tidak null)
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true }); // Lempar ke admin
      } else {
        navigate('/', { replace: true }); // Lempar ke user biasa
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.message);
      }
      // Jika sukses, kita TIDAK memanggil navigate di sini.
      // Biarkan useEffect di atas yang mengurus perpindahan halaman.
      
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* ═══ Background: Poster Films Blur ═══ */}
      <div className="absolute inset-0 z-0">
        {/* Grid poster film */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 opacity-25 blur-sm">
          {[
            "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", // Dune
            "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", // Spider-Man
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
            "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg", // Inception
            "https://image.tmdb.org/t/p/w500/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg", // Interstellar
            "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg", // The Batman
            "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg", // Joker
            "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Oppenheimer
            "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // Avengers
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Parasite
            "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg", // Avatar
            "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Endgame
            "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", // No Way Home
            "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", // The Batman 2
            "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", // Spider-Verse
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-full object-cover" />
          ))}
        </div>

        {/* Gradient overlay gelap */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/40 to-black z-10" />
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative z-20 w-full max-w-md mx-4">
        
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Login CineList
          </h1>
          <p className="text-sm text-white/60 text-center mb-6">
            Tempat menemukan film favoritmu dan berbagi pengalaman menonton dengan komunitas CineList!
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2.5 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                placeholder="Masukkan email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-95"
            >
              {isSubmitting ? "Memproses..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}