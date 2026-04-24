// =============================================================================
// DhobiGhat — Shared Types
// =============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: number;
  hasPassword: boolean;
}

export interface Address {
  id: string;
  label: string; // "Home", "Office", etc.
  flat: string;
  building: string;
  society: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

export type PickupStatus =
  | "pending"
  | "confirmed"
  | "picked_up"
  | "processing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface PickupRequest {
  id: string;
  userId: string;
  serviceIds: string[];
  scheduledDate: string; // ISO date string
  timeSlot: string;
  isExpress: boolean;
  addressId: string;
  status: PickupStatus;
  totalAmount: number;
  discountPercent: number;
  finalAmount: number;
  isPaid: boolean;
  notes: string;
  createdAt: number;
  updatedAt: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  pickupId: string;
  amount: number;
  method: "upi" | "cash" | "online";
  status: "pending" | "paid" | "failed";
  transactionId?: string;
  createdAt: number;
  paidAt?: number;
}

export interface PriceItem {
  id: string;
  category: "men" | "women" | "kids" | "household" | "shoes";
  name: string;
  dryCleaning?: number;
  washIron?: number;
  washFold?: number;
  steamIron?: number;
}

export interface AdminStats {
  totalUsers: number;
  todayPickups: number;
  pendingOrders: number;
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
}

export interface LoyaltyStat {
  userId: string;
  userName: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  discountTier?: number;
  tierName?: string; // "Bronze" | "Silver" | "Gold" | "Platinum" | undefined
}

export interface CustomerTier {
  tierName: string;
  percent: number;
  minOrders: number;
}

export interface AuthUser {
  user: User;
  token: string;
}

export interface OTPSession {
  phone: string;
  otp: string;
  expiresAt: number;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
}

export interface AddressFormData {
  label: string;
  flat: string;
  building: string;
  society: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

export interface SchedulePickupForm {
  serviceIds: string[];
  date: string;
  timeSlot: string;
  isExpress: boolean;
  addressId: string;
}

// Price list categories for display
export type PriceCategory = "men" | "women" | "kids" | "household" | "shoes";

export const PRICE_CATEGORIES: { id: PriceCategory; label: string }[] = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "household", label: "Household" },
  { id: "shoes", label: "Shoes" },
];

// Return type for checkUserExists — includes whether a password has been set
export interface UserExistsResult {
  exists: boolean;
  hasPassword: boolean;
}

// Loyalty stats for the customer's own tier card
export interface MyLoyaltyStats {
  tierName: string | null; // "Bronze" | "Silver" | "Gold" | "Platinum" | null
  discountPercent: number; // 0 | 2 | 5 | 7 | 10
  qualifyingOrderCount: number; // count of large (2+ service) orders
  ordersToNextTier: number; // 0 when Platinum
  nextTierName: string | null; // name of the next tier, null when Platinum
  nextTierPercent: number; // discount % of the next tier, 0 when Platinum
}
