import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

const fetchRooms = async () => {
  return prisma.room.findMany({
    include: { owner: true, members: true },
    orderBy: { updatedAt: 'desc' },
  });
};

export default async function RoomsPage() {
  const rooms = await fetchRooms();

  return (
    <main className="min-h-screen container py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">الغرف المتاحة</p>
          <h1 className="text-3xl font-semibold text-white">جميع الغرف</h1>
        </div>
        <Link href="/rooms/create" className="rounded-2xl bg-sohba-500 px-5 py-3 text-white transition hover:bg-sohba-600">
          إنشاء غرفة جديدة
        </Link>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {rooms.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`} className="card p-6 transition hover:border-sohba-500">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-white">{room.name}</p>
                <p className="mt-2 text-slate-400">{room.description ?? 'غرفة مجتمعية للنقاش والدعم'}</p>
              </div>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-sm text-slate-300">{room.members.length} أعضاء</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-slate-400">
              <span className="rounded-full bg-slate-900 px-3 py-1">{room.type}</span>
              <span className="rounded-full bg-slate-900 px-3 py-1">مالك: {room.owner.name ?? 'غير معروف'}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
