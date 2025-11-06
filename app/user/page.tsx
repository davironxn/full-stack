import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { UserDashboardShell } from "@/components/user/user-dashboard-shell";

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in?callbackUrl=/user");
  }

  return <UserDashboardShell user={session.user} />;
}
