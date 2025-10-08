import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  if (cookies().get("admin_session")?.value !== "true") {
    redirect("/admin/login");
  }

  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Daftar Pengguna</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-700">
            <h3 className="font-bold text-xl text-white mb-2">{user.name || "Anonim"}</h3>
            <p className="text-gray-300 mb-1">{user.email || "Tidak Ada Email"}</p>
            <p className="text-gray-300 mb-1">Premium: {user.isPremium ? <span className="text-green-400">✅ Ya</span> : <span className="text-red-400">❌ Tidak</span>}</p>
            <p className="text-gray-300 mb-1">Daftar via: <span className="font-medium text-purple-300">{user.provider}</span></p>
            <p className="text-gray-300">Judul: <span className="font-medium text-yellow-300">{user.memberTitle || "Belum Ada"}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
