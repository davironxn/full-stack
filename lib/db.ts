import pkg from '@prisma/client';

const PrismaClient = (pkg as any).PrismaClient ?? (pkg as any).default ?? pkg;

declare global {
  // eslint-disable-next-line no-var
  interface PrismaGlobal {
    __prisma?: any;
  }

  // eslint-disable-next-line no-var
  var __prisma: any;

  namespace NodeJS {
    interface Global extends PrismaGlobal {}
  }
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;