// scripts/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Buat admin user
  const adminPassword = await bcrypt.hash("zetahub123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@zetahub.com" },
    update: {},
    create: {
      name: "Admin Zetahub",
      email: "admin@zetahub.com",
      password: adminPassword,
      isPremium: true,
      memberTitle: "Penjaga Utama",
      provider: "email",
      role: "ADMIN",
    },
  });

  // Buat user premium
  const premiumPassword = await bcrypt.hash("premium123", 10);
  const premiumUser = await prisma.user.upsert({
    where: { email: "premium@zetahub.com" },
    update: {},
    create: {
      name: "Budi Premium",
      email: "premium@zetahub.com",
      password: premiumPassword,
      isPremium: true,
      memberTitle: "Elite Member",
      provider: "email",
      role: "USER",
    },
  });

  // Buat user non-premium
  const userPassword = await bcrypt.hash("user123", 10);
  const regularUser = await prisma.user.upsert({
    where: { email: "user@zetahub.com" },
    update: {},
    create: {
      name: "Andi User",
      email: "user@zetahub.com",
      password: userPassword,
      isPremium: false,
      memberTitle: "Member Biasa",
      provider: "email",
      role: "USER",
    },
  });

  // Buat beberapa donghua
  const donghuaData = [
    {
      title: "Soul Land",
      slug: "soul-land",
      synopsis: "Di dunia roh, Tang San terus berkembang...",
      genre: ["Action", "Fantasy"],
      studio: "Tencent Animation",
      year: 2018,
      status: "Ongoing",
      poster: "https://via.placeholder.com/300x450?text=Soul+Land",
    },
    {
      title: "Battle Through the Heavens",
      slug: "battle-through-heavens",
      synopsis: "Xiao Yan memulai perjalanannya untuk menjadi penguasa api...",
      genre: ["Adventure", "Romance"],
      studio: "Iqiyi",
      year: 2019,
      status: "Completed",
      poster: "https://via.placeholder.com/300x450?text=Battle+Through+Heavens",
    },
    {
      title: "A Will Eternal",
      slug: "a-will-eternal",
      synopsis: "Bai Xiaochun mencari jalan keabadian...",
      genre: ["Comedy", "Fantasy"],
      studio: "Tencent Animation",
      year: 2020,
      status: "Ongoing",
      poster: "https://via.placeholder.com/300x450?text=A+Will+Eternal",
    },
  ];

  for (const d of donghuaData) {
    const donghua = await prisma.donghua.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });

    // Tambahkan 3 episode untuk setiap donghua
    for (let i = 1; i <= 3; i++) {
      await prisma.episode.create({
        data: {
          number: i,
          title: `Episode ${i}`,
          videoUrl: `https://example.com/video-${d.slug}-ep${i}.mp4`,
          isAIAdded: true,
          donghua: { connect: { id: donghua.id } },
        },
      });
    }
  }

  console.log("✅ Data dummy berhasil ditambahkan!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
