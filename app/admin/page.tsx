import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/mvpblocks";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in?callbackUrl=/admin");
  }

  const isAdmin = Boolean((session.user as any)?.isAdmin);
  if (!isAdmin) {
    redirect("/user");
  }

  return <AdminDashboard />;
}
