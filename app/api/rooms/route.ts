import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const rooms = await prisma.room.findMany({
    include: {
      owner: true,
      members: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json(rooms);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, topic, type, ownerId, password } = body;
  const room = await prisma.room.create({
    data: {
      name,
      description,
      topic,
      type,
      ownerId,
      password,
      members: {
        create: {
          userId: ownerId,
          role: 'OWNER',
        },
      },
    },
  });
  return NextResponse.json(room, { status: 201 });
}
