import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const sessions = await prisma.studySession.findMany({
    include: { user: true, room: true },
    orderBy: { startedAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(sessions);
}
