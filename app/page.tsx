import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { ChevronRight } from 'lucide-react';

const fetchRooms = async () => {
  return prisma.room.findMany({
    include: {
      owner: true,
      members: { take: 4, include: { user: true } },
    },
    take: 8,
    orderBy: { updatedAt: 'desc' },
  });
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const rooms = await fetchRooms();

  return (
    <main className="min-h-screen container py-10">
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">مرحبا بك في صحبة</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">منصة القرآن والدراسة والمجتمع</h1>
            <p className="mt-3 max-w-2xl text-slate-400">انضم إلى غرفٍ داعمة، تابع قراءة القرآن، أتم التحديات اليومية، وواصل مع صحبة تعلم مبتكرة.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/rooms" className="inline-flex items-center rounded-2xl bg-sohba-500 px-5 py-3 text-white transition hover:bg-sohba-600">
              استكشف الغرف
              <ChevronRight className="mr-2 h-4 w-4" />
            </Link>
            <Link href="/auth/signin" className="inline-flex items-center rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 text-slate-100 transition hover:border-slate-700">
              تسجيل الدخول / إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <article className="card p-6">
          <h2 className="text-xl font-semibold text-white">لماذا Sohba؟</h2>
          <p className="mt-4 text-slate-400">منصة اجتماعية عربية تجمع بين غرف النقاش، قراءة القرآن، تحديات الذكر، مهام يومية، ومجموعات الدراسة. تم تصميمها لتكون قابلة للتوسع وتدعم التجربة الحقيقية للمستخدم.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'غرف مخصصة', subtitle: 'منشأة للمهام، الدراسة، والقراءة الجماعية' },
              { title: 'قرآن وتحديات', subtitle: 'متابعة قراءة، إحراز تقدم، وهدف يومي' },
              { title: 'ذكّر نفسك', subtitle: 'عداد تسبيح رقمي وتحديات جماعية' },
              { title: 'الأهداف والإنجازات', subtitle: 'نظام نقاط ومكافآت دافع' },
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-800/70 p-5 bg-slate-950/80">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-slate-400">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white">المجتمعات النشطة</h3>
            <div className="mt-5 space-y-4">
              {rooms.map((room) => (
                <Link key={room.id} href={`/rooms/${room.id}`} className="block rounded-3xl border border-slate-800/70 bg-slate-950/90 p-4 transition hover:border-sohba-500">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{room.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{room.topic ?? 'غرفة مجتمعية'}</p>
                    </div>
                    <span className="rounded-full bg-slate-800/80 px-3 py-1 text-sm text-slate-300">{room.members.length} أعضاء</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white">الميزات السريعة</h3>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li>دردشة نصية وصوتية حية</li>
              <li>تقدم القراءة الجماعي وتحديات الختمة</li>
              <li>مهام يومية ومكافآت XP</li>
              <li>لوحة إدارية للمشرفين</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
