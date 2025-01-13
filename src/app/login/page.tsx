/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AppLogoIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon } from "lucide-react";
import Spinner from "@/components/common/spinner";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

function LoginPage() {
  const { loading, login, isAuthenticated } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await login(values.email, values.password);
        const { user } = res.data;
        toast.success("Login successful");

        if (user.role === "ADMIN") {
          window.location.href = "/admin";
        } else if (user.role === "DOCTOR") {
          window.location.href = "/";
        } else {
          window.location.href = "/";
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "Login failed try again");
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-4 p-6 border rounded-xl">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <AppLogoIcon />
            <h1 className="font-bold text-3xl text-primary">MedInfo</h1>
          </div>
          <h1 className="font-bold text-2xl">Login to Your Account</h1>
          <p className="text-gray-600">
            Access your orders, special offers, health tips, and more!
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="pl-10 border-primary/40"
                placeholder="Enter your email address"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                placeholder="Enter your password"
                className="pl-10 border-primary/40"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <p className="py-2.5 font-medium text-sm text-center">
            By continuing, you agree to our{" "}
            <span className="text-primary font-semibold">
              Terms & Conditions, Privacy Policy & Refund Policy
            </span>
          </p>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full h-12">
            {loading ? <Spinner size={20} /> : "Sign In"}
          </Button>
        </form>

        <div>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
