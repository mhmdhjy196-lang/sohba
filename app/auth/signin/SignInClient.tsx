'use client';

import { signIn } from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react';

interface SignInClientProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignInClient({ providers }: SignInClientProps) {
  return (
    <div className="grid gap-4">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={() => signIn(provider.id)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:border-slate-500"
        >
          تسجيل الدخول باستخدام {provider.name}
        </button>
      ))}
    </div>
  );
}
