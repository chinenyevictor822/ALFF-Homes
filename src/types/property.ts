export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceValue: number; // numeric value for client-side sorting and filtering
  type: "Pavilion" | "Villa" | "Atrium";
  status: "Available" | "Private Reserve";
  description: string;
  bedrooms: number;
  bathrooms: number;
  size: string; // e.g. "720 sqm"
  imageUrl: string;
  highlights: string[];
  amenities: string[];
  specs: { [key: string]: string };
}
