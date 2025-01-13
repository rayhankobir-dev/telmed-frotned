export interface Medicine {
  _id?: string;
  slug: string;
  name: string;
  strength: string;
  dosageForm: string;
  generic: string;
  company: string;
  price: number;
  discountPercentage: number;
  unit: string;
  image: string;
  description: string;
  indication: string;
  sideEffects: string;
  precautions: string;
  contraindications: string;
  pharmachology: string;
  storage: string;
  dosage: string;
  pregnancy: string;
  disclaimer: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "USER";
  mobile?: string;
  image?: string;
  dateOfBirth?: string;
  age?: number;
  gender?: string;
  address?: string;
  title?: string;
  specialization?: string;
  experienceInYears?: number;
  education?: string;
  degrees?: number;
  charge?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor extends User {
  title: string;
  specialization: string;
  experienceInYears: number;
  education: string;
  degrees: number;
  charge: number;
}
