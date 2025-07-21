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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            Мои пробежки
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition shadow font-semibold"
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
