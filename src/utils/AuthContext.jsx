import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Kredensial dummy — nanti bisa diganti dengan API
const DUMMY_USER = {
  email: "admin@cinelist.app",
  password: "admin123",
};

export function AuthProvider({ children }) {
  // Baca user dari localStorage saat pertama kali (biar persist)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cinelist_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Login: return { success, message } biar komponen bisa tampilkan error
  const login = (email, password) => {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      const loggedInUser = { email };
      setUser(loggedInUser);
      localStorage.setItem("cinelist_user", JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, message: "Email atau password salah" };
  };

  // Logout: hapus user & localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("cinelist_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}