import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Discover from "./pages/frontpages/Discover";
import MovieDetail from "./pages/frontpages/MovieDetail";
import Watchlist from "./pages/frontpages/Watchlist";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Discover />} />
        <Route path="dashboard" element={<Discover />} />
        <Route path="movie/:slug" element={<MovieDetail />} />
        <Route path="watchlist" element={<Watchlist />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Route>
    </Routes>
  );
}