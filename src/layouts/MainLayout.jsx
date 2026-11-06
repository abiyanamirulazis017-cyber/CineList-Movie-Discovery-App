import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom"; // 1. Tambahkan Navigate
import Navbar from "../components/Navbar";
import { useAuth } from "../utils/AuthContext"; // 2. Import useAuth

export default function MainLayout() {
  // 3. Ambil status user dari AuthContext
  const { user } = useAuth(); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Genre");

  const location = useLocation();
  const showFilters =
    location.pathname === "/" || location.pathname === "/dashboard";

  // 4. LOGIKA PROTEKSI: Jika user belum login, tendang ke halaman /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {showFilters && (
        <header className="bg-gray-100 dark:bg-gray-800 p-4 flex flex-col md:flex-row gap-2 justify-between items-center transition-colors">
          <input
            type="text"
            placeholder="Cari judul film..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="Semua Genre">Semua Genre</option>
            {/* List genre Anda... */}
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
          </select>
        </header>
      )}

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
        <Outlet context={{ searchQuery, selectedCategory }} />
      </main>

      <footer className="bg-gray-800 dark:bg-black text-white text-center p-4 transition-colors">
        <p>© 2025 CineList | Movie Discovery App</p>
        <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
          Data from CineList API • Built with React + Vite
        </p>
      </footer>
    </div>
  );
}