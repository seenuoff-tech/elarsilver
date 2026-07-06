export interface ProductImage {
  url: string;
  alt: string;
}

export interface DetailedProduct {
  id: string | number;
  name: string;
  image: string;
  gallery: ProductImage[];
  rating: number;
  reviewsCount: number;
  oldPrice: number;
  newPrice: number;
  isBestSeller: boolean;
  material: string;
  finishes: { name: string; image: string }[];
  description: {
    inspiration: string;
    design: string;
  };
}

export const newArrivalsData: DetailedProduct[] = [
  {
    id: 1,
    name: "Sapphire Azure Ring",
    image: "/images/blue-ring.png",
    gallery: [
      { url: "/images/blue-ring.png", alt: "Sapphire Azure Ring 1" },
      { url: "/images/cat_rings.png", alt: "Sapphire Azure Ring 2" }
    ],
    rating: 4.9,
    reviewsCount: 320,
    oldPrice: 3999,
    newPrice: 1999,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/blue-ring.png" },
      { name: "Gold", image: "/images/cat_rings.png" }
    ],
    description: {
      inspiration: "Inspired by the deep blue depths of the ocean, capturing its majestic serenity.",
      design: "A classic cut sapphire zirconia surrounded by a halo of micro crystals."
    }
  },
  {
    id: 2,
    name: "Golden Star Constellation Necklace",
    image: "/images/cat_necklaces.png",
    gallery: [
      { url: "/images/cat_necklaces.png", alt: "Main View" },
      { url: "/images/cat_necklaces.png", alt: "Worn View" },
      { url: "/images/cat_necklaces.png", alt: "Detail View" }
    ],
    rating: 4.8,
    reviewsCount: 943,
    oldPrice: 5499,
    newPrice: 2999,
    isBestSeller: true,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Golden", image: "/images/cat_necklaces.png" },
      { name: "Silver", image: "/images/silver_necklace.png" },
      { name: "Rose Gold", image: "/images/cat_necklaces.png" }
    ],
    description: {
      inspiration: "The night sky devoid of any stars is unimaginable and incomplete. Likewise, your accessory collection, without this masterpiece, is missing its true shine.",
      design: "Features five delicately crafted star motifs interconnected on a shimmering cable chain."
    }
  },
  {
    id: 3,
    name: "Silver Link Bracelet",
    image: "/images/silver_bracelet.png",
    gallery: [
      { url: "/images/silver_bracelet.png", alt: "Main View" }
    ],
    rating: 4.9,
    reviewsCount: 450,
    oldPrice: 4299,
    newPrice: 2499,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/silver_bracelet.png" }
    ],
    description: {
      inspiration: "A tribute to unbreakable bonds and interconnected lives.",
      design: "Interlocking solid silver rings with a polished mirror finish."
    }
  },
  {
    id: 4,
    name: "Gold Pave Ring",
    image: "/images/cat_rings.png",
    gallery: [
      { url: "/images/cat_rings.png", alt: "Main View" }
    ],
    rating: 4.9,
    reviewsCount: 280,
    oldPrice: 3999,
    newPrice: 1999,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Gold", image: "/images/cat_rings.png" }
    ],
    description: {
      inspiration: "Golden hour encapsulated in a continuous band of light.",
      design: "A classic eternity band style completely encrusted with micro pave stones."
    }
  },
  {
    id: 5,
    name: "Minimalist Drop Necklace",
    image: "/images/category_necklace.png",
    gallery: [
      { url: "/images/category_necklace.png", alt: "Main View" }
    ],
    rating: 4.9,
    reviewsCount: 150,
    oldPrice: 2999,
    newPrice: 1499,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/category_necklace.png" }
    ],
    description: {
      inspiration: "The quiet elegance of a single raindrop.",
      design: "A delicate chain holding a solitary teardrop zircon."
    }
  },
  {
    id: 6,
    name: "Elegance Ring",
    image: "/images/hero2.png",
    gallery: [
      { url: "/images/hero2.png", alt: "Main View" }
    ],
    rating: 4.9,
    reviewsCount: 520,
    oldPrice: 4599,
    newPrice: 2299,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/hero2.png" }
    ],
    description: {
      inspiration: "A structural marvel balancing weight and delicate lines.",
      design: "Modern architectural lines fused with traditional setting techniques."
    }
  },
  {
    id: 7,
    name: "Silver Zircon Pendant with Link Chain",
    image: "/images/silver_necklace.png",
    gallery: [
      { url: "/images/silver_necklace.png", alt: "Main View" }
    ],
    rating: 4.8,
    reviewsCount: 474,
    oldPrice: 5799,
    newPrice: 2999,
    isBestSeller: false,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/silver_necklace.png" }
    ],
    description: {
      inspiration: "A timeless centerpiece that commands attention while remaining understated.",
      design: "A brilliant round-cut zircon set in a four-prong classic mount."
    }
  },
  {
    id: 8,
    name: "Star Drop Earrings",
    image: "/images/cat_earrings.png",
    gallery: [
      { url: "/images/cat_earrings.png", alt: "Main View" }
    ],
    rating: 4.9,
    reviewsCount: 610,
    oldPrice: 3499,
    newPrice: 1799,
    isBestSeller: true,
    material: "Pure 925 Silver",
    finishes: [
      { name: "Silver", image: "/images/cat_earrings.png" }
    ],
    description: {
      inspiration: "Falling stars caught just before they touch the earth.",
      design: "Dangling star motifs on secure lever-back clasps."
    }
  }
];
