import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Run Tracker
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Легко отслеживай свои пробежки, анализируй прогресс и мотивируй себя
          на новые рекорды!
        </p>
        <Link href="/login">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition">
            Войти
          </button>
        </Link>
      </div>
      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Run Tracker
      </footer>
    </div>
  );
}
