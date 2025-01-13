/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { useState } from "react";
import * as Yup from "yup";
import api from "@/api";

export function UploadPrescription({ children }: any) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed().required("Prescription image is required"),
  });

  const classifier = (predictions: any) => {
    const medicines = [];

    for (const prediction of predictions) {
      medicines.push(prediction.class);
    }
    return Array.from(new Set(medicines));
  };

  const handleUpload = async (values: any) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", values.file);

    try {
      const response = await fetch(
        "https://detect.roboflow.com/automation-of-doctors-prescription-s-image-2/1?api_key=uATkLzHtsidA93jhazpg&confidence=40&overlap=30&format=json",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const medicines = classifier(data.predictions || []);

      await api.post("/prescriptions", {
        title: values.title,
        description: values.description,
        medicines,
      });

      toast.success("Prescription saved!");
      setOpen(false);
    } catch (error) {
      console.error("Error uploading prescription:", error);
      toast.error("Failed to process the prescription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🔖 Upload Your Prescription</AlertDialogTitle>
          <AlertDialogDescription>
            Please upload a prescription image along with the required details.
            <p className="text-sm text-primary">
              System might give you wrong results, please check medicines
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <section>
          <Formik
            initialValues={{ title: "", description: "", file: null }}
            validationSchema={validationSchema}
            onSubmit={handleUpload}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col gap-3">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Field as={Input} name="title" type="text" />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Field as={Input} name="description" type="text" />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Label
                    className="h-16 w-full flex items-center justify-center p-4 border border-dashed border-primary/50 rounded-md cursor-pointer"
                    htmlFor="file"
                  >
                    Upload Prescription (JPG, PNG)
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    className="sr-only"
                    onChange={(event) => {
                      const files = event.currentTarget.files;
                      if (files) {
                        setFieldValue("file", files[0]);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="file"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isSubmitting}>
                    Cancel
                  </AlertDialogCancel>
                  <Button type="submit" disabled={isSubmitting || isLoading}>
                    {isSubmitting || isLoading
                      ? "Uploading..."
                      : "Upload & Save"}
                  </Button>
                </AlertDialogFooter>
              </Form>
            )}
          </Formik>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
}
