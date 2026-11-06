import { createContext, useContext, useState, useEffect, useCallback } from "react";
import apiClient, { API_TOKEN_LS_KEY } from "./apiClient"; // Pastikan path ini benar

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State untuk menyimpan data user yang login
  const [user, setUser] = useState(null);
  // State untuk menandakan apakah aplikasi sedang memuat data user awal
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mendapatkan data user dari API Laravel menggunakan token
  const mutateUser = useCallback(async () => {
    try {
      const response = await apiClient.get('/user'); 
      setUser(response.data);
    } catch (error) {
      // JANGAN tampilkan error 401 ke console jika itu hanya karena belum login
      if (error.response && error.response.status !== 401) {
        console.error("Gagal mengambil data user:", error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Jalankan mutateUser saat aplikasi pertama kali dibuka (refresh)
  useEffect(() => {
    mutateUser();
  }, [mutateUser]);

  // Fungsi Login: Menembak API Laravel
  const login = async (email, password) => {
    try {
      // Menembak endpoint /login
      const response = await apiClient.post('/login', { email, password });
      
      // Simpan token yang didapat dari Laravel ke LocalStorage
      // Sesuaikan 'response.data.token' dengan response AuthController Anda
      // (Jika di backend Anda menggunakan 'access_token', ganti menjadi response.data.access_token)
      localStorage.setItem(API_TOKEN_LS_KEY, response.data.token);
      
      // Setelah token disimpan, panggil mutateUser untuk mengambil data user
      await mutateUser();
      
      return { success: true };
    } catch (error) {
      // Menangkap pesan error dari Laravel (misal: "Kredensial salah")
      const errorMessage = error.response?.data?.message || "Email atau password salah";
      return { success: false, message: errorMessage };
    }
  };

  // Fungsi Logout: Menembak API dan menghapus token
  const logout = async () => {
    try {
      // Menembak endpoint /logout di Laravel (opsional, tapi disarankan)
      await apiClient.post('/logout');
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      // Apapun yang terjadi, hapus token di lokal
      localStorage.removeItem(API_TOKEN_LS_KEY);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, mutateUser }}>
      {/* Tampilkan anak komponen hanya jika loading sudah selesai */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}