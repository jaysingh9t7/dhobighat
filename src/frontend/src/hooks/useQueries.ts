import * as api from "@/services/api.service";
import type {
  AddressFormData,
  PickupStatus,
  PriceItem,
  SchedulePickupForm,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Auth / User
// ---------------------------------------------------------------------------
export function useUser(userId: string | undefined) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => (userId ? api.getUser(userId) : null),
    enabled: !!userId,
  });
}

export function useCheckUserExists(phone: string) {
  return useQuery({
    queryKey: ["userExists", phone],
    queryFn: () => api.checkUserExists(phone),
    enabled: phone.length === 10,
  });
}

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------
export function useAddAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, addr }: { userId: string; addr: AddressFormData }) =>
      api.addAddress(userId, addr),
    onSuccess: (_, { userId }) =>
      qc.invalidateQueries({ queryKey: ["user", userId] }),
  });
}

export function useUpdateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      addressId,
      addr,
    }: {
      userId: string;
      addressId: string;
      addr: Partial<AddressFormData>;
    }) => api.updateAddress(userId, addressId, addr),
    onSuccess: (_, { userId }) =>
      qc.invalidateQueries({ queryKey: ["user", userId] }),
  });
}

// ---------------------------------------------------------------------------
// Pickups
// ---------------------------------------------------------------------------
export function useUserPickups(userId: string | undefined) {
  return useQuery({
    queryKey: ["pickups", userId],
    queryFn: () => (userId ? api.getUserPickups(userId) : []),
    enabled: !!userId,
  });
}

export function useAllPickups() {
  return useQuery({
    queryKey: ["pickups", "all"],
    queryFn: api.getAllPickups,
  });
}

export function usePickup(pickupId: string | undefined) {
  return useQuery({
    queryKey: ["pickup", pickupId],
    queryFn: () => (pickupId ? api.getPickup(pickupId) : null),
    enabled: !!pickupId,
  });
}

export function useCreatePickup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      form,
    }: { userId: string; form: SchedulePickupForm }) =>
      api.createPickup(userId, form),
    onSuccess: (_, { userId }) => {
      qc.invalidateQueries({ queryKey: ["pickups", userId] });
      qc.invalidateQueries({ queryKey: ["pickups", "all"] });
      // Tier may have changed — refresh loyalty + discount info
      qc.invalidateQueries({ queryKey: ["loyalty"] });
      qc.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

export function useReschedulePickup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      pickupId,
      date,
      timeSlot,
    }: {
      pickupId: string;
      date: string;
      timeSlot: string;
    }) => api.reschedulePickup(pickupId, date, timeSlot),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pickups"] });
    },
  });
}

export function useUpdatePickupStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      pickupId,
      status,
    }: { pickupId: string; status: PickupStatus }) =>
      api.updatePickupStatus(pickupId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pickups"] }),
  });
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------
export function useUserPayments(userId: string | undefined) {
  return useQuery({
    queryKey: ["payments", userId],
    queryFn: () => (userId ? api.getUserPayments(userId) : []),
    enabled: !!userId,
  });
}

export function useAllPayments() {
  return useQuery({
    queryKey: ["payments", "all"],
    queryFn: api.getAllPayments,
  });
}

export function useCreatePayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, pickupId }: { userId: string; pickupId: string }) =>
      api.createPayment(userId, pickupId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payments"] }),
  });
}

export function useMarkPaymentPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ paymentId, txnId }: { paymentId: string; txnId?: string }) =>
      api.markPaymentPaid(paymentId, txnId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments"] });
      qc.invalidateQueries({ queryKey: ["pickups"] });
    },
  });
}

export function useMarkPaymentPending() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => api.markPaymentPending(paymentId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["payments"] }),
  });
}

// ---------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------
export function useAllPrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: api.getAllPrices,
  });
}

export function usePricesByCategory(category: PriceItem["category"]) {
  return useQuery({
    queryKey: ["prices", category],
    queryFn: () => api.getPricesByCategory(category),
  });
}

export function useUpdatePrice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      itemId,
      updates,
    }: { itemId: string; updates: Partial<PriceItem> }) =>
      api.updatePrice(itemId, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prices"] }),
  });
}

export function useAddPriceItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (item: Omit<PriceItem, "id">) => api.addPriceItem(item),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prices"] }),
  });
}

// ---------------------------------------------------------------------------
// Loyalty
// ---------------------------------------------------------------------------
export function useRepeaterCustomers() {
  return useQuery({
    queryKey: ["loyalty", "repeaters"],
    queryFn: api.getRepeaterCustomers,
  });
}

export function useAssignDiscount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, percent }: { userId: string; percent: number }) =>
      api.assignCustomerDiscount(userId, percent),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["loyalty"] }),
  });
}

export function useCustomerDiscount(userId: string | undefined) {
  return useQuery({
    queryKey: ["loyalty", "discount", userId],
    queryFn: () => (userId ? api.getCustomerDiscount(userId) : 0),
    enabled: !!userId,
  });
}

export function useCustomerTierInfo(userId: string | undefined) {
  return useQuery({
    queryKey: ["loyalty", "tier", userId],
    queryFn: () => (userId ? api.getCustomerTierInfo(userId) : null),
    enabled: !!userId,
  });
}

export function useMyLoyaltyStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["loyalty", "mystats", userId],
    queryFn: () => (userId ? api.getMyLoyaltyStats(userId) : null),
    enabled: !!userId,
  });
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: api.getAdminStats,
    refetchInterval: 30_000,
  });
}
