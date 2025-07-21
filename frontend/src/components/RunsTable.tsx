import React from "react";
import dynamic from "next/dynamic";

const MiniMap = dynamic(() => import("./MiniMap"), { ssr: false });
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function RunsTable({ runs }: { runs: any[] }) {
  if (!runs.length) {
    return <div className="text-gray-500 text-center py-4">Нет пробежек.</div>;
  }
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border rounded-xl shadow bg-white text-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Дата
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Дистанция (км)
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Время (мин)
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Локация
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Фото
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              Координаты
            </th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">
              На карте
            </th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            const photoHref =
              run.photoUrl && run.photoUrl.startsWith("/")
                ? `${backendUrl}${run.photoUrl}`
                : run.photoUrl;
            return (
              <tr
                key={run.id}
                className="border-t hover:bg-blue-50 transition group"
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date(run.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{run.distance}</td>
                <td className="py-3 px-4 whitespace-nowrap">{run.time}</td>
                <td className="py-3 px-4 whitespace-nowrap">{run.location}</td>
                <td className="py-3 px-4">
                  {photoHref ? (
                    <a
                      href={photoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={photoHref}
                        alt="run"
                        className="h-16 rounded shadow hover:scale-110 transition group-hover:ring-2 group-hover:ring-blue-400"
                      />
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {run.lat && run.lng ? (
                    <span>
                      {run.lat.toFixed(5)}, {run.lng.toFixed(5)}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {run.lat && run.lng ? (
                    <MiniMap lat={run.lat} lng={run.lng} />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
