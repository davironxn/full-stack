"use client";

import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/register-form";

function RegisterContent() {
  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-semibold">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  // ✅ Wrap in Suspense to handle useSearchParams safely
  return (
    <Suspense fallback={<div>Loading registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
