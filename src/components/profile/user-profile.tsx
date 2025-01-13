/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import api from "@/api";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

type UserRole = "USER" | "DOCTOR" | "ADMIN";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: string;
  address: string;
  image?: string;
  title?: string;
  specialization?: string;
  experienceInYears?: number;
  education?: string;
  degrees?: string;
  charge?: number;
}

const validationSchema = (role: UserRole) => {
  const baseSchema = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    mobile: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
  };

  if (role === "DOCTOR") {
    return Yup.object({
      ...baseSchema,
      title: Yup.string().required("Title is required"),
      specialization: Yup.string().required("Specialization is required"),
      experienceInYears: Yup.number()
        .required("Experience is required")
        .min(0, "Experience cannot be negative"),
      education: Yup.string().required("Education is required"),
      degrees: Yup.string().required("Degrees are required"),
      charge: Yup.number()
        .required("Charge is required")
        .min(0, "Charge cannot be negative"),
    });
  }

  return Yup.object(baseSchema);
};

const ProfileInfo: React.FC = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(
    user?.image || "/placeholder.svg?height=100&width=100"
  );
  const role = user?.role || "USER";

  const formik = useFormik<ProfileFormData>({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dateOfBirth: user?.dateOfBirth || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
      ...(role === "DOCTOR"
        ? {
            title: user?.title || "",
            specialization: user?.specialization || "",
            experienceInYears: user?.experienceInYears || 0,
            education: user?.education || "",
            degrees: user?.degrees || "",
            charge: user?.charge || 0,
          }
        : {}),
    },
    validationSchema: validationSchema(role),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = { ...values, image: profileImage };
        await api.put("/users/profile", formData);
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      }
      setSubmitting(false);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profileImage} alt="Profile picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <>
              <Label
                htmlFor="image"
                className="border border-dashed p-2.5 px-4 rounded-md border-primary"
              >
                Upload Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-fit sr-only"
              />
            </>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email", type: "email" },
              { label: "Date of Birth", name: "dateOfBirth", type: "date" },
              { label: "Mobile", name: "mobile", type: "tel" },
            ].map(({ label, name, type = "text" }: any) => (
              <div key={name} className="space-y-1">
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  {...formik.getFieldProps(name)}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <p className="text-red-500 text-sm">{formik.errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          {role === "DOCTOR" && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: "Title", name: "title" },
                { label: "Specialization", name: "specialization" },
                {
                  label: "Experience (Years)",
                  name: "experienceInYears",
                  type: "number",
                },
                { label: "Education", name: "education" },
                { label: "Degrees", name: "degrees" },
                { label: "Charge ($)", name: "charge", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="space-y-1">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    {...formik.getFieldProps(name)}
                  />
                  {formik.touched[name] && formik.errors[name] && (
                    <p className="text-red-500 text-sm">
                      {formik.errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              className="h-20"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
