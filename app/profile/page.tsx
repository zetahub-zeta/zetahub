// src/app/profile/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image"; // Import the Image component

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  // Asumsi data premium datang dari session atau database
  const isPremium = session.user.isPremium || false; 
  const userName = session.user.name || "Pengguna Zetahub";
  const userEmail = session.user.email || "email@example.com";
  // Gunakan user.image untuk URL foto profil jika ada, atau fallback ke avatar default
  const userImage = session.user.image || null;
  const userMemberTitle = session.user.role === "ADMIN" ? "Administrator" : (session.user.isPremium ? "Elite Member" : "Member Biasa"); // Contoh title

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Profil Saya</h1>
      {!isPremium ? (
        <div className="bg-yellow-900/50 p-6 rounded-lg border border-yellow-700 shadow-lg">
          <p className="text-xl font-semibold text-yellow-300 mb-4">Upgrade ke <strong className="text-white">Premium</strong> untuk:</p>
          <ul className="list-disc pl-5 mt-2 text-gray-200 text-lg space-y-2">
            <li>Upload foto profil kustom</li>
            <li>Atur judul member eksklusif Anda</li>
            <li>Nonton tanpa iklan</li>
            <li>Akses fitur eksklusif lainnya!</li>
          </ul>
          <a href="/premium" className="inline-block mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition duration-300">
            Upgrade Sekarang
          </a>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-700">
            {userImage ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400">
                <Image 
                  src={userImage} 
                  alt={`${userName}'s profile picture`} 
                  width={96} 
                  height={96} 
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-purple-700 flex items-center justify-center text-5xl text-white font-bold border-2 border-yellow-400">
                {userName[0] || '?'}{/* Initial of name */}
              </div>
            )}
            
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold text-yellow-300">{userName}</span>
                {isPremium && ( // Hanya tampilkan tag PREMIUM jika user adalah premium
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
                )}
              </div>
              <p className="text-lg text-gray-300 mb-2">{userEmail}</p>
              <p className="text-md text-purple-300 italic">{userMemberTitle}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Informasi Akun</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400">Nama Pengguna:</span>
                <span className="text-white font-medium">{userName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400">Email:</span>
                <span className="text-white font-medium">{userEmail}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400">Status Keanggotaan:</span>
                <span className={`font-medium ${isPremium ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isPremium ? 'Premium' : 'Biasa'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Judul Member:</span>
                <span className="text-white font-medium">{userMemberTitle}</span>
              </div>
            </div>
            <a href="/settings" className="inline-block mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition duration-300">
              Edit Profil
            </a>
            <button className="ml-4 mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition duration-300">
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
