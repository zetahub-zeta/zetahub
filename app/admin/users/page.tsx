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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <h3 className="font-bold">{user.name || "–"}</h3>
            <p>{user.email || "–"}</p>
            <p>Premium: {user.isPremium ? "✅" : "❌"}</p>
            <p>Daftar via: {user.provider}</p>
            <p>Judul: {user.memberTitle || "–"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}