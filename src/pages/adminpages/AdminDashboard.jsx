import { useDocumentTitle } from "../../hooks/useDocumentTitle";
export default function AdminDashboard() {
  useDocumentTitle("Admin Dashboard");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">CineList Admin Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-700 dark:text-gray-300">
        Welcome to the CineList Admin Dashboard!
      </div>
    </div>
  );
}