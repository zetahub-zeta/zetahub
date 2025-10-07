// src/app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const isPremium = true; // Ganti dengan data sesungguhnya dari session

  if (!isPremium) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
        <div className="bg-yellow-50 p-4 rounded">
          <p>Upgrade ke <strong>Premium</strong> untuk:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Upload foto profil</li>
            <li>Atur judul member eksklusif</li>
            <li>Nonton tanpa iklan</li>
          </ul>
          <a href="/premium" className="inline-block mt-3 bg-purple-600 text-white px-4 py-2 rounded">
            Upgrade Sekarang
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Budi</span>
            <span className="text-green-600 font-bold">✅</span>
          </div>
          <p className="text-gray-600">Penjaga Zetahub</p>
          <p className="text-sm text-gray-500">budi@gmail.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Foto Profil</label>
          <input type="file" accept="image/*" className="block w-full" />
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            Upload Foto
          </button>
        </div>
        <div>
          <label className="block font-medium mb-2">Judul Member</label>
          <div className="flex gap-2">
            <input
              type="text"
              defaultValue="Penjaga Zetahub"
              className="flex-1 p-2 border rounded"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}