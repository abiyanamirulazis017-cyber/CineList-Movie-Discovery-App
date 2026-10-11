import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../utils/AuthContext";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-3">
            <button
              className="p-2 border border-gray-300 dark:border-gray-600 rounded md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="font-bold text-gray-900 dark:text-white">CineList Admin</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors">
          <Outlet />
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
          © 2026 CineList Admin App — v1.0.0
        </footer>
      </div>
    </div>
  );
}