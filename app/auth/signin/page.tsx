import { getProviders } from 'next-auth/react';
import SignInClient from './SignInClient';

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <main className="min-h-screen container py-10">
      <section className="mx-auto max-w-2xl rounded-3xl border border-slate-800/70 bg-slate-950/90 p-10 shadow-soft">
        <h1 className="text-3xl font-semibold text-white">تسجيل الدخول إلى Sohba</h1>
        <p className="mt-3 text-slate-400">استخدم بريدك الإلكتروني أو حساب Google للانضمام إلى مجتمع القرآن والدراسة.</p>
        <div className="mt-8">
          <SignInClient providers={providers ?? {}} />
        </div>
      </section>
    </main>
  );
}
