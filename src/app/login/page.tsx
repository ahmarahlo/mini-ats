"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success("Successfully logged in", {
      description: `Welcome back, ${data.email}`,
    });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        {/* App name */}
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-tight text-zinc-100">
            HireFlow
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100">
            Sign in to your account
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Enter your credentials to continue.
          </p>
        </div>

        {/* Form box */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-zinc-400"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                disabled={loading}
                aria-invalid={!!errors.email}
                className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-0"
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-zinc-400"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
                aria-invalid={!!errors.password}
                className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-0"
                {...register("password")}
              />
              {errors.password && (
                <p role="alert" className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              id="login-submit"
              type="submit"
              className="mt-1 w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing in…
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Any valid email and password will work — dummy auth.
        </p>
      </div>
    </div>
  );
}
