import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: { user: true, room: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(tasks);
}
