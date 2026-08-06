"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center bg-muted/20 p-6">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="p-8">
            <div className="space-y-2 text-center mb-8">
              <h2 className="text-3xl font-bold">
                Welcome Back
              </h2>

              <p className="text-muted-foreground">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <Label>Email Address</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button className="w-full h-11">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Create Account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}