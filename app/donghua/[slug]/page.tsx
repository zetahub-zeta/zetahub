// src/app/donghua/[slug]/page.tsx
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DonghuaPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions); // ✅ Kirim authOptions
  const prisma = new PrismaClient();

  const donghua = await prisma.donghua.findUnique({
    where: { slug: params.slug },
    include: {
      episodes: { orderBy: { number: "asc" } },
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!donghua) {
    return <div className="p-6">Donghua tidak ditemukan</div>;
  }

  const firstEpisode = donghua.episodes[0];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{donghua.title}</h1>
      <p className="mb-6">{donghua.synopsis}</p>

      {firstEpisode && (
        <div className="mb-8">
          <video
            src={firstEpisode.videoUrl}
            controls
            className="w-full rounded bg-black"
            style={{ aspectRatio: "16/9" }}
          />
          <p className="mt-2 text-lg font-semibold">Episode {firstEpisode.number}: {firstEpisode.title}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Daftar Episode</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
          {donghua.episodes.map((ep) => (
            <div key={ep.id} className="border p-2 text-center rounded">
              {ep.number}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Komentar ({donghua.comments.length})</h2>
        {donghua.comments.map((comment) => (
          <div key={comment.id} className="border-b py-3">
            <div className="flex items-center gap-2">
              <span className="font-bold">{comment.user.name || "Anonim"}</span>
              {comment.user.isPremium && (
                <span className="text-green-600 font-bold">✅</span>
              )}
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}