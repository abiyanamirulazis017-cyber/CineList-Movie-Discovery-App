import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; 

export default function Logout() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout(); // Memanggil fungsi logout dari AuthContext
            navigate('/login'); // Lempar ke halaman login setelah berhasil
        } catch (error) {
            console.error("Gagal logout:", error);
            setIsLoggingOut(false);
        }
    };

    const handleCancel = () => {
        // Kembali ke halaman sebelumnya jika user batal logout
        navigate(-1); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Sign Out
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400">
                    Apakah Anda yakin ingin keluar dari akun Anda?
                </p>

                <div className="space-y-4 pt-4">
                    {/* Tombol Konfirmasi Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex justify-center py-2.5 px-4 rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 transition duration-200"
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Ya, Logout'}
                    </button>

                    {/* Tombol Batal */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                        disabled={isLoggingOut}
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}