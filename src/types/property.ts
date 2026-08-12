export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  size: string; // e.g. "720 sqm"
  imageUrl: string;
  highlights: string[];
  specs: { [key: string]: string };
}
