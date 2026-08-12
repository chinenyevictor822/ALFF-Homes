import type { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: "obsidian-pavilion",
    title: "The Obsidian Pavilion",
    location: "Banana Island, Lagos",
    price: "₦ 1,850,000,000",
    description: "An architectural masterpiece defined by minimalist lines, custom volcanic stone walls, and floor-to-ceiling glass pavilions. Specifically engineered to capture the ocean breeze while maintaining ultimate private seclusion.",
    bedrooms: 5,
    bathrooms: 6,
    size: "850 sqm",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Waterfront views", "Private jetty", "Custom volcanic stonework", "12m cantilevered infinity pool"],
    specs: {
      "Architect": "Oluwaseun & Partners",
      "Structure": "Reinforced concrete, matte steel framing",
      "Finishes": "Imported grey basalt, premium local mahogany paneled ceilings",
      "Energy": "Fully integrated Tesla power-wall and solar tiles",
      "Climate Control": "Passive cross-ventilation system + central VRF"
    }
  },
  {
    id: "stone-canopy-villa",
    title: "The Stone & Canopy Villa",
    location: "GRA Phase 2, Port Harcourt",
    price: "₦ 1,200,000,000",
    description: "A sanctuary of peace designed around native tropical gardens and locally sourced stone canopies. Celebrating the fluid transition between interior living spaces and lush outdoor courtyards under deep timber eaves.",
    bedrooms: 4,
    bathrooms: 5,
    size: "720 sqm",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Central courtyard atrium", "Hand-carved slate walls", "Koi pond entry", "Double-height library lounge"],
    specs: {
      "Architect": "Studio PH-02",
      "Structure": "Monolithic poured concrete with load-bearing local stone",
      "Finishes": "Polished terrazzo floors, native oil-rubbed iroko screens",
      "Water": "Integrated dual-filtration and rainwater reclamation system",
      "Climate Control": "High thermal mass cooling + shaded double-skin facades"
    }
  },
  {
    id: "terracotta-atrium",
    title: "The Terracotta Atrium",
    location: "Old Ikoyi, Lagos",
    price: "₦ 2,100,000,000",
    description: "A bold homage to traditional West African earth-toned architecture, re-imagined for high-density contemporary urban luxury. Features a multi-layered clay facade and a stunning shaded inner atrium filled with native climbing palms.",
    bedrooms: 6,
    bathrooms: 7,
    size: "1,100 sqm",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Climatic double-facade", "Triple-height interior glass atrium", "Subterranean wine cellar", "Wellness pavilion and spa suite"],
    specs: {
      "Architect": "Adebayo Design Atelier",
      "Structure": "Hybrid steel frame with custom terracotta cladding panels",
      "Finishes": "Handmade clay plaster walls, white travertine bathrooms",
      "Acoustics": "Triple-glazed acoustic insulation panels",
      "Security": "Discrete, multi-layered biometric integration"
    }
  }
];
