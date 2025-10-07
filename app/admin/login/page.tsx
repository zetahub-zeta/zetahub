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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={login} className="p-6 border rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          value={u}
          onChange={(e) => setU(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}