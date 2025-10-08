import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  if (cookies().get("admin_session")?.value !== "true") {
    redirect("/admin/login");
  }

  const prisma = new PrismaClient();
  const stats = {
    users: await prisma.user.count(),
    premium: await prisma.user.count({ where: { isPremium: true } }),
    donghua: await prisma.donghua.count(),
    episodes: await prisma.episode.count(),
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-purple-700">
          <p className="text-4xl font-bold text-gray-200">{stats.users}</p>
          <p className="text-gray-400 mt-2">Total Pengguna</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-green-600">
          <p className="text-4xl font-bold text-green-400">{stats.premium}</p>
          <p className="text-gray-400 mt-2">Pengguna Premium</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-blue-600">
          <p className="text-4xl font-bold text-blue-400">{stats.donghua}</p>
          <p className="text-gray-400 mt-2">Total Donghua</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center border border-yellow-600">
          <p className="text-4xl font-bold text-yellow-400">{stats.episodes}</p>
          <p className="text-gray-400 mt-2">Total Episode</p>
        </div>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <a href="/admin/users" className="block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-center transition duration-300">
          Kelola Pengguna
        </a>
        <a href="/admin/donghua" className="block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg text-center transition duration-300">
          Kelola Donghua & Episode
        </a>
        <a href="/admin/comments" className="block bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg text-center transition duration-300">
          Kelola Komentar
        </a>
      </div>
    </div>
  );
}
