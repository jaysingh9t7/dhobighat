// =============================================================================
// DhobiGhat — Centralized Configuration
// Replace values here to rebrand / redeploy to a different domain or server.
// =============================================================================

export const APP_CONFIG = {
  // Company info
  companyName: "DhobiGhat",
  tagline: "Your Premium Cleaning & Revitalization Partners",
  address: "Shop No.2, Dinananth ITUS Tower, C.T.S. Number 1, Opposite to Kokilaben Hospital, Andheri West, Mumbai — 400053",
  phone: "9004543487",
  email: "admin@mydhobighat.com",
  website: "https://mydhobighat.com",

  // Payment
  upiId: "dhobighat@upi",
  upiName: "DhobiGhat Services",

  // Assets — swap these paths when hosting changes
  logo: "/assets/dhobighat-logo.jpg",
  heroImage: "/assets/generated/hero-laundry.dim_800x500.jpg",
  heroImages: [
    "/assets/generated/hero-laundry.dim_800x500.jpg",
    "/assets/generated/hero-laundry-2.dim_800x500.jpg",
    "/assets/generated/hero-laundry-3.dim_800x500.jpg",
  ],
  placeholderImage: "/assets/hero-placeholder.svg",

  // API / Backend — swap for external server
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  environment: (import.meta.env.MODE as "development" | "production") || "development",

  // OTP config — in prototype mode OTPs are shown in console
  otpSimulated: true,

  // Admin credentials (change via admin dashboard after deploy)
  adminEmail: "admin@mydhobighat.com",
} as const;

export const SERVICES = [
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "Detailed care for delicates",
    icon: "shirt",
    color: "navy",
  },
  {
    id: "wash-steam-iron",
    name: "Wash & Steam Iron",
    description: "Cleaned and freshly pressed",
    icon: "wind",
    color: "navy",
  },
  {
    id: "wash-fold",
    name: "Wash & Fold",
    description: "Daily wear, expertly folded",
    icon: "layers",
    color: "navy",
  },
  {
    id: "shoe-cleaning",
    name: "Shoe Cleaning",
    description: "Restore shoes to like-new",
    icon: "footprints",
    color: "navy",
  },
  {
    id: "steam-iron",
    name: "Steam Iron",
    description: "Crisp, wrinkle-free results",
    icon: "zap",
    color: "navy",
  },
] as const;

export const PICKUP_TIME_SLOTS = [
  { id: "slot-1", label: "9:30 AM – 12:30 PM" },
  { id: "slot-2", label: "1:30 PM – 2:30 PM" },
  { id: "slot-3", label: "2:30 PM – 3:30 PM" },
  { id: "slot-4", label: "3:30 PM – 4:30 PM" },
  { id: "slot-5", label: "4:30 PM – 5:30 PM" },
  { id: "slot-6", label: "5:30 PM – 6:30 PM" },
  { id: "slot-7", label: "6:30 PM – 7:30 PM" },
  { id: "slot-8", label: "7:30 PM – 8:30 PM" },
] as const;

export const DISCOUNT_TIERS = [
  { id: "tier-2", label: "2%", value: 2 },
  { id: "tier-5", label: "5%", value: 5 },
  { id: "tier-7", label: "7%", value: 7 },
  { id: "tier-10", label: "10%", value: 10 },
  { id: "tier-15", label: "15%", value: 15 },
] as const;

export type ServiceId = typeof SERVICES[number]["id"];
export type TimeSlotId = typeof PICKUP_TIME_SLOTS[number]["id"];
