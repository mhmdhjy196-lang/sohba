import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const logs = await prisma.dhikrLog.findMany({
    include: { user: true, room: true },
    orderBy: { updatedAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(logs);
}
