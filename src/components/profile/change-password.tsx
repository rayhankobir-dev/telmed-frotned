/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { LockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/common/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post("/users/change-password", values);
        toast.success("Password changed successfully");
        resetForm();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Password change failed");
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="currentPassword"
                type="password"
                {...formik.getFieldProps("currentPassword")}
                className="pl-10 border-primary/40"
                required
              />
            </div>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <div className="text-sm text-red-500">
                  {formik.errors.currentPassword}
                </div>
              )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="newPassword"
                type="password"
                {...formik.getFieldProps("newPassword")}
                className="pl-10 border-primary/40"
                required
              />
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-sm text-red-500">
                {formik.errors.newPassword}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                className="pl-10 border-primary/40"
                required
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full h-12"
          >
            {formik.isSubmitting ? <Spinner size={20} /> : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
