import Link from 'next/link';

export default function CreateRoomPage() {
  return (
    <main className="min-h-screen container py-10">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-800/70 bg-slate-950/90 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-white">إنشاء غرفة جديدة</h1>
        <p className="mt-3 text-slate-400">قريبًا ستدعم Sohba إنشاء الغرف مباشرة في التطبيق مع صلاحيات مخصصة للمشرفين.</p>
        <div className="mt-8 space-y-4 rounded-3xl border border-dashed border-slate-700/70 bg-slate-900/90 p-6 text-slate-400">
          <p>خطوات قادمة:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>نموذج إنشاء غرفة مع نوع الغرفة وكلمة المرور</li>
            <li>عرض المدعوين/الأعضاء</li>
            <li>إنشاء فوري مع ربط إلى لوحة الغرفة</li>
          </ul>
        </div>
        <Link href="/rooms" className="mt-6 inline-flex rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white transition hover:border-slate-500">
          العودة إلى الغرف
        </Link>
      </section>
    </main>
  );
}
