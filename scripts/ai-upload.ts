import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SIMULATED_NEW_EPISODES = [
  { donghuaSlug: "soul-land", episodeNumber: 261, title: "Episode 261" },
];

async function main() {
  for (const ep of SIMULATED_NEW_EPISODES) {
    const donghua = await prisma.donghua.findUnique({
      where: { slug: ep.donghuaSlug },
    });
    if (!donghua) continue;

    const existing = await prisma.episode.findFirst({
      where: { donghuaId: donghua.id, number: ep.episodeNumber },
    });

    if (!existing) {
      await prisma.episode.create({
         {
          number: ep.episodeNumber,
          title: ep.title,
          videoUrl: "https://example.com/video.mp4",
          isAIAdded: true,
          donghua: { connect: { id: donghua.id } },
        },
      });
      console.log(`✅ AI added ${ep.title} to ${donghua.title}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());