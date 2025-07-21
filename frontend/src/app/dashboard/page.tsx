"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import RunsTable from "../../components/RunsTable";
import AddRunForm from "../../components/AddRunForm";

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    api
      .get("/runs")
      .then((res) => setRuns(res.data))
      .catch(() => setError("Failed to fetch runs"));
  }, [router]);

  const handleAddRun = (run: any) => {
    setRuns((prev) => [run, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Мои пробежки</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
          >
            Выйти
          </button>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center animate-pulse">
            {error}
          </div>
        )}
        <AddRunForm onAdd={handleAddRun} />
        <RunsTable runs={runs} />
      </div>
    </div>
  );
}
