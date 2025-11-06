import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";

const DEMO_USERS = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Demo Admin",
    isAdmin: true,
  },
  {
    email: "user@example.com",
    password: "user123",
    name: "Demo User",
    isAdmin: false,
  },
];

export async function POST() {
  try {
    await Promise.all(
      DEMO_USERS.map(async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 10);
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            password: passwordHash,
            isAdmin: user.isAdmin,
          },
          create: {
            email: user.email,
            name: user.name,
            password: passwordHash,
            isAdmin: user.isAdmin,
          },
        });
      })
    );

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Failed to create demo users", error);
    return NextResponse.json({ error: "Failed to create demo users" }, { status: 500 });
  }
}
