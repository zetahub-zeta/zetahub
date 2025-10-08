"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p }),
    });
    if (res.ok) router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={login} className="p-8 border border-purple-700 rounded-xl shadow-lg bg-gray-800 w-96">
        <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center">Admin Login</h2>
        <input
          value={u}
          onChange={(e) => setU(e.target.value)}
          placeholder="Username"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          placeholder="Password"
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
