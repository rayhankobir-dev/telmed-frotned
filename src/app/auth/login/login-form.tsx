"use client";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { AppLogoIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, PhoneIcon } from "lucide-react";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

function LoginForm() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full min-h-screen lg:max-w-xl flex items-center justify-center bg-primary/5 py-6 px-6 lg:px-10 xl:px-12"
      >
        <div className="h-fit space-y-5">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
              <AppLogoIcon />
              <h1 className="font-bold text-3xl text-primary">MedInfo</h1>
            </div>
            <h1 className="font-bold text-3xl opacity-90 mb-1">
              Login Your Account
            </h1>
            <p className="font-light">
              Before perform any action, please login by providing your
              credentials
            </p>
          </div>

          <div className="flex flex-col gap-1 py-5">
            <button
              type="button"
              className="space-y-1 border rounded-md">
              Google
            </button>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  id="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 border-primary/40"
                  placeholder="Enter your mobile number"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  id="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                  className="pl-10 border-primary/40"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <p className="py-2.5 font-medium text-sm">
              By continuing you agree to Terms & Conditions, Privacy Policy &
              Refund-Return Policy
            </p>

            <Button className="w-full h-12">Sign In</Button>

            <div className="flex items-center justify-center mt-3">
              <p className="py-2.5 font-medium text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/signup" className="text-primary font-semibold">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}

export default LoginForm;
