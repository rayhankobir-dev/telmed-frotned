"use client";
import api from "@/api";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AppLogoIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon } from "lucide-react";

function SignupPage() {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/users", values);
        toast.success("Account created successfully!");
        window.location.href = "/login";
        formik.resetForm();
      } catch (error) {
        console.error("Error creating account:", error);
        toast.error("Failed to create account. Please try again.");
      }
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full space-y-4 p-6 border rounded-xl">
        {/* Logo and Heading */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <AppLogoIcon />
            <h1 className="font-bold text-3xl text-primary">MedInfo</h1>
          </div>
          <h1 className="font-bold text-2xl">Create Your Account</h1>
          <p className="text-gray-600">
            Access your orders, special offers, health tips, and more!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-1 grid grid-cols-2 gap-2 items-baseline">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                {...formik.getFieldProps("firstName")}
                placeholder="Enter your first name"
                className="border-primary/40"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-sm text-red-500">
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                {...formik.getFieldProps("lastName")}
                placeholder="Enter your last name"
                className="border-primary/40"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-sm text-red-500">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>
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

          <Button type="submit" className="w-full h-12">
            Sign Up
          </Button>
        </form>

        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
