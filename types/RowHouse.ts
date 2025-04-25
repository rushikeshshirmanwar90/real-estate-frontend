import { Amenity } from "./Amenity";

export interface RowHouse {
  _id: string;
  name: string;
  description: string;
  images: string[];
  totalHouse: number;
  bookedHouse: number;
  area: number;
  projectId: string;
  amenities: Amenity[];
}
