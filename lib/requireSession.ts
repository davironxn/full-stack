import { getToken } from "next-auth/jwt";

/**
 * Call from a server API route to assert an authenticated session.
 * Returns token payload or throws an Error when unauthorized.
 */
export async function requireServerSession(request: Request) {
  const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const e: any = new Error("Unauthorized");
    e.status = 401;
    throw e;
  }
  return token;
}