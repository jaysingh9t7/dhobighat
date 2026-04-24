import PaymentsLib "../lib/payments";
import Types "../types/payments";
import Common "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  payments : List.List<Types.PaymentRecord>,
  discountTiers : Map.Map<Text, Types.DiscountTier>,
  customerDiscounts : Map.Map<Principal, Types.CustomerDiscount>,
  qualifyingCounts : Map.Map<Principal, Nat>,
) {
  public shared func createPayment(userId : Principal, pickupId : Text, amount : Float) : async Common.Result<Text, Text> {
    let now = Time.now();
    PaymentsLib.createPayment(payments, userId, pickupId, amount, customerDiscounts, discountTiers, now);
  };

  public shared func getPayment(paymentId : Text) : async Common.Result<PaymentsLib.PaymentRecordShared, Text> {
    switch (PaymentsLib.getPayment(payments, paymentId)) {
      case (#err(e)) { #err(e) };
      case (#ok(p)) { #ok(PaymentsLib.toShared(p)) };
    };
  };

  public shared func getUserPayments(userId : Principal) : async [PaymentsLib.PaymentRecordShared] {
    let records = PaymentsLib.getUserPayments(payments, userId);
    records.map<Types.PaymentRecord, PaymentsLib.PaymentRecordShared>(
      func(p) { PaymentsLib.toShared(p) }
    );
  };

  public shared func getAllPayments() : async [PaymentsLib.PaymentRecordShared] {
    let records = PaymentsLib.getAllPayments(payments);
    records.map<Types.PaymentRecord, PaymentsLib.PaymentRecordShared>(
      func(p) { PaymentsLib.toShared(p) }
    );
  };

  public shared func markPaymentPaid(paymentId : Text, upiTransactionId : Text, byAdmin : Bool) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PaymentsLib.markPaymentPaid(payments, paymentId, upiTransactionId, byAdmin, now);
  };

  public shared func markPaymentPending(paymentId : Text) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PaymentsLib.markPaymentPending(payments, paymentId, now);
  };

  public shared query func getDiscountTiers() : async [Types.DiscountTier] {
    PaymentsLib.getDiscountTiers(discountTiers);
  };

  public shared func addDiscountTier(tier : Types.DiscountTier) : async Common.Result<Text, Text> {
    PaymentsLib.addDiscountTier(discountTiers, tier);
  };

  public shared func updateDiscountTier(tierId : Text, percentage : Float) : async Common.Result<Bool, Text> {
    PaymentsLib.updateDiscountTier(discountTiers, tierId, percentage);
  };

  public shared func assignCustomerDiscount(userId : Principal, tierId : Text) : async Common.Result<Bool, Text> {
    let now = Time.now();
    // Re-build CustomerDiscount with proper timestamp
    switch (discountTiers.get(tierId)) {
      case null { #err("Discount tier not found: " # tierId) };
      case (?_) {
        let cd : Types.CustomerDiscount = {
          userId = userId;
          tierId = tierId;
          assignedAt = now;
          assignedBy = "admin";
        };
        customerDiscounts.add(userId, cd);
        #ok(true);
      };
    };
  };

  public shared query func getCustomerDiscount(userId : Principal) : async ?Types.DiscountTier {
    PaymentsLib.getCustomerDiscount(customerDiscounts, discountTiers, userId);
  };

  // Returns per-user loyalty stats based on qualifying (large/multi-service) orders only
  public shared query func getLoyaltyStats() : async [Types.LoyaltyStats] {
    PaymentsLib.getLoyaltyStats(qualifyingCounts, payments);
  };

  // Returns loyalty stats for the calling user (for customer dashboard "My Tier" card)
  public shared query ({ caller }) func getMyLoyaltyStats() : async Types.LoyaltyStats {
    PaymentsLib.getUserLoyaltyStats(qualifyingCounts, payments, caller);
  };

  public shared func initDefaultDiscountTiers() : async () {
    PaymentsLib.initDefaultDiscountTiers(discountTiers);
  };
};
