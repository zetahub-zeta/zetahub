import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DonghuaPage({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
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
    return <div className="p-6 text-white bg-gray-900 min-h-screen">Donghua tidak ditemukan</div>;
  }

  const firstEpisode = donghua.episodes[0];

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-purple-400">{donghua.title}</h1>
      <p className="mb-6 text-gray-300">{donghua.synopsis}</p>

      {firstEpisode && (
        <div className="mb-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-purple-700">
          <div className="aspect-video bg-black flex items-center justify-center text-gray-400 text-xl">
            ▶ Video Player (Dummy) - {firstEpisode.title}
          </div>
          <p className="mt-2 p-3 text-lg font-semibold text-white">Episode {firstEpisode.number}: {firstEpisode.title}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Daftar Episode</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-3">
          {donghua.episodes.map((ep) => (
            <a
              key={ep.id}
              href={`/donghua/${params.slug}?ep=${ep.number}`}
              className="bg-gray-800 border border-purple-800 p-3 text-center rounded-lg hover:bg-purple-700 hover:border-purple-500 transition duration-300 text-white font-medium"
            >
              {ep.number}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Komentar ({donghua.comments.length})</h2>
        <div className="space-y-4">
          {donghua.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-lg text-yellow-300">{comment.user.name || "Anonim"}</span>
                {comment.user.isPremium && (
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
                )}
                <span className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-200">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
