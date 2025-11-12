import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@localhost";
  const adminPassword = process.env.ADMIN_PASSWORD || "Passw0rd!";

  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin User",
      email: adminEmail,
      password: hashed,
      isAdmin: true,
      emailVerified: new Date(),
    },
  })

  console.log("✅ Admin seeded:", adminEmail)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
