# Sohba

Sohba is an Arabic community platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth, Socket.IO, and Zustand.

## Features

- Authentication with email and Google
- Community rooms with roles and permissions
- Real-time chat with replies, reactions, and voice note support
- Quran reading progress and group Khatma
- Digital Tasbeeh with daily targets
- Daily worship, study and good deed tasks
- Study groups with Pomodoro sessions
- XP, achievements, badges, and rankings
- Admin panel for user and room moderation
- RTL Arabic theme, dark mode, mobile-first UI

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```

2. Create `.env.local`
   ```bash
   cp .env.example .env.local
   ```

3. Set PostgreSQL database URL in `.env.local`
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   NEXTAUTH_SECRET=your-random-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_URL=http://localhost:3000
   SUPER_ADMIN_EMAIL=mokaledrshad@gmail.com
   ```

4. Generate Prisma client and run migrations
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the app
   ```bash
   npm run dev
   ```

## Deployment

- Deploy on Vercel with one-click deployment
- Add environment variables in Vercel dashboard
- Set `NEXTAUTH_URL` to your deployment URL

## App structure

- `app/` - Next.js App Router pages and API routes
- `prisma/` - Prisma schema
- `src/` - helper libs and Zustand stores
- `app/components/` - reusable UI components
- `app/styles/` - Tailwind and global styles
