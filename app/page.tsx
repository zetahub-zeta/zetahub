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
      star.style.color = '#C084FC'; // Warna ungu yang lebih terang
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-black text-white font-sans">
      {/* Header */}
      <header className="bg-black/60 backdrop-blur-md border-b border-purple-800 shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-purple-400 tracking-wide">Zetahub</h1>
          <nav className="flex items-center space-x-6">
            <a href="/premium" className="text-gray-300 text-lg hover:text-yellow-400 transition duration-300 ease-in-out font-medium">Premium</a>
            <a href="/admin/login" className="text-gray-300 text-lg hover:text-red-500 transition duration-300 ease-in-out font-medium">Admin</a>
            <a href="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out">Login</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10 blur-sm"></div> {/* Optional: Add a subtle background pattern */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent leading-tight drop-shadow-lg">
          Nonton Donghua Terbaru
        </h1>
        <p className="text-gray-200 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Ribuan episode, update harian, kualitas HD — semua dalam satu platform, kapan pun, di mana pun.
        </p>
        <a 
          href="#donghua-list" 
          className="bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold py-3 px-8 rounded-full inline-block transition duration-300 ease-in-out shadow-xl transform hover:scale-105"
        >
          Jelajahi Sekarang
        </a>
      </section>

      {/* Konten Donghua Terbaru */}
      <section id="donghua-list" className="py-16 px-4 bg-gray-900/80 backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-yellow-300">Donghua Terbaru Pilihan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <div key={i} className="bg-gray-800/70 rounded-xl overflow-hidden border border-purple-800 hover:border-purple-500 transition duration-300 ease-in-out group transform hover:scale-105 shadow-lg">
              <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
                <span className="text-purple-400 font-bold text-xl text-center leading-snug group-hover:text-yellow-300 transition duration-300">Donghua {i}</span>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-md text-white line-clamp-2 mb-1 group-hover:text-purple-300 transition duration-300">Judul Donghua Sangat Panjang Sekali {i}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">2024</span>
                  <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">HD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm mt-16 border-t border-gray-800 bg-gray-900/70">
        &copy; 2024 Zetahub. All rights reserved.
      </footer>
    </div>
  );
}
