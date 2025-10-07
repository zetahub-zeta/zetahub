export default function PremiumPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Jadi Member Premium</h1>
      <p className="mb-6">Dukung Zetahub dan nikmati fitur eksklusif!</p>

      <div className="border rounded p-6 mb-6">
        <h2 className="text-xl font-bold mb-3">Benefit Premium</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Nonton tanpa iklan</li>
          <li>Upload foto profil kustom</li>
          <li>Atur judul member eksklusif (misal: "Penjaga", "Elite")</li>
          <li>Dukung pengembangan Zetahub</li>
        </ul>
      </div>

      <button className="w-full bg-purple-600 text-white py-3 rounded text-lg font-bold">
        Bayar Sekarang (Rp 29.000 / bulan)
      </button>
    </div>
  );
}