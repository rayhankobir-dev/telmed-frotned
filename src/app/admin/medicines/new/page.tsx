/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "@/api";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  strength: Yup.string().required("Strength is required"),
  generic: Yup.string().required("Generic name is required"),
  dosageForm: Yup.string().required("Dosage form is required"),
  company: Yup.string().required("Company is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  discountPercentage: Yup.number()
    .min(0)
    .max(100, "Discount cannot exceed 100%"),
  unit: Yup.string().required("Unit is required"),
  image: Yup.string()
    .url("Invalid URL format")
    .required("Image URL is required"),
  description: Yup.string().required("Description is required"),
  indication: Yup.string(),
  sideEffects: Yup.string(),
  precautions: Yup.string(),
  contraindications: Yup.string(),
  pharmachology: Yup.string(),
  storage: Yup.string(),
  dosage: Yup.string(),
  pregnancy: Yup.string(),
  disclaimer: Yup.string(),
});

function AddMedicine({ initial }: any) {
  const formik = useFormik({
    initialValues: {
      name: initial?.name || "",
      strength: initial?.strength || "",
      generic: initial?.generic || "",
      dosageForm: initial?.dosageForm || "",
      company: initial?.company || "",
      price: initial?.price || "",
      discountPercentage: initial?.discountPercentage || "0",
      unit: initial?.unit || "",
      image: initial?.image || "",
      description: initial?.description || "",
      indication: initial?.indication || "",
      sideEffects: initial?.sideEffects || "",
      precautions: initial?.precautions || "",
      contraindications: initial?.contraindications || "",
      pharmachology: initial?.pharmachology || "",
      storage: initial?.storage || "",
      dosage: initial?.dosage || "",
      pregnancy: initial?.pregnancy || "",
      disclaimer: initial?.disclaimer || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (initial) {
          await api.put(`/medicines/${initial._id}`, values);
          toast.success("Medicine updated successfully");
          resetForm();
          return;
        } else {
          await api.post("/medicines", values);
          resetForm();
          toast.success("Medicine added successfully");
        }
      } catch (error) {
        toast.error("Error while submitting form");
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {initial ? "Edit" : "Add"} Medicine
        </h2>
        <p>All fields are required</p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="grid md:grid-cols-2 gap-4 space-y-4"
      >
        {Object.keys(formik.initialValues).map((key) => (
          <div key={key}>
            <Label htmlFor={key} className="block mb-1 font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </Label>
            {key === "description" ||
            key === "indication" ||
            key === "sideEffects" ||
            key === "precautions" ||
            key === "contraindications" ||
            key === "pharmachology" ||
            key === "storage" ||
            key === "dosage" ||
            key === "pregnancy" ||
            key === "disclaimer" ? (
              <Textarea
                id={key}
                name={key}
                value={(formik.values as any)[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <Input
                id={key}
                name={key}
                type={
                  key === "price" || key === "discountPercentage"
                    ? "number"
                    : "text"
                }
                value={(formik.values as any)[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
            {formik.touched[key as keyof typeof formik.values] &&
              formik.errors[key as keyof typeof formik.values] && (
                <p className="text-red-500 text-sm">
                  {formik.errors[key as any]}
                </p>
              )}
          </div>
        ))}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddMedicine;
