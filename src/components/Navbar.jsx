import { NavLink } from "react-router-dom";
import { useWatchlist } from "../utils/WatchlistContext";
import { useTheme } from "../utils/ThemeContext";

export default function Navbar() {
  const { totalItems } = useWatchlist();
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "hover:text-gray-200 transition-colors";

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center transition-colors">
      {/* Logo */}
      <NavLink to="/" className="font-bold text-base sm:text-xl flex items-center gap-2">
        🎬 <span className="xs:inline sm:inline">CineList</span>
      </NavLink>

      {/* Menu + Toggle */}
      <div className="flex items-center gap-3 sm:gap-6">
        <NavLink to="/dashboard" className={linkClass}>
          Discover
        </NavLink>

        <div className="relative">
          <NavLink to="/watchlist" className={linkClass}>
            Watchlist
          </NavLink>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold pointer-events-none">
              {totalItems}
            </span>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? (
            // Sun icon (untuk keluar dari dark mode)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            // Moon icon (untuk masuk ke dark mode)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}