import { Amenity } from "./Amenity";

type ProjectType = "ongoing" | "upcoming" | "completed";

export interface Section {
  sectionId: string;
  name: string;
  type: "Buildings" | "row house" | "other";
}

export interface ProjectMini {
  _id: string;
  name: string;
  images: string[];
  state: string;
  city: string;
  area: string;
  projectType: ProjectType;
  section: Section[];
}

export interface Project {
  _id: string;
  name: string;
  images: string[];
  state: string;
  city: string;
  area: string;
  address: string;
  description: string;
  projectType: string;
  longitude: number;
  latitude: number;
  section: Section[];
  amenities: Amenity[];
}
