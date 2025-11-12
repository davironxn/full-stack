"use client";

import { useState, type ComponentProps } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const toast = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // client-side validation to avoid empty submissions
    if (!email || !password) {
      const msg = "Please enter both email and password.";
      setError(msg);
      toast.push({ title: "Missing fields", description: msg, variant: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (response?.error) {
        // map common next-auth error to friendly message
        const err = response.error;
        const friendly = err === "CredentialsSignin" ? "Incorrect sign-in details" : err;
        setError(friendly);
        toast.push({ title: "Sign in failed", description: friendly, variant: "error" });
        return;
      }

      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();
      const destination = callbackUrl ?? "/home";

      router.replace(destination);
      router.refresh();
    } catch (submitError: any) {
      setError(submitError?.message ?? "Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleProviderSignIn(provider: string) {
    void signIn(provider, { callbackUrl: callbackUrl ?? "/dashboard" });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in with a connected account or your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field className="grid gap-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleProviderSignIn("github")}
                  className="h-11"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.69-3.88-1.37-3.88-1.37-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.17.9-.25 1.86-.38 2.82-.38.96 0 1.93.13 2.83.38 2.15-1.47 3.1-1.17 3.1-1.17.61 1.56.23 2.71.11 3 .73.8 1.16 1.82 1.16 3.07 0 4.41-2.69 5.38-5.25 5.67.42.37.8 1.09.8 2.2 0 1.59-.02 2.87-.02 3.26 0 .31.21.68.8.56C20.21 21.4 23.5 17.09 23.5 12 23.5 5.65 18.35.5 12 .5Z"
                    />
                  </svg>
                  Login with GitHub
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => handleProviderSignIn("google")}
                  className="h-11"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48Z"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator>Or continue with</FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="h-11" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in…" : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
                </FieldDescription>
                {error ? (
                  <FieldDescription role="alert" className="text-center text-destructive">
                    {error}
                  </FieldDescription>
                ) : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a className="underline" href="#">Terms of Service</a> and
        <a className="ml-1 underline" href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
