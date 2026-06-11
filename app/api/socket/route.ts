import { Server } from 'socket.io';
import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const runtime = 'nodejs';

const ioHandler = async (req: NextRequest) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const WebSocketPairConstructor = (global as any).WebSocketPair;
  if (!WebSocketPairConstructor) {
    return new Response('WebSocket upgrade unavailable on this runtime', { status: 501 });
  }

  const upgrader = new WebSocketPairConstructor();
  const [client, server] = upgrader;

  (req as any).signal.addEventListener('abort', () => server.close());

  const io = new Server(server as any, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join-room', async ({ roomId, userId }) => {
      socket.join(roomId);
      const user = await prisma.user.findUnique({ where: { id: userId } });
      io.to(roomId).emit('room-user-joined', { roomId, user });
    });

    socket.on('send-message', async (payload) => {
      const message = await prisma.message.create({
        data: {
          roomId: payload.roomId,
          senderId: payload.senderId,
          content: payload.content,
          type: payload.type || 'TEXT',
          parentId: payload.parentId,
        },
        include: { sender: true },
      });
      io.to(payload.roomId).emit('new-message', message);
    });

    socket.on('add-reaction', async ({ messageId, userId, emoji }) => {
      const reaction = await prisma.reaction.upsert({
        where: { messageId_userId_emoji: { messageId, userId, emoji } },
        create: { messageId, userId, emoji },
        update: {},
      });
      io.to((socket.data.roomId as string) ?? '').emit('reaction-updated', reaction);
    });

    socket.on('disconnect', () => {
      // cleanup if needed
    });
  });

  return new Response(null, {
    status: 101,
    // `webSocket` is supported in edge-compatible runtimes with WebSocketPair
    // but not yet typed by Next.js in this build environment.
    ...( { webSocket: client } as any ),
  } as any);
};

export { ioHandler as GET };
