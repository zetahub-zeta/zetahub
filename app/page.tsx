'use client';
import { useEffect } from 'react';

export default function Home() {
  // Animasi bintang jatuh
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.pointerEvents = 'none';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = '-20px';
      star.style.fontSize = `${Math.random() * 20 + 10}px`;
      star.style.color = '#8B5CF6';
      star.style.opacity = '0.8';
      star.style.animation = 'fall 3s linear forwards';
      star.textContent = '★';
      document.body.appendChild(star);

      // Hapus setelah animasi
      setTimeout(() => star.remove(), 3000);
    };

    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const interval = setInterval(createStar, 500);
    return () => {
      clearInterval(interval);
      style.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">Zetahub</h1>
          <nav>
            <a href="/premium" className="text-gray-300 mx-2 hover:text-purple-300 transition">Premium</a>
            <a href="/admin/login" className="text-gray-300 mx-2 hover:text-red-400 transition">Admin</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Nonton Donghua Terbaru
        </h1>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Ribuan episode, update harian, kualitas HD — semua dalam satu platform.
        </p>
        <a 
          href="#donghua" 
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-lg inline-block transition shadow-lg"
        >
          Jelajahi Sekarang
        </a>
      </section>

      {/* Konten */}
      <section id="donghua" className="py-12 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-purple-300">Donghua Terbaru</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-gray-800/50 rounded-xl overflow-hidden border border-purple-900 hover:border-purple-600 transition group">
              <div className="h-40 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <span className="text-purple-400 font-bold text-center px-2">Donghua {i}</span>
              </div>
              <div className="p-2">
                <h3 className="font-bold text-sm text-white line-clamp-2">Judul Donghua Sangat Panjang {i}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">2024</span>
                  <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">HD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm mt-12 border-t border-gray-800">
        &copy; 2024 Zetahub. All rights reserved.
      </footer>
    </div>
  );
}
