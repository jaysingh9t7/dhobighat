import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Result_2 = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export interface PriceItem {
    id: string;
    ironingPrice?: number;
    unit: PriceUnit;
    steamIroningPrice?: number;
    dryCleaningPrice?: number;
    updatedAt: bigint;
    itemName: string;
    category: PriceCategory;
    washFoldPrice?: number;
}
export interface PaymentRecordShared {
    id: string;
    status: PaymentStatus;
    finalAmount: number;
    userId: Principal;
    createdAt: bigint;
    upiTransactionId?: string;
    discountPercent: number;
    updatedAt: bigint;
    pickupId: string;
    markedByAdmin: boolean;
    amount: number;
}
export interface DiscountTier {
    id: string;
    name: string;
    description: string;
    percentage: number;
}
export type Result_5 = {
    __kind__: "ok";
    ok: AdminSession;
} | {
    __kind__: "err";
    err: string;
};
export interface RepeaterCategory {
    totalPickups: bigint;
    userId: Principal;
    name: string;
    tier: string;
    discountPercent: number;
    phone: string;
    qualifyingOrderCount: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface PickupRequest {
    id: string;
    status: PickupStatus;
    isExpress: boolean;
    scheduledDate: bigint;
    userId: Principal;
    createdAt: bigint;
    discountPercent?: number;
    isPaid: boolean;
    serviceIds: Array<ServiceType>;
    updatedAt: bigint;
    addressId: string;
    totalAmount?: number;
    paymentId?: string;
    timeSlot: string;
}
export type Result_4 = {
    __kind__: "ok";
    ok: PaymentRecordShared;
} | {
    __kind__: "err";
    err: string;
};
export interface AdminSession {
    token: string;
    expiresAt: bigint;
    email: string;
}
export type Result = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: PickupRequest;
} | {
    __kind__: "err";
    err: string;
};
export interface AdminStats {
    pendingPayments: bigint;
    totalOrders: bigint;
    pendingPickups: bigint;
    completedPickups: bigint;
    totalUsers: bigint;
    totalRevenue: number;
}
export interface LoyaltyStats {
    totalPickups: bigint;
    userId: Principal;
    tier: string;
    discountPercent: number;
    ordersToNextTier: bigint;
    qualifyingOrderCount: bigint;
}
export interface UserProfile {
    id: Principal;
    otpCode?: string;
    name: string;
    createdAt: bigint;
    email: string;
    otpExpiry?: bigint;
    addresses: Array<Address>;
    isVerified: boolean;
    passwordHash: string;
    phone: string;
    isPasswordConfigured: boolean;
}
export interface Address {
    id: string;
    country: string;
    flatNo: string;
    city: string;
    building: string;
    society: string;
    state: string;
    isDefault: boolean;
    pinCode: string;
    landmark: string;
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum PickupStatus {
    cancelled = "cancelled",
    pending = "pending",
    pickupDone = "pickupDone",
    dropDone = "dropDone"
}
export enum PriceCategory {
    men = "men",
    bulk = "bulk",
    kids = "kids",
    shoes = "shoes",
    women = "women",
    household = "household"
}
export enum PriceUnit {
    perPiece = "perPiece",
    perSeat = "perSeat",
    perMeter = "perMeter",
    perKg = "perKg"
}
export enum ServiceType {
    washFold = "washFold",
    shoeCleaning = "shoeCleaning",
    dryCleaning = "dryCleaning",
    washSteamIron = "washSteamIron",
    steamIron = "steamIron"
}
export interface backendInterface {
    addAddress(userId: Principal, address: Address): Promise<Result_1>;
    addDiscountTier(tier: DiscountTier): Promise<Result_1>;
    addPriceItem(item: PriceItem): Promise<Result_1>;
    adminLogin(email: string, password: string): Promise<Result_5>;
    assignCustomerDiscount(userId: Principal, tierId: string): Promise<Result>;
    checkPasswordResetRequired(): Promise<boolean>;
    createPayment(userId: Principal, pickupId: string, amount: number): Promise<Result_1>;
    createPickup(serviceIds: Array<ServiceType>, scheduledDate: bigint, timeSlot: string, addressId: string, isExpress: boolean): Promise<Result_1>;
    generateOTP(phone: string): Promise<Result_1>;
    generateOTPForPasswordReset(phone: string): Promise<Result_1>;
    getAddresses(userId: Principal): Promise<Array<Address>>;
    getAdminStats(): Promise<AdminStats>;
    getAllPayments(): Promise<Array<PaymentRecordShared>>;
    getAllPickups(): Promise<Array<PickupRequest>>;
    getAllPrices(): Promise<Array<PriceItem>>;
    getCustomerDiscount(userId: Principal): Promise<DiscountTier | null>;
    getDiscountTiers(): Promise<Array<DiscountTier>>;
    getLoyaltyStats(): Promise<Array<LoyaltyStats>>;
    getMyLoyaltyStats(): Promise<LoyaltyStats>;
    getPayment(paymentId: string): Promise<Result_4>;
    getPickup(pickupId: string): Promise<Result_3>;
    getPricesByCategory(category: PriceCategory): Promise<Array<PriceItem>>;
    getRepeaterCustomers(): Promise<Array<RepeaterCategory>>;
    getUser(userId: Principal): Promise<Result_2>;
    getUserPayments(userId: Principal): Promise<Array<PaymentRecordShared>>;
    getUserPickups(): Promise<Array<PickupRequest>>;
    initAdminCredentials(): Promise<void>;
    initDefaultDiscountTiers(): Promise<void>;
    initDefaultPrices(): Promise<void>;
    loginUser(phone: string, password: string): Promise<Result_2>;
    markPaymentPaid(paymentId: string, upiTransactionId: string, byAdmin: boolean): Promise<Result>;
    markPaymentPending(paymentId: string): Promise<Result>;
    markPickupPaid(pickupId: string, paymentId: string): Promise<Result>;
    registerUser(phone: string, name: string, email: string, password: string): Promise<Result_1>;
    reschedulePickup(pickupId: string, newDate: bigint, newTimeSlot: string): Promise<Result>;
    resetAdminPassword(currentPassword: string, newPassword: string): Promise<Result>;
    resetPasswordWithOTP(phone: string, otp: string, newPassword: string): Promise<Result>;
    setPickupAmount(pickupId: string, amount: number, discountPercent: number): Promise<Result>;
    setupPassword(phone: string, otp: string, newPassword: string): Promise<Result>;
    updateAddress(userId: Principal, addressId: string, address: Address): Promise<Result>;
    updateDiscountTier(tierId: string, percentage: number): Promise<Result>;
    updatePickupStatus(pickupId: string, status: PickupStatus): Promise<Result>;
    updatePrice(itemId: string, ironingPrice: number | null, steamIroningPrice: number | null, dryCleaningPrice: number | null, washFoldPrice: number | null): Promise<Result>;
    validateAdminToken(token: string): Promise<Result>;
    verifyOTP(phone: string, otp: string): Promise<Result>;
}
