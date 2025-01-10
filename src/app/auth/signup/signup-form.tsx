"use client";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { AppLogoIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, PhoneIcon } from "lucide-react";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

function SignupForm() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    fullName: Yup.string().required("Full name is required"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full lg:max-w-xl min-h-screen flex items-center justify-center bg-primary/5 py-6 px-6 lg:px-10 xl:px-12"
      >
        <div className="h-fit space-y-5">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
              <AppLogoIcon />
              <h1 className="font-bold text-3xl text-primary">MedInfo</h1>
            </div>
            <h1 className="font-bold text-3xl opacity-90">
              Signup Your Account
            </h1>
            <p className="font-light">
              Before perform any action, please login by providing your
              credentials
            </p>
          </div>

          <div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary text-primary mt-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="-3 0 262 262"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="flex flex-col gap-1 py-5">
            <div className="space-y-1">
              <Label htmlFor="fullName">Full name</Label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <Input
                  id="fullName"
                  type="text"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pl-10 border-primary/40"
                  placeholder="Enter your full name"
                />
              </div>
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

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

            <Button className="w-full h-12">Sign up</Button>

            <div className="flex items-center justify-center mt-3">
              <p className="py-2.5 font-medium text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="text-primary font-semibold">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}

export default SignupForm;
