import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/authOptions";
import LoginFormHero from "@/components/mvpblocks/login-form-3";

export const metadata = {
  title: "Home",
  description: "Access your personalized dashboards and workspaces",
};

export default async function AuthenticatedHomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = session.user as typeof session.user & { isAdmin?: boolean | null };
    const isAdmin = Boolean(user?.isAdmin);

    if (isAdmin) {
      redirect("/admin");
    }

    redirect("/user");
  }

  return <LoginFormHero />;
}
