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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border p-4 rounded text-center">
          <p className="text-2xl font-bold">{stats.users}</p>
          <p>Total Pengguna</p>
        </div>
        <div className="border p-4 rounded text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.premium}</p>
          <p>Pengguna Premium</p>
        </div>
        <div className="border p-4 rounded text-center">
          <p className="text-2xl font-bold">{stats.donghua}</p>
          <p>Donghua</p>
        </div>
        <div className="border p-4 rounded text-center">
          <p className="text-2xl font-bold">{stats.episodes}</p>
          <p>Episode</p>
        </div>
      </div>

      <div className="space-y-4">
        <a href="/admin/users" className="block bg-blue-600 text-white text-center py-2 rounded">
          Kelola Pengguna
        </a>
        <a href="/admin/donghua" className="block bg-green-600 text-white text-center py-2 rounded">
          Kelola Donghua & Episode
        </a>
        <a href="/admin/comments" className="block bg-red-600 text-white text-center py-2 rounded">
          Kelola Komentar
        </a>
      </div>
    </div>
  );
}