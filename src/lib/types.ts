
export type UserRole = "farmer" | "agent" | "government" | "bank";

export interface User {
  id: number;
  role: UserRole;
  name: string;
  phone: string;
  password?: string;
  region?: string;
}

export interface Crop {
  id: number;
  name: string;
  description: string;
  ideal_temperature: string;
  soil_type: string;
  rainfall: string;
  fertilizers: string[];
  diseases: string[];
  pest_control: string[];
}

export interface Soil {
  id: number;
  name: string;
  description: string;
  recommended_crops: string[];
}

export interface Fertilizer {
  id: number;
  name: string;
  composition: string;
  suitable_for: string[];
}

export interface MandiPrice {
  id: number;
  crop: string;
  region: string;
  min_price: number;
  max_price: number;
  date: string;
}

export interface Weather {
  id: number;
  district: string;
  temperature: string;
  humidity: string;
  rainfall_probability: string;
  alerts: string[];
}

export interface FarmerProfile {
  id: number;
  name: string;
  phone: string;
  region: string;
  issues: string[];
  last_visit?: string | null;
  profile_score?: number;
}

export interface LoanApplication {
  id: number;
  farmerId: number;
  farmerName: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  creditScore: number;
  landDocumentsUrl: string;
  comments?: string;
  date: string;
}

export interface GovernmentScheme {
    id: number;
    title: string;
    description: string;
    eligibility: string;
    link: string;
}
