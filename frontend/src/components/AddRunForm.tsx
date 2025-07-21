"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import api from "../lib/api";

const Map = dynamic(() => import("./MapComponent"), { ssr: false });

export default function AddRunForm({ onAdd }: { onAdd: (run: any) => void }) {
  const [distance, setDistance] = useState<number | "">("");
  const [time, setTime] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("distance", String(distance));
      formData.append("time", String(time));
      formData.append("location", location);
      if (photo) formData.append("photo", photo);
      if (lat !== null) formData.append("lat", String(lat));
      if (lng !== null) formData.append("lng", String(lng));

      const res = await api.post("/runs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onAdd(res.data);
      setDistance("");
      setTime("");
      setLocation("");
      setPhoto(null);
      setLat(null);
      setLng(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add run");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 bg-blue-50 rounded-lg p-4 shadow-sm">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center animate-pulse">
          {error}
        </div>
      )}
      <form
        className="flex flex-col md:flex-row gap-4 items-end"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-blue-700">
            Дистанция (км)
          </label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={distance}
            onChange={(e) =>
              setDistance(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-blue-700">
            Время (мин)
          </label>
          <input
            type="number"
            min={1}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={time}
            onChange={(e) =>
              setTime(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-blue-700">
            Локация
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-blue-700">
            Фото
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-blue-700">
            Место на карте
          </label>
          <Map
            onSelect={(lat, lng) => {
              setLat(lat);
              setLng(lng);
            }}
          />
          {lat && lng && (
            <div className="text-xs text-gray-500 mt-1">
              Выбрано: {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="min-w-[100px] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow"
          disabled={loading}
        >
          {loading ? "Добавление..." : "Добавить"}
        </button>
      </form>
    </div>
  );
}
