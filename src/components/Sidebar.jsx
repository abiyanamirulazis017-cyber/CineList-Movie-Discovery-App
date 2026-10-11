import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white dark:bg-gray-800 shadow-md transition-colors`}>
      <div className="p-4 font-bold text-xl text-gray-900 dark:text-white">CineList Admin</div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded text-gray-700 dark:text-gray-200 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/about"
          className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded text-gray-700 dark:text-gray-200 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          About
        </Link>
      </nav>
    </div>
  );
}