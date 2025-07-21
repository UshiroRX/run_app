import React from "react";

export default function RunsTable({ runs }: { runs: any[] }) {
  if (!runs.length) {
    return <div className="text-gray-500 text-center py-4">Нет пробежек.</div>;
  }
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border rounded-xl shadow bg-white">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-blue-700">
              Дата
            </th>
            <th className="py-2 px-4 text-left font-semibold text-blue-700">
              Дистанция (км)
            </th>
            <th className="py-2 px-4 text-left font-semibold text-blue-700">
              Время (мин)
            </th>
            <th className="py-2 px-4 text-left font-semibold text-blue-700">
              Локация
            </th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="border-t hover:bg-blue-50 transition">
              <td className="py-2 px-4">
                {new Date(run.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4">{run.distance}</td>
              <td className="py-2 px-4">{run.time}</td>
              <td className="py-2 px-4">{run.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
