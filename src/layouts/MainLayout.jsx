import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Genre");

  const location = useLocation();
  // Tampilkan header hanya di Discover
  const showFilters =
    location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Header hanya muncul di Discover */}
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
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="TV Movie">TV Movie</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>
        </header>
      )}

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
        <Outlet context={{ searchQuery, selectedCategory }} />
      </main>

      <footer className="bg-gray-800 dark:bg-black text-white text-center p-4 transition-colors">
        <p>© 2025 CineList | Movie Discovery App</p>
        <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
          Data from TMDB API • Built with React + Vite
        </p>
      </footer>
    </div>
  );
}