"use client";
import * as Yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AppLogoIcon } from "@/assets/icons";
import { LockIcon, PhoneIcon } from "lucide-react";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

function LoginForm() {
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Enter a valid mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    mobile: "",
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
      <form onSubmit={formik.handleSubmit} className="flex-1 px-5">
        <DialogHeader>
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
            <AppLogoIcon />
            <h1 className="font-bold text-3xl text-primary">MedInfo</h1>
          </div>
          <DialogTitle className="text-2xl">Sign In</DialogTitle>
          <DialogDescription>
            Login to make an order, access your orders, special offers, health
            tips, and more!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1 py-5">
          <div className="space-y-1">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="email"
                type="email"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                className="pl-10 border-primary/40"
                placeholder="Enter your mobile number"
              />
            </div>
            <ErrorMessage
              name="mobile"
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
        </div>
      </form>
    </FormikProvider>
  );
}

export default LoginForm;
