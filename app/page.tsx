import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const donghua = await prisma.donghua.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Donghua Terbaru</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {donghua.map((d) => (
          <div key={d.id} className="border rounded overflow-hidden">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-sm">
              {d.title}
            </div>
            <div className="p-2">
              <h3 className="font-bold text-sm">{d.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}