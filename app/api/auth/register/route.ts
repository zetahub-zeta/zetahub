// src/app/api/auth/register/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Cek email sudah ada
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response(
      JSON.stringify({ error: 'Email sudah digunakan' }),
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat user baru
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isPremium: false,
      provider: "email",
      role: "USER",
    },
  });

  return new Response(
    JSON.stringify({ message: 'Akun berhasil dibuat' }),
    { status: 201 }
  );
}
