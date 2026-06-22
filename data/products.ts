export interface ImageSequenceConfig {
  folder: string;
  frameCount: number;
  prefix: string;
  extension: string;
  zeroPadding: number;
}

export interface StorySection {
  title: string;
  subtitle: string;
  description: string;
}

export interface FeaturePoint {
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface CraftsmanshipSection {
  title: string;
  subtitle: string;
  description: string;
  features: FeaturePoint[];
}

export interface PuritySection {
  title: string;
  subtitle: string;
  description: string;
  features: FeaturePoint[];
}

export interface BuyNowSection {
  title: string;
  description: string;
  sizes: string[];
  specs: { label: string; value: string }[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: Stat[];
  storySections: StorySection[];
  craftsmanshipSection: CraftsmanshipSection;
  puritySection: PuritySection;
  buyNowSection: BuyNowSection;
  imageSequence: ImageSequenceConfig;
}

export const products: Product[] = [
  {
    id: "signature-ring",
    name: "ELARA Signature Ring",
    tagline: "Forged in Elegance. Crafted to Shine.",
    price: "₹4,999",
    description: "An iconic masterpiece crafted in solid 925 sterling silver, capturing the fluid essence of molten metal and the eternal brilliance of hand-set lab-grown diamonds.",
    folderPath: "/images/elara",
    themeColor: "#C0C0C0",
    gradient: "linear-gradient(135deg, #111111 0%, #C0C0C0 100%)",
    features: [
      "92.5% Pure Sterling Silver",
      "Liquid Chrome Metallic Finish",
      "Hand-polished Mirror Surface",
      "Ethically Sourced Luxury Materials"
    ],
    stats: [
      { label: "Purity", value: "925 Sterling" },
      { label: "Weight", value: "8.4 Grams" },
      { label: "Finish", value: "High Polish" },
      { label: "Setting", value: "Micro-Pave" }
    ],
    storySections: [
      {
        title: "Crafted Beyond Time",
        subtitle: "A Testament to Modern Artistry",
        description: "The ELARA Signature Ring transcends traditional boundaries, fusing digital precision with generational silver smithing techniques."
      },
      {
        title: "Pure Sterling Excellence",
        subtitle: "Uncompromising Quality and Luster",
        description: "Meticulously refined to achieve an ultra-reflective chrome finish that catches the light like molten starlight."
      },
      {
        title: "Designed to Captivate",
        subtitle: "A Silhouette of Fluid Motion",
        description: "Embodying a sweeping curved design that wraps around the finger, representing the flow of time and infinite elegance."
      },
      {
        title: "A Legacy You Wear",
        subtitle: "For the Discerning Connoisseur",
        description: "More than just an accessory; it is an extension of your identity, built to endure for generations to come."
      }
    ],
    craftsmanshipSection: {
      title: "Handcrafted Excellence",
      subtitle: "The Touch of Master Artisans",
      description: "Every ELARA piece is touched by master jewellers who have dedicated their lives to refining the art of silver craft. From the initial hand-carved wax model to the final high-speed buffing process, each step requires extraordinary patience and precision.",
      features: [
        {
          title: "Master Artisans",
          description: "Our silversmiths possess decades of collective experience working with high-grade precious metals."
        },
        {
          title: "Precision Finishing",
          description: "Every single angle and curve is polished under microscopes to guarantee a flawless mirror shine."
        },
        {
          title: "Intricate Stone Setting",
          description: "Stones are set by hand using micro-pave techniques to maximize light refraction and fire."
        }
      ]
    },
    puritySection: {
      title: "Certified 925 Sterling Silver",
      subtitle: "Guaranteed Quality and Integrity",
      description: "We use only the finest grade of sterling silver, containing 92.5% pure precious silver alloyed with 7.5% premium hardening metals. This ensures your jewellery retains its brilliance and resists wear over time.",
      features: [
        {
          title: "Hallmark Assurance",
          description: "Every piece features an laser-engraved '925' hallmark certifying its authenticity and composition."
        },
        {
          title: "Tarnish-Resistant Alloy",
          description: "Infused with high-grade anti-tarnish barriers that dramatically slow natural silver oxidation."
        },
        {
          title: "Hypoallergenic Comfort",
          description: "100% nickel-free and lead-free, making it completely safe and comfortable for sensitive skin."
        }
      ]
    },
    buyNowSection: {
      title: "Secure Your Piece of Eternity",
      description: "Order the ELARA Signature Ring today. Each order includes custom luxury gift packaging, a certificate of authenticity, and a lifetime warranty card.",
      sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"],
      specs: [
        { label: "Material", value: "925 Sterling Silver" },
        { label: "Plating", value: "Rhodium Chrome" },
        { label: "Width", value: "6.5 mm" },
        { label: "Sizing", value: "Standard Fit" }
      ]
    },
    imageSequence: {
      // Default to workspace jpg sequence (ezgif-frame-001.jpg to ezgif-frame-040.jpg)
      // Can be replaced with 120 webp images in public/images/elara/1.webp to 120.webp by changing settings:
      folder: "/images/elara",
      frameCount: 40,
      prefix: "ezgif-frame-",
      extension: "jpg",
      zeroPadding: 3
    }
  }
];
