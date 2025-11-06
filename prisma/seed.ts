import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    },
  });

  await prisma.project.createMany({
    data: [
      {
        slug: "portfolio",
        title: "Portfolio Website",
        description: "My modern portfolio built with Next.js, Neon, and Prisma.",
        tags: "Next.js, Prisma, Neon",
        url: "https://zany-waffle-g4vwqrpqxqj9cww6x-3000.app.github.dev",
      },
      {
        slug: "ai-dashboard",
        title: "AI Dashboard",
        description: "An admin dashboard powered by AI and Next.js.",
        tags: "AI, Admin, Dashboard",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


