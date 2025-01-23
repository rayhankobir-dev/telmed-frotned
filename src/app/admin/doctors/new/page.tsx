"use client";
import api from "@/api";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile number is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  title: Yup.string().required("Title is required"),
  specialization: Yup.string().required("Specialization is required"),
  experienceInYears: Yup.number()
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),
  education: Yup.string().required("Education is required"),
  degrees: Yup.string().required("Degrees is required"),
  charge: Yup.number()
    .min(0, "Charge cannot be negative")
    .required("Charge is required"),
  address: Yup.string().required("Address is required"),
});

const ProfessionalForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      dateOfBirth: "",
      title: "",
      specialization: "",
      experienceInYears: "",
      education: "",
      degrees: "",
      charge: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/users/add-doctor", values);
        toast.success("Doctor added successfully");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Error adding doctor");
      }
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Doctor</h1>
        <p>Please fill the form below to add a doctor</p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="grid md:grid-cols-2 gap-3 p-6 border rounded-lg shadow"
      >
        <div>
          <Label className="font-semibold mb-1" htmlFor="firstName">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="lastName">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="mobile">
            Mobile
          </Label>
          <Input
            id="mobile"
            name="mobile"
            type="text"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.mobile && formik.errors.mobile
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="dateOfBirth">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{formik.errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="title">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="specialization">
            Specialization
          </Label>
          <Input
            id="specialization"
            name="specialization"
            type="text"
            value={formik.values.specialization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.specialization && formik.errors.specialization
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.specialization && formik.errors.specialization && (
            <p className="text-red-500 text-sm">
              {formik.errors.specialization}
            </p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="experienceInYears">
            Experience (in Years)
          </Label>
          <Input
            id="experienceInYears"
            name="experienceInYears"
            type="number"
            value={formik.values.experienceInYears}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.experienceInYears &&
              formik.errors.experienceInYears
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.experienceInYears &&
            formik.errors.experienceInYears && (
              <p className="text-red-500 text-sm">
                {formik.errors.experienceInYears}
              </p>
            )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="education">
            Education
          </Label>
          <Input
            id="education"
            name="education"
            type="text"
            value={formik.values.education}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.education && formik.errors.education
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.education && formik.errors.education && (
            <p className="text-red-500 text-sm">{formik.errors.education}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="degrees">
            Degrees
          </Label>
          <Input
            id="degrees"
            name="degrees"
            type="text"
            value={formik.values.degrees}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.degrees && formik.errors.degrees
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.degrees && formik.errors.degrees && (
            <p className="text-red-500 text-sm">{formik.errors.degrees}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="charge">
            Charge
          </Label>
          <Input
            id="charge"
            name="charge"
            type="number"
            value={formik.values.charge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.charge && formik.errors.charge
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.charge && formik.errors.charge && (
            <p className="text-red-500 text-sm">{formik.errors.charge}</p>
          )}
        </div>

        <div>
          <Label className="font-semibold mb-1" htmlFor="address">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          className="h-fit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfessionalForm;
