export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-black text-white flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-700 p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
          Jadi Member Premium Zetahub
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
          Dukung Zetahub dan nikmati pengalaman menonton donghua tanpa batas dengan fitur eksklusif yang tak tertandingi!
        </p>

        <div className="bg-gray-900/70 rounded-lg p-6 md:p-8 mb-10 border border-yellow-500 shadow-inner">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-yellow-300">Benefit Premium</h2>
          <ul className="list-none space-y-4 text-left text-lg text-gray-200">
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Nonton tanpa iklan mengganggu
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Upload foto profil kustom yang menarik
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Atur judul member eksklusif (misal: "Penjaga", "Elite", "Master Donghua")
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Akses konten premium lebih awal
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Dukungan langsung dan prioritas
            </li>
            <li className="flex items-center">
              <span className="text-green-500 text-2xl mr-3">✅</span> Bantu kami terus berkembang!
            </li>
          </ul>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-4 rounded-lg text-xl md:text-2xl font-bold shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
          Bayar Sekarang (Rp 29.000 / bulan)
        </button>

        <p className="text-gray-400 text-sm mt-6">
          Harga dapat berubah sewaktu-waktu. Syarat dan Ketentuan berlaku.
        </p>
      </div>
    </div>
  );
}
