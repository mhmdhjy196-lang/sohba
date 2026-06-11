import { notFound } from 'next/navigation';
import { prisma } from '@/app/lib/prisma';
import { MessageSquare, Users, BookOpen, Sparkles, Bell, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

const fetchRoom = async (id: string) => {
  return prisma.room.findUnique({
    where: { id },
    include: {
      owner: true,
      members: { include: { user: true } },
      messages: { orderBy: { createdAt: 'desc' }, take: 25, include: { sender: true, reactions: true } },
    },
  });
};

export default async function RoomPage({ params }: any) {
  const room = await fetchRoom(params.id);
  if (!room) return notFound();

  return (
    <main className="min-h-screen container py-10">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-white">{room.name}</h1>
                <p className="mt-2 text-slate-400">{room.description ?? 'غرفة مجتمع بأجواء دعم وتعلم.'}</p>
              </div>
              <span className="rounded-3xl bg-sohba-500 px-4 py-2 text-sm font-semibold text-white">{room.type}</span>
            </div>
            <div className="mt-6 grid gap-3 text-slate-400">
              <p>المالك: {room.owner.name ?? room.owner.email}</p>
              <p>عدد الأعضاء: {room.members.length}</p>
              <p>آخر تحديث: {new Date(room.updatedAt).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 text-slate-300">
              <Users className="h-5 w-5" />
              <h2 className="text-lg font-semibold text-white">أعضاء الغرفة</h2>
            </div>
            <div className="mt-4 space-y-3">
              {room.members.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4">
                  <div>
                    <p className="font-semibold text-white">{member.user.name ?? member.user.email}</p>
                    <p className="text-sm text-slate-400">{member.role}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{new Date(member.joinedAt).toLocaleDateString('ar-EG')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">الدردشة الحية</h2>
                <p className="mt-2 text-slate-400">نص الرسائل الصوتية، التفاعل، والردود متاحة في الوقت الحقيقي.</p>
              </div>
              <div className="flex gap-3 text-slate-400">
                <MessageSquare className="h-5 w-5" />
                <Bell className="h-5 w-5" />
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {room.messages.map((message) => (
                <article key={message.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{message.sender.name ?? message.sender.email}</p>
                      <p className="mt-2 text-slate-300">{message.content ?? 'رسالة صوتية'}</p>
                    </div>
                    <span className="text-sm text-slate-500">{new Date(message.createdAt).toLocaleTimeString('ar-EG')}</span>
                  </div>
                  {message.reactions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-400">
                      {message.reactions.map((reaction) => (
                        <span key={reaction.id} className="rounded-full bg-slate-800/80 px-3 py-1">{reaction.emoji}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <BookOpen className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">سجل قراءة القرآن</h3>
              </div>
              <p className="mt-4 text-slate-400">تتضمن هذه الغرفة تقدم الختمة، الصفحات المكتملة، والقيادة الجماعية.</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">مهام وتحديات</h3>
              </div>
              <p className="mt-4 text-slate-400">تعيين مهام عبادة ودراسة وتحقيق نقاط الخبرة داخل الغرفة.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
