// =============================================================================
// DhobiGhat — API Service Layer
// All backend calls go through this abstraction so the backend can be swapped
// to GoDaddy / external server without touching any UI component.
// =============================================================================

import { APP_CONFIG } from "@/config";
import type {
  Address,
  AddressFormData,
  AdminStats,
  AuthUser,
  LoyaltyStat,
  MyLoyaltyStats,
  PaymentRecord,
  PickupRequest,
  PickupStatus,
  PriceItem,
  RegistrationData,
  SchedulePickupForm,
  User,
  UserExistsResult,
} from "@/types";

// ---------------------------------------------------------------------------
// Loyalty tier definitions — single source of truth
// Bronze: 2+ orders → 2%,  Silver: 3+ → 5%,  Gold: 4+ → 7%,  Platinum: 10+ → 10%
// ---------------------------------------------------------------------------
const LOYALTY_TIERS: { name: string; minOrders: number; percent: number }[] = [
  { name: "Platinum", minOrders: 10, percent: 10 },
  { name: "Gold", minOrders: 4, percent: 7 },
  { name: "Silver", minOrders: 3, percent: 5 },
  { name: "Bronze", minOrders: 2, percent: 2 },
];

function resolveTier(
  orderCount: number,
): { name: string; percent: number } | null {
  for (const tier of LOYALTY_TIERS) {
    if (orderCount >= tier.minOrders)
      return { name: tier.name, percent: tier.percent };
  }
  return null;
}

/** Call after every pickup creation to auto-assign/update the discount tier */
function syncUserTier(userId: string): void {
  const count = _pickups.filter((p) => p.userId === userId).length;
  const tier = resolveTier(count);
  if (tier) {
    _discounts.set(userId, tier.percent);
  }
}

// ---------------------------------------------------------------------------
// Simulated in-memory store (prototype mode)
// In production swap these functions to fetch() calls to GoDaddy server
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Seed data helpers — re-seeds on every page load so the reschedule section
// always has sample data to display during development.
// Pickup times are set as relative offsets from NOW so the 1-hour rule works.
// ---------------------------------------------------------------------------
function makeSeedUser(): User {
  const seedId = "seed-user-001";
  const now = Date.now();
  return {
    id: seedId,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    addresses: [
      {
        id: "seed-addr-001",
        label: "Home",
        flat: "Flat 4B",
        building: "Seaview Heights",
        society: "Andheri West",
        landmark: "Near Kokilaben Hospital",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400053",
        country: "India",
        isDefault: true,
      },
    ],
    hasPassword: true,
    createdAt: now - 7 * 24 * 60 * 60 * 1000,
  };
}

/** Format a Date as "YYYY-MM-DD" in local time */
function toLocalDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Format hours/minutes as "H:MM AM/PM" matching PICKUP_TIME_SLOTS label format */
function toTimeSlotLabel(hours: number, minutes: number): string {
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 === 0 ? 12 : hours % 12;
  const m = String(minutes).padStart(2, "0");
  return `${h}:${m} ${period}`;
}

function makeSeedPickups(userId: string): PickupRequest[] {
  const now = new Date();

  // Pickup 1 — 3 hours from now (eligible to reschedule)
  const p1Date = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const p1Hours = p1Date.getHours();
  const p1Minutes = p1Date.getMinutes() < 30 ? 0 : 30;

  // Pickup 2 — tomorrow at 11:00 AM (eligible to reschedule)
  const p2Date = new Date(now);
  p2Date.setDate(p2Date.getDate() + 1);
  p2Date.setHours(11, 0, 0, 0);

  // Pickup 3 — in 30 minutes (NOT eligible — less than 1 hour away)
  const p3Date = new Date(now.getTime() + 30 * 60 * 1000);
  const p3Hours = p3Date.getHours();
  const p3Minutes = p3Date.getMinutes() < 30 ? 0 : 30;

  return [
    {
      id: "seed-pickup-001",
      userId,
      serviceIds: ["Dry Cleaning", "Steam Iron"],
      scheduledDate: toLocalDateStr(p1Date),
      timeSlot: toTimeSlotLabel(p1Hours, p1Minutes),
      isExpress: false,
      addressId: "seed-addr-001",
      status: "pending",
      totalAmount: 400,
      discountPercent: 0,
      finalAmount: 400,
      isPaid: false,
      notes: "",
      createdAt: Date.now() - 2 * 60 * 60 * 1000,
      updatedAt: Date.now() - 2 * 60 * 60 * 1000,
    },
    {
      id: "seed-pickup-002",
      userId,
      serviceIds: ["Wash & Fold", "Wash & Iron", "Bedsheet Cleaning"],
      scheduledDate: toLocalDateStr(p2Date),
      timeSlot: "11:00 AM",
      isExpress: true,
      addressId: "seed-addr-001",
      status: "confirmed",
      totalAmount: 600,
      discountPercent: 0,
      finalAmount: 600,
      isPaid: false,
      notes: "",
      createdAt: Date.now() - 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 24 * 60 * 60 * 1000,
    },
    {
      id: "seed-pickup-003",
      userId,
      serviceIds: ["Shirt Ironing"],
      scheduledDate: toLocalDateStr(p3Date),
      timeSlot: toTimeSlotLabel(p3Hours, p3Minutes),
      isExpress: false,
      addressId: "seed-addr-001",
      status: "pending",
      totalAmount: 200,
      discountPercent: 0,
      finalAmount: 200,
      isPaid: false,
      notes: "",
      createdAt: Date.now() - 4 * 60 * 60 * 1000,
      updatedAt: Date.now() - 4 * 60 * 60 * 1000,
    },
  ];
}

function initSeedData(): { users: User[]; pickups: PickupRequest[] } {
  const seedUser = makeSeedUser();
  // Restore session user if stored — merge so real registrations are included
  const storedRaw = (() => {
    try {
      return localStorage.getItem("dg_session");
    } catch {
      return null;
    }
  })();
  const storedSession = storedRaw
    ? (JSON.parse(storedRaw) as { user: User; token: string })
    : null;

  const users: User[] = [seedUser];
  const loggedInUser = storedSession?.user;

  // If a different real user is logged in, include them so API calls work
  if (loggedInUser && loggedInUser.id !== seedUser.id) {
    users.push(loggedInUser);
  }

  // Seed demo pickups:
  // - Always seed under the demo user (seed-user-001)
  // - ALSO seed under the currently logged-in user so the reschedule page
  //   works immediately after login without needing to schedule first.
  const pickups = makeSeedPickups(seedUser.id);
  if (loggedInUser && loggedInUser.id !== seedUser.id) {
    // Add copies of the demo pickups under the real user's ID
    const userPickups = makeSeedPickups(loggedInUser.id).map((p, i) => ({
      ...p,
      id: `seed-real-${i + 1}`,
    }));
    pickups.push(...userPickups);
  }

  return { users, pickups };
}

const _seedData = initSeedData();

let _users: User[] = _seedData.users;
let _pickups: PickupRequest[] = _seedData.pickups;
let _payments: PaymentRecord[] = [];
let _prices: PriceItem[] = getDefaultPrices();
let _sessions: Map<string, { otp: string; expiresAt: number }> = new Map();
export { _sessions };
let _adminToken: string | null = null;
const ADMIN_PASSWORD_KEY = "dg_admin_pwd";
const DEFAULT_ADMIN_PASSWORD = "Dhobighat@2024";
// phone → password (prototype: plain text; swap to bcrypt in production)
const _passwords: Map<string, string> = new Map();
// Seed password for the demo user
_passwords.set("9876543210", "demo1234");

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getDefaultPrices(): PriceItem[] {
  const menItems = [
    "Suit (2-pc)",
    "Suit (3-pc)",
    "Blazer",
    "Shirt",
    "T-Shirt",
    "Trouser",
    "Jeans",
    "Kurta",
    "Kurta Pyjama Set",
    "Sherwani",
    "Waistcoat",
    "Shorts",
    "Track Pant",
    "Sweater",
    "Jacket",
    "Overcoat",
  ];
  const womenItems = [
    "Saree",
    "Saree (Silk)",
    "Blouse",
    "Kurti",
    "Salwar Suit",
    "Lehenga",
    "Lehenga Blouse",
    "Dupatta",
    "Gown",
    "Dress",
    "Top",
    "Jeans",
    "Sweater",
    "Jacket",
    "Cardigan",
    "Night Suit",
  ];
  const kidsItems = [
    "Shirt",
    "T-Shirt",
    "Trouser",
    "Dress",
    "Frock",
    "Kurta",
    "Jacket",
    "Sweater",
    "School Uniform",
  ];
  const householdItems = [
    "Bedsheet (Single)",
    "Bedsheet (Double)",
    "Pillow Cover",
    "Blanket",
    "Quilt",
    "Curtain (Small)",
    "Curtain (Large)",
    "Sofa Cover",
    "Table Cloth",
    "Towel",
    "Bath Mat",
  ];
  const shoeItems = [
    "Sports Shoes",
    "Formal Shoes",
    "Casual Shoes",
    "Sandals",
    "Heels",
    "Boots",
    "Loafers",
  ];

  const toItems = (
    names: string[],
    cat: PriceItem["category"],
    basePrice: number,
  ): PriceItem[] =>
    names.map((name, i) => ({
      id: `${cat}-${i}`,
      category: cat,
      name,
      dryCleaning: basePrice + i * 5,
      washIron: Math.round((basePrice + i * 5) * 0.6),
      washFold: Math.round((basePrice + i * 5) * 0.5),
      steamIron: Math.round((basePrice + i * 5) * 0.3),
    }));

  return [
    ...toItems(menItems, "men", 80),
    ...toItems(womenItems, "women", 90),
    ...toItems(kidsItems, "kids", 50),
    ...toItems(householdItems, "household", 60),
    ...toItems(shoeItems, "shoes", 120),
  ];
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function sendOTP(
  phone: string,
): Promise<{ success: boolean; message: string }> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  _sessions.set(phone, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

  if (APP_CONFIG.otpSimulated) {
    console.log(`[DhobiGhat OTP] Phone: ${phone} — OTP: ${otp}`);
    // OTP is displayed on-screen in the login page banner (not as a blocking alert)
  }

  return { success: true, message: "OTP sent successfully" };
}

export async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  const session = _sessions.get(phone);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    _sessions.delete(phone);
    return false;
  }
  return session.otp === otp;
}

export async function checkUserExists(
  phone: string,
): Promise<UserExistsResult> {
  const user = _users.find((u) => u.phone === phone);
  if (!user) return { exists: false, hasPassword: false };
  return { exists: true, hasPassword: _passwords.has(phone) };
}

export async function loginWithPhone(phone: string): Promise<AuthUser | null> {
  const user = _users.find((u) => u.phone === phone);
  if (!user) return null;
  const token = uid();
  return { user, token };
}

/** Login with phone + password (for returning users who have set a password) */
export async function loginWithPassword(
  phone: string,
  password: string,
): Promise<AuthUser | null> {
  const user = _users.find((u) => u.phone === phone);
  if (!user) return null;
  const stored = _passwords.get(phone);
  if (!stored || stored !== password) return null;
  return { user, token: uid() };
}

/**
 * Set password for a user after OTP verification.
 * Used for new-user setup and existing-user (no-password) setup.
 */
export async function setupPassword(
  phone: string,
  otp: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  const valid = await verifyOTP(phone, otp);
  if (!valid) return { success: false, message: "Invalid or expired OTP" };
  if (newPassword.length < 6)
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  _passwords.set(phone, newPassword);
  const user = _users.find((u) => u.phone === phone);
  if (user) user.hasPassword = true;
  _sessions.delete(phone);
  return { success: true, message: "Password set successfully" };
}

/**
 * Reset password using OTP (Forgot Password flow).
 */
export async function resetPasswordWithOTP(
  phone: string,
  otp: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  return setupPassword(phone, otp, newPassword);
}

export async function registerUser(data: RegistrationData): Promise<AuthUser> {
  const existing = _users.find((u) => u.phone === data.phone);
  if (existing) {
    return { user: existing, token: uid() };
  }
  const newUser: User = {
    id: uid(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    addresses: [],
    hasPassword: false,
    createdAt: Date.now(),
  };
  _users.push(newUser);
  return { user: newUser, token: uid() };
}

export async function getUser(userId: string): Promise<User | null> {
  return _users.find((u) => u.id === userId) ?? null;
}

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export async function addAddress(
  userId: string,
  addr: AddressFormData,
): Promise<Address> {
  const user = _users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  const newAddr: Address = {
    id: uid(),
    ...addr,
    isDefault: user.addresses.length === 0,
    country: addr.country || "India",
  };
  user.addresses.push(newAddr);
  return newAddr;
}

export async function updateAddress(
  userId: string,
  addressId: string,
  addr: Partial<AddressFormData>,
): Promise<Address> {
  const user = _users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  const idx = user.addresses.findIndex((a) => a.id === addressId);
  if (idx === -1) throw new Error("Address not found");
  user.addresses[idx] = { ...user.addresses[idx], ...addr };
  return user.addresses[idx];
}

export async function setDefaultAddress(
  userId: string,
  addressId: string,
): Promise<void> {
  const user = _users.find((u) => u.id === userId);
  if (!user) return;
  for (const a of user.addresses) {
    a.isDefault = a.id === addressId;
  }
}

// ---------------------------------------------------------------------------
// Pickup
// ---------------------------------------------------------------------------

export async function createPickup(
  userId: string,
  form: SchedulePickupForm,
): Promise<PickupRequest> {
  const user = _users.find((u) => u.id === userId);
  const discount = await getCustomerDiscount(userId);
  const baseAmount = form.serviceIds.length * 200;
  const discountAmt = Math.round(baseAmount * (discount / 100));

  const pickup: PickupRequest = {
    id: uid(),
    userId,
    serviceIds: form.serviceIds,
    scheduledDate: form.date,
    timeSlot: form.timeSlot,
    isExpress: form.isExpress,
    addressId: form.addressId,
    status: "pending",
    totalAmount: baseAmount,
    discountPercent: discount,
    finalAmount: baseAmount - discountAmt,
    isPaid: false,
    notes: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  _pickups.push(pickup);
  // Auto-assign tier based on total pickup count (including this one)
  syncUserTier(userId);
  void user; // reference used above
  return pickup;
}

export async function getUserPickups(userId: string): Promise<PickupRequest[]> {
  return _pickups
    .filter((p) => p.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function getAllPickups(): Promise<PickupRequest[]> {
  return [..._pickups].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getPickup(
  pickupId: string,
): Promise<PickupRequest | null> {
  return _pickups.find((p) => p.id === pickupId) ?? null;
}

export async function updatePickupStatus(
  pickupId: string,
  status: PickupStatus,
): Promise<void> {
  const p = _pickups.find((x) => x.id === pickupId);
  if (p) {
    p.status = status;
    p.updatedAt = Date.now();
  }
}

export async function reschedulePickup(
  pickupId: string,
  date: string,
  timeSlot: string,
): Promise<PickupRequest | null> {
  const p = _pickups.find((x) => x.id === pickupId);
  if (!p) return null;
  p.scheduledDate = date;
  p.timeSlot = timeSlot;
  p.updatedAt = Date.now();
  return p;
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export async function createPayment(
  userId: string,
  pickupId: string,
): Promise<PaymentRecord> {
  const pickup = _pickups.find((p) => p.id === pickupId);
  const payment: PaymentRecord = {
    id: uid(),
    userId,
    pickupId,
    amount: pickup?.finalAmount ?? 0,
    method: "upi",
    status: "pending",
    createdAt: Date.now(),
  };
  _payments.push(payment);
  return payment;
}

export async function getUserPayments(
  userId: string,
): Promise<PaymentRecord[]> {
  return _payments.filter((p) => p.userId === userId);
}

export async function getAllPayments(): Promise<PaymentRecord[]> {
  return [..._payments].sort((a, b) => b.createdAt - a.createdAt);
}

export async function markPaymentPaid(
  paymentId: string,
  txnId?: string,
): Promise<void> {
  const p = _payments.find((x) => x.id === paymentId);
  if (p) {
    p.status = "paid";
    p.paidAt = Date.now();
    if (txnId) p.transactionId = txnId;
    // mark pickup paid
    const pickup = _pickups.find((x) => x.id === p.pickupId);
    if (pickup) pickup.isPaid = true;
  }
}

export async function markPaymentPending(paymentId: string): Promise<void> {
  const p = _payments.find((x) => x.id === paymentId);
  if (p) p.status = "pending";
}

// ---------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------

export async function getAllPrices(): Promise<PriceItem[]> {
  return _prices;
}

export async function getPricesByCategory(
  category: PriceItem["category"],
): Promise<PriceItem[]> {
  return _prices.filter((p) => p.category === category);
}

export async function updatePrice(
  itemId: string,
  updates: Partial<PriceItem>,
): Promise<void> {
  const idx = _prices.findIndex((p) => p.id === itemId);
  if (idx !== -1) _prices[idx] = { ..._prices[idx], ...updates };
}

export async function addPriceItem(
  item: Omit<PriceItem, "id">,
): Promise<PriceItem> {
  const newItem = { ...item, id: uid() };
  _prices.push(newItem);
  return newItem;
}

// ---------------------------------------------------------------------------
// Loyalty / Discount
// ---------------------------------------------------------------------------

const _discounts: Map<string, number> = new Map();

export async function getCustomerDiscount(userId: string): Promise<number> {
  return _discounts.get(userId) ?? 0;
}

export async function getCustomerTierInfo(
  userId: string,
): Promise<{ tierName: string; percent: number } | null> {
  const count = _pickups.filter((p) => p.userId === userId).length;
  const tier = resolveTier(count);
  if (!tier) return null;
  return { tierName: tier.name, percent: tier.percent };
}

export async function assignCustomerDiscount(
  userId: string,
  percent: number,
): Promise<void> {
  _discounts.set(userId, percent);
}

/**
 * Returns the customer's own loyalty tier stats.
 * Only "qualifying" orders (2+ services selected) count toward tier milestones.
 */
export async function getMyLoyaltyStats(
  userId: string,
): Promise<MyLoyaltyStats> {
  // Count only large orders (2+ services) for milestone progress
  const qualifying = _pickups.filter(
    (p) => p.userId === userId && p.serviceIds.length >= 2,
  ).length;

  // Tier boundaries in ascending order for next-tier logic
  const TIERS_ASC = [
    { name: "Bronze", minOrders: 2, percent: 2 },
    { name: "Silver", minOrders: 3, percent: 5 },
    { name: "Gold", minOrders: 4, percent: 7 },
    { name: "Platinum", minOrders: 10, percent: 10 },
  ];

  // Current tier (highest threshold met)
  const currentTier =
    [...LOYALTY_TIERS].find((t) => qualifying >= t.minOrders) ?? null;

  // Next tier (lowest threshold not yet met)
  const nextTier = TIERS_ASC.find((t) => qualifying < t.minOrders) ?? null;

  const ordersToNextTier = nextTier ? nextTier.minOrders - qualifying : 0;

  return {
    tierName: currentTier?.name ?? null,
    discountPercent: currentTier?.percent ?? 0,
    qualifyingOrderCount: qualifying,
    ordersToNextTier,
    nextTierName: nextTier?.name ?? null,
    nextTierPercent: nextTier?.percent ?? 0,
  };
}

export async function getRepeaterCustomers(): Promise<LoyaltyStat[]> {
  const countMap: Map<string, number> = new Map();
  const spentMap: Map<string, number> = new Map();
  for (const p of _pickups) {
    countMap.set(p.userId, (countMap.get(p.userId) ?? 0) + 1);
    spentMap.set(p.userId, (spentMap.get(p.userId) ?? 0) + p.finalAmount);
  }
  return _users
    .map((u) => {
      const orders = countMap.get(u.id) ?? 0;
      const discount = _discounts.get(u.id);
      const tier = resolveTier(orders);
      return {
        userId: u.id,
        userName: u.name,
        phone: u.phone,
        totalOrders: orders,
        totalSpent: spentMap.get(u.id) ?? 0,
        discountTier: discount,
        tierName: tier?.name,
      };
    })
    .sort((a, b) => b.totalOrders - a.totalOrders);
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export async function adminLogin(
  email: string,
  password: string,
): Promise<string | null> {
  if (email !== APP_CONFIG.adminEmail) return null;
  const stored =
    localStorage.getItem(ADMIN_PASSWORD_KEY) ?? DEFAULT_ADMIN_PASSWORD;
  if (password !== stored) return null;
  const token = uid();
  _adminToken = token;
  return token;
}

export async function validateAdminToken(token: string): Promise<boolean> {
  return token === _adminToken;
}

export async function resetAdminPassword(
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  const stored =
    localStorage.getItem(ADMIN_PASSWORD_KEY) ?? DEFAULT_ADMIN_PASSWORD;
  if (oldPassword !== stored) return false;
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
  return true;
}

export async function getAdminStats(): Promise<AdminStats> {
  const today = new Date().toDateString();
  return {
    totalUsers: _users.length,
    todayPickups: _pickups.filter(
      (p) => new Date(p.createdAt).toDateString() === today,
    ).length,
    pendingOrders: _pickups.filter(
      (p) => p.status === "pending" || p.status === "confirmed",
    ).length,
    totalRevenue: _pickups.reduce((s, p) => s + p.finalAmount, 0),
    paidAmount: _pickups
      .filter((p) => p.isPaid)
      .reduce((s, p) => s + p.finalAmount, 0),
    pendingAmount: _pickups
      .filter((p) => !p.isPaid)
      .reduce((s, p) => s + p.finalAmount, 0),
  };
}
