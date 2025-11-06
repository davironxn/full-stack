import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

import { authOptions } from "@/lib/authOptions";

export async function requireUser(callbackPath: string): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);

  if (!session) {
    const encoded = encodeURIComponent(callbackPath);
    redirect(`/sign-in?callbackUrl=${encoded}`);
  }

  return session.user;
}
