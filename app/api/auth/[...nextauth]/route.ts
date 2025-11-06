// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Initialize NextAuth with your configured options
const handler = NextAuth(authOptions);

// Export for both GET and POST (required for Next.js App Router)
export { handler as GET, handler as POST };
