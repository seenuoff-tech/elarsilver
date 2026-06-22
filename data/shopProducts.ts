export interface RingGeometryConfig {
  radius: number;
  tubularRadius: number;
  radialSegments: number;
  tubularSegments: number;
  hasDiamonds: boolean;
  diamondCount: number;
  diamondSize: number;
  diamondLayout: 'solitaire' | 'halo' | 'pave' | 'none';
  twist: boolean;
  facets: boolean;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: string;
  tagline: string;
  description: string;
  hallmark: string;
  sizes: string[];
  specs: { label: string; value: string }[];
  details: string[];
  colorTheme: string;
  ringGeometry: RingGeometryConfig;
}

export const shopProducts: ShopProduct[] = [
  // Collection 1: Signature Rings
  {
    id: "signature-ring",
    name: "ELARA Signature Ring",
    category: "Rings",
    collection: "Signature Rings",
    price: "₹4,999",
    tagline: "Forged in Elegance. Crafted to Shine.",
    description: "An iconic masterpiece crafted in solid 925 sterling silver, capturing the fluid essence of molten metal with a row of micro-pave crystals.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Rhodium Chrome" },
      { label: "Width", value: "6.5 mm" },
      { label: "Weight", value: "8.4 Grams" }
    ],
    details: [
      "Crafted in solid sterling silver with 92.5% purity",
      "High-pressure rhodium electroplating prevents oxidation and maintains luster",
      "Individually hand-polished to a clean mirror finish",
      "Comfort-fit inside rounding for seamless daily wear"
    ],
    colorTheme: "#C0C0C0",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.28,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 8,
      diamondSize: 0.08,
      diamondLayout: 'pave',
      twist: false,
      facets: false
    }
  },
  {
    id: "eternal-loop",
    name: "Eternal Loop Ring",
    category: "Rings",
    collection: "Signature Rings",
    price: "₹5,499",
    tagline: "Infinite Curves. Unbroken Luster.",
    description: "Inspired by the mathematical beauty of the Mobius strip, representing endless connections and eternal loops of silver reflection.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Platinum Coating" },
      { label: "Width", value: "5.8 mm" },
      { label: "Weight", value: "7.9 Grams" }
    ],
    details: [
      "Features a Mobius loop twist that symbolizes infinity",
      "Micro-pave diamonds are set on a single continuous edge",
      "Crafted with hypoallergenic alloys, 100% nickel-free",
      "Comes in a black velvet-lined luxury gift box"
    ],
    colorTheme: "#E5E4E2",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.24,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 12,
      diamondSize: 0.06,
      diamondLayout: 'pave',
      twist: true,
      facets: false
    }
  },

  // Collection 2: Silver Bands
  {
    id: "classic-band",
    name: "Classic Silver Band",
    category: "Rings",
    collection: "Silver Bands",
    price: "₹2,999",
    tagline: "Pure Simplicity. Timeless Silhouette.",
    description: "A thick, heavy silver band with flat edges and a polished mirror finish. The quintessential luxury band built for understated elegance.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Heavy Rhodium" },
      { label: "Width", value: "7.0 mm" },
      { label: "Weight", value: "9.2 Grams" }
    ],
    details: [
      "Classic minimalist design with flat outer wall and curved interior",
      "Heaviest band in our collection, designed for a substantial finger feel",
      "Rhodium barrier prevents tarnish and provides a dark white chrome luster",
      "Ideal for engravings on the inner band"
    ],
    colorTheme: "#B3B3B3",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.32,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: false,
      diamondCount: 0,
      diamondSize: 0,
      diamondLayout: 'none',
      twist: false,
      facets: false
    }
  },
  {
    id: "fluid-wave-band",
    name: "Fluid Wave Band",
    category: "Rings",
    collection: "Silver Bands",
    price: "₹3,499",
    tagline: "Liquid Metal. Fluid Motion.",
    description: "A wavy, undulating silver band designed to look like liquid metal solidified mid-motion. Fuses organic style with premium geometry.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Liquid Chrome Coating" },
      { label: "Width", value: "6.0 mm (Variable)" },
      { label: "Weight", value: "8.1 Grams" }
    ],
    details: [
      "Organic wavy silhouette that shifts in width around the finger",
      "Polished to a high-speed liquid shine reflecting environment highlights",
      "Inner surface is comfort-ground for an absolute perfect fit",
      "A unisex jewelry piece that makes an organic design statement"
    ],
    colorTheme: "#C8C8C8",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.26,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: false,
      diamondCount: 0,
      diamondSize: 0,
      diamondLayout: 'none',
      twist: true,
      facets: false
    }
  },

  // Collection 3: Luxury Engagement Collection
  {
    id: "crown-solitaire",
    name: "Crown Solitaire Ring",
    category: "Rings",
    collection: "Luxury Engagement Collection",
    price: "₹8,999",
    tagline: "A Single Flame. Crowned in Silver.",
    description: "A stunning 2-carat lab-grown diamond sits centered on a slender silver band, held securely by a royal six-prong crown setting.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Platinum Electroplate" },
      { label: "Center Stone", value: "2.0 Carat Lab Diamond" },
      { label: "Weight", value: "6.8 Grams" }
    ],
    details: [
      "2-carat round brilliant-cut lab-grown diamond center stone",
      "Six-prong crown setting maximizes light entry and crystal fire",
      "Ultra-slender band highlights the diamond size and presence",
      "IGI Certified diamond certificate card included with order"
    ],
    colorTheme: "#F0F0F0",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.20,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 1,
      diamondSize: 0.35,
      diamondLayout: 'solitaire',
      twist: false,
      facets: false
    }
  },
  {
    id: "halo-diamond-ring",
    name: "Halo Diamond Ring",
    category: "Rings",
    collection: "Luxury Engagement Collection",
    price: "₹9,499",
    tagline: "Surrounded by Light. Enveloped in Luster.",
    description: "A breathtaking halo design. A sparkling cushion-cut center stone is encircled by a glowing constellation of micro-pavé diamonds.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Platinum Electroplate" },
      { label: "Center Stone", value: "1.8 Carat cushion Diamond" },
      { label: "Weight", value: "7.2 Grams" }
    ],
    details: [
      "Encircles a central cushion-cut stone with 16 micro-pavé diamonds",
      "Pavé diamond band extends halfway down the ring shank",
      "Low-profile basket setting keeps the ring close to the finger for comfort",
      "Offers maximum brilliance and refraction matching royal settings"
    ],
    colorTheme: "#ECEFF1",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.22,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 9,
      diamondSize: 0.12,
      diamondLayout: 'halo',
      twist: false,
      facets: false
    }
  },

  // Collection 4: Diamond Silver Collection
  {
    id: "pave-star-ring",
    name: "Pavé Star Ring",
    category: "Rings",
    collection: "Diamond Silver Collection",
    price: "₹6,999",
    tagline: "A Constellation at Your Fingertip.",
    description: "A wide, flat band encrusted with three rows of staggered micro-pavé lab diamonds. Glimmers like a starry sky under spotlights.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Rhodium Coating" },
      { label: "Stones", value: "48 Micro-Pavé Diamonds" },
      { label: "Weight", value: "8.8 Grams" }
    ],
    details: [
      "Encrusted with 48 hand-set brilliant lab-grown crystals",
      "Staggered pave settings cover the upper surface completely",
      "Polished side walls create a dark contrasting frame",
      "Features a solid back-plate for a dense luxury feel"
    ],
    colorTheme: "#D0D0D0",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.30,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 16,
      diamondSize: 0.08,
      diamondLayout: 'pave',
      twist: false,
      facets: false
    }
  },
  {
    id: "diamond-horizon",
    name: "Diamond Horizon Ring",
    category: "Rings",
    collection: "Diamond Silver Collection",
    price: "₹7,499",
    tagline: "Cross-Over Silhouettes. Layered Luster.",
    description: "A double-banded crossover ring representing intersecting paths, with one band in high-polish silver and the other encrusted in diamonds.",
    hallmark: "BIS 925 Hallmark Certified",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Platinum Coat" },
      { label: "Stones", value: "24 Micro-Pavé Diamonds" },
      { label: "Weight", value: "8.2 Grams" }
    ],
    details: [
      "Intersecting double-layer design creating a floating layered look",
      "One plain polished band and one pavé set diamond band",
      "Seamlessly welded at the base for durability and fit",
      "Rhodium-treated to protect the diamond settings"
    ],
    colorTheme: "#E0E0E0",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.25,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 10,
      diamondSize: 0.07,
      diamondLayout: 'pave',
      twist: true,
      facets: false
    }
  },

  // Collection 5: Limited Edition Collection
  {
    id: "molten-silver-band",
    name: "Molten Silver Band",
    category: "Rings",
    collection: "Limited Edition Collection",
    price: "₹11,999",
    tagline: "Atelier Hand-Sculpted. Raw Luxury.",
    description: "A hand-carved, raw faceted ring displaying an organic, uneven surface reminiscent of freshly cast molten silver. Limited to 100 units.",
    hallmark: "Assay Office Certified & Numbered",
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Finish", value: "Faceted/Organic Polish" },
      { label: "Width", value: "6.8 mm (Uneven)" },
      { label: "Edition Size", value: "100 Numbered Pieces" }
    ],
    details: [
      "Limited edition run of 100 hand-numbered pieces",
      "Each ring is individually faceted by hand, making no two identical",
      "Uncoated, natural high-grade sterling silver that develops a unique patina",
      "Includes premium numbered certificate and custom mahogany presentation box"
    ],
    colorTheme: "#9E9E9E",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.32,
      radialSegments: 8, // Flat facets
      tubularSegments: 16, // Low segments create crystal block look
      hasDiamonds: false,
      diamondCount: 0,
      diamondSize: 0,
      diamondLayout: 'none',
      twist: false,
      facets: true
    }
  },
  {
    id: "nebula-eclipse",
    name: "Nebula Eclipse Ring",
    category: "Rings",
    collection: "Limited Edition Collection",
    price: "₹12,499",
    tagline: "Black Ruthenium. A Dark Eclipse.",
    description: "An extraordinary black ruthenium-plated silver band containing a single bezel-set 0.5-carat black diamond. Sleek, stealthy, and elite.",
    hallmark: "Assay Office Certified & Numbered",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Plating", value: "Black Ruthenium Chrome" },
      { label: "Center Stone", value: "0.5 Carat Black Diamond" },
      { label: "Edition Size", value: "100 Numbered Pieces" }
    ],
    details: [
      "Plated in ultra-rare black ruthenium, yielding a dark gunmetal chrome finish",
      "Bezel-set round brilliant black diamond (0.5 carats)",
      "Stealth styling featuring laser-engraved edition numbers (e.g. 03/100)",
      "Hypoallergenic carbon barrier protects the plating"
    ],
    colorTheme: "#212121",
    ringGeometry: {
      radius: 1.4,
      tubularRadius: 0.28,
      radialSegments: 32,
      tubularSegments: 64,
      hasDiamonds: true,
      diamondCount: 1,
      diamondSize: 0.22,
      diamondLayout: 'solitaire', // Black center diamond
      twist: false,
      facets: false
    }
  }
];
