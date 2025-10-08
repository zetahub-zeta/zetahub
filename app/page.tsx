// src/app/page.tsx
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const donghua = await prisma.donghua.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Zetahub</h1>
          <nav>
            <a href="/premium" className="text-gray-700 mx-2 hover:text-primary">Premium</a>
            <a href="/admin/login" className="text-gray-700 mx-2 hover:text-primary">Admin</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nonton Donghua Terbaru</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Ribuan episode, update harian, kualitas HD — semua dalam satu platform.</p>
          <a href="#donghua" className="btn-primary inline-block px-6 py-3 text-lg">
            Jelajahi Sekarang
          </a>
        </div>
      </section>

      {/* Donghua Terbaru */}
      <section id="donghua" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-dark">Donghua Terbaru</h2>
          {donghua.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada donghua. Tambahkan via <a href="/admin/login" className="text-primary hover:underline">Admin Panel</a>.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {donghua.map((d) => (
                <a key={d.id} href={`/donghua/${d.slug}`} className="card group block">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <img src={d.poster} alt={d.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm line-clamp-2">{d.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{d.year}</span>
                      <span className="premium-badge">HD</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Zetahub. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Platform streaming donghua terlengkap.</p>
        </div>
      </footer>
    </div>
  );
}
