import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

import TypesUsers "types/users";
import TypesPickups "types/pickups";
import TypesPricing "types/pricing";
import TypesPayments "types/payments";
import TypesAdmin "types/admin";

import UsersMixin "mixins/users-api";
import PickupsMixin "mixins/pickups-api";
import PricingMixin "mixins/pricing-api";
import PaymentsMixin "mixins/payments-api";
import AdminMixin "mixins/admin-api";

import PricingLib "lib/pricing";
import PaymentsLib "lib/payments";
import AdminLib "lib/admin";




actor {
  // ── Users ────────────────────────────────────────────────────────────
  let users = Map.empty<Text, TypesUsers.UserProfile>();

  // ── Pickups ──────────────────────────────────────────────────────────
  let pickups = Map.empty<Text, TypesPickups.PickupRequest>();
  let pickupIdCounter = { var value : Nat = 0 };

  // ── Pricing ──────────────────────────────────────────────────────────
  let prices = List.empty<TypesPricing.PriceItem>();

  // ── Payments ─────────────────────────────────────────────────────────
  let payments = List.empty<TypesPayments.PaymentRecord>();
  let discountTiers = Map.empty<Text, TypesPayments.DiscountTier>();
  let customerDiscounts = Map.empty<Principal, TypesPayments.CustomerDiscount>();

  // ── Loyalty ──────────────────────────────────────────────────────────
  // Tracks only large/multi-service orders (2+ services) per user for tier calculation
  let qualifyingCounts = Map.empty<Principal, Nat>();

  // ── Admin ─────────────────────────────────────────────────────────────
  // Mutable wrapper for optional credentials (initialized on first use)
  let adminCredentials = { var value : ?TypesAdmin.AdminCredentials = null };
  let adminSessions = Map.empty<Text, TypesAdmin.AdminSession>();

  // ── Bootstrap default data ────────────────────────────────────────────
  // Initialize prices and discount tiers on first deploy
  do {
    let now = Time.now();
    PricingLib.initDefaultPrices(prices, now);
    PaymentsLib.initDefaultDiscountTiers(discountTiers);
    adminCredentials.value := ?AdminLib.initCredentials();
  };

  // ── Mixin inclusion ───────────────────────────────────────────────────
  include UsersMixin(users);
  include PickupsMixin(pickups, pickupIdCounter, customerDiscounts, discountTiers, qualifyingCounts);
  include PricingMixin(prices);
  include PaymentsMixin(payments, discountTiers, customerDiscounts, qualifyingCounts);
  include AdminMixin(adminCredentials, adminSessions, pickups, payments, users, customerDiscounts, discountTiers, qualifyingCounts);
};
