import { Amenity } from "./Amenity";
import { FlatInfo } from "./Flat";

export interface BuildingSection {
  name: string;
  description: string;
  images: string[];
}

export interface Building {
  _id: string;
  name: string;
  description: string;
  area: number;
  projectId: string;
  images: string[];
  section: BuildingSection[];
  flatInfo: FlatInfo[];
  amenities: Amenity[];
}
