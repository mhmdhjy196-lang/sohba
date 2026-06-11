# Deploy Sohba on Vercel (دليل النشر)

## Quick Deploy Steps

### 1. Go to Vercel
Visit: https://vercel.com/new

### 2. Connect GitHub
- Click "Continue with GitHub"
- Select the `sohba` repository from `mhmdhjy196-lang`
- Click "Import"

### 3. Configure Environment Variables
In the **Environment Variables** section, add:

```
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_URL=https://your-vercel-url.vercel.app
NEXTAUTH_SECRET=openssl rand -base64 32  # Generate a random secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SUPER_ADMIN_EMAIL=mokaledrshad@gmail.com
```

### 4. Deploy
Click **Deploy**

### 5. Get Your Live Link
After deployment completes, Vercel will provide a live URL like:
```
https://sohba-xxxxx.vercel.app
```

### 6. Test Health Endpoint
Visit: `https://sohba-xxxxx.vercel.app/api/health`

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-06-11T...",
  "database": "connected",
  "version": "0.1.0"
}
```

## Features Deployed
✅ Next.js 15 App Router
✅ TypeScript full type safety
✅ Prisma ORM with PostgreSQL
✅ NextAuth authentication (Email + Google)
✅ Real-time Socket.IO chat (on Node.js runtime)
✅ Tailwind CSS with dark mode
✅ Zustand state management
✅ Arabic RTL support
✅ Mobile-first responsive design
✅ All 12 core features: Rooms, Quran, Dhikr, Tasks, Study, Gamification, etc.

## Notes
- Database must be PostgreSQL (Vercel supports Neon, Supabase, AWS RDS)
- Use Vercel KV for sessions if preferred
- Email provider requires SMTP setup (SendGrid recommended)
- Vercel Analytics included
