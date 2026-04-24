import Types "../types/payments";
import Common "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";

module {
  public type PaymentRecord = Types.PaymentRecord;
  public type DiscountTier = Types.DiscountTier;
  public type CustomerDiscount = Types.CustomerDiscount;
  public type LoyaltyStats = Types.LoyaltyStats;
  public type PaymentStatus = Types.PaymentStatus;

  // Shared (immutable) PaymentRecord for API boundary
  public type PaymentRecordShared = {
    id : Text;
    userId : Principal;
    pickupId : Text;
    amount : Float;
    discountPercent : Float;
    finalAmount : Float;
    status : PaymentStatus;
    upiTransactionId : ?Text;
    createdAt : Int;
    updatedAt : Int;
    markedByAdmin : Bool;
  };

  public func toShared(p : PaymentRecord) : PaymentRecordShared {
    {
      id = p.id;
      userId = p.userId;
      pickupId = p.pickupId;
      amount = p.amount;
      discountPercent = p.discountPercent;
      finalAmount = p.finalAmount;
      status = p.status;
      upiTransactionId = p.upiTransactionId;
      createdAt = p.createdAt;
      updatedAt = p.updatedAt;
      markedByAdmin = p.markedByAdmin;
    };
  };

  // Resolve tier name and discount percent from qualifying order count
  func tierInfoFromCount(count : Nat) : (Text, Float) {
    if (count >= 10) { ("platinum", 10.0) }
    else if (count >= 4) { ("gold", 7.0) }
    else if (count >= 3) { ("silver", 5.0) }
    else if (count >= 2) { ("bronze", 2.0) }
    else { ("standard", 0.0) };
  };

  // Orders needed to reach next tier from current qualifying count
  func ordersToNextTierFromCount(count : Nat) : Int {
    if (count >= 10) { 0 }          // already Platinum
    else if (count >= 4) {
      10 - count.toInt()            // toward Platinum
    }
    else if (count >= 3) {
      4 - count.toInt()             // toward Gold
    }
    else if (count >= 2) {
      3 - count.toInt()             // toward Silver
    }
    else if (count >= 1) {
      2 - count.toInt()             // toward Bronze
    }
    else { 2 };                     // need 2 qualifying orders for Bronze
  };

  public func createPayment(
    payments : List.List<PaymentRecord>,
    userId : Principal,
    pickupId : Text,
    amount : Float,
    customerDiscounts : Map.Map<Principal, CustomerDiscount>,
    discountTiers : Map.Map<Text, DiscountTier>,
    now : Int,
  ) : Common.Result<Text, Text> {
    // Generate ID from userId + pickupId
    let paymentId = "pay_" # userId.toText() # "_" # pickupId;
    // Check for existing payment for same pickup
    let exists = payments.find(func(p) { p.pickupId == pickupId });
    switch (exists) {
      case (?_) { return #err("Payment already exists for this pickup") };
      case null {};
    };
    // Look up customer discount
    let discountPct : Float = switch (customerDiscounts.get(userId)) {
      case null { 0.0 };
      case (?cd) {
        switch (discountTiers.get(cd.tierId)) {
          case null { 0.0 };
          case (?tier) { tier.percentage };
        };
      };
    };
    let discountAmt = amount * discountPct / 100.0;
    let finalAmount = amount - discountAmt;
    let record : PaymentRecord = {
      id = paymentId;
      userId = userId;
      pickupId = pickupId;
      amount = amount;
      discountPercent = discountPct;
      finalAmount = finalAmount;
      var status = #pending;
      var upiTransactionId = null;
      createdAt = now;
      var updatedAt = now;
      var markedByAdmin = false;
    };
    payments.add(record);
    #ok(paymentId);
  };

  public func getPayment(
    payments : List.List<PaymentRecord>,
    paymentId : Text,
  ) : Common.Result<PaymentRecord, Text> {
    switch (payments.find(func(p) { p.id == paymentId })) {
      case null { #err("Payment not found") };
      case (?p) { #ok(p) };
    };
  };

  public func getUserPayments(
    payments : List.List<PaymentRecord>,
    userId : Principal,
  ) : [PaymentRecord] {
    let target = userId.toText();
    payments.filter(func(p) { p.userId.toText() == target }).toArray();
  };

  public func getAllPayments(
    payments : List.List<PaymentRecord>,
  ) : [PaymentRecord] {
    payments.toArray();
  };

  public func markPaymentPaid(
    payments : List.List<PaymentRecord>,
    paymentId : Text,
    upiTransactionId : Text,
    byAdmin : Bool,
    now : Int,
  ) : Common.Result<Bool, Text> {
    var found = false;
    payments.forEach(func(p) {
      if (p.id == paymentId) {
        found := true;
        p.status := #paid;
        p.upiTransactionId := ?upiTransactionId;
        p.markedByAdmin := byAdmin;
        p.updatedAt := now;
      };
    });
    if (found) { #ok(true) } else { #err("Payment not found") };
  };

  public func markPaymentPending(
    payments : List.List<PaymentRecord>,
    paymentId : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    var found = false;
    payments.forEach(func(p) {
      if (p.id == paymentId) {
        found := true;
        p.status := #pending;
        p.markedByAdmin := true;
        p.updatedAt := now;
      };
    });
    if (found) { #ok(true) } else { #err("Payment not found") };
  };

  public func getDiscountTiers(
    discountTiers : Map.Map<Text, DiscountTier>,
  ) : [DiscountTier] {
    discountTiers.entries()
      .map<(Text, DiscountTier), DiscountTier>(func((_, t)) { t })
      .toArray();
  };

  public func addDiscountTier(
    discountTiers : Map.Map<Text, DiscountTier>,
    tier : DiscountTier,
  ) : Common.Result<Text, Text> {
    if (discountTiers.containsKey(tier.id)) {
      return #err("Discount tier already exists: " # tier.id);
    };
    discountTiers.add(tier.id, tier);
    #ok(tier.id);
  };

  public func updateDiscountTier(
    discountTiers : Map.Map<Text, DiscountTier>,
    tierId : Text,
    percentage : Float,
  ) : Common.Result<Bool, Text> {
    switch (discountTiers.get(tierId)) {
      case null { #err("Discount tier not found: " # tierId) };
      case (?tier) {
        discountTiers.add(tierId, { tier with percentage = percentage });
        #ok(true);
      };
    };
  };

  public func assignCustomerDiscount(
    customerDiscounts : Map.Map<Principal, CustomerDiscount>,
    discountTiers : Map.Map<Text, DiscountTier>,
    userId : Principal,
    tierId : Text,
    assignedBy : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    if (not discountTiers.containsKey(tierId)) {
      return #err("Discount tier not found: " # tierId);
    };
    let cd : CustomerDiscount = {
      userId = userId;
      tierId = tierId;
      assignedAt = now;
      assignedBy = assignedBy;
    };
    customerDiscounts.add(userId, cd);
    #ok(true);
  };

  public func getCustomerDiscount(
    customerDiscounts : Map.Map<Principal, CustomerDiscount>,
    discountTiers : Map.Map<Text, DiscountTier>,
    userId : Principal,
  ) : ?DiscountTier {
    switch (customerDiscounts.get(userId)) {
      case null { null };
      case (?cd) { discountTiers.get(cd.tierId) };
    };
  };

  // getLoyaltyStats uses the qualifyingCounts map (only large/multi-service orders)
  // and also counts total pickups per user for informational display.
  public func getLoyaltyStats(
    qualifyingCounts : Map.Map<Principal, Nat>,
    payments : List.List<PaymentRecord>,
  ) : [LoyaltyStats] {
    // Count total pickups per user from payment records
    let totalCounts = Map.empty<Principal, Int>();
    payments.forEach(func(p) {
      let cur = switch (totalCounts.get(p.userId)) {
        case null { 0 };
        case (?n) { n };
      };
      totalCounts.add(p.userId, cur + 1);
    });

    // Build stats for every user who has at least one qualifying order
    qualifyingCounts.entries()
      .map<(Principal, Nat), LoyaltyStats>(func((uid, qCount)) {
        let totalPickups = switch (totalCounts.get(uid)) {
          case null { 0 };
          case (?n) { n };
        };
        let (tierName, discPct) = tierInfoFromCount(qCount);
        let toNext = ordersToNextTierFromCount(qCount);
        {
          userId = uid;
          totalPickups = totalPickups;
          qualifyingOrderCount = qCount.toInt();
          tier = tierName;
          discountPercent = discPct;
          ordersToNextTier = toNext;
        };
      })
      .toArray();
  };

  // Get loyalty stats for a single user
  public func getUserLoyaltyStats(
    qualifyingCounts : Map.Map<Principal, Nat>,
    payments : List.List<PaymentRecord>,
    userId : Principal,
  ) : LoyaltyStats {
    let qCount = switch (qualifyingCounts.get(userId)) {
      case null { 0 };
      case (?n) { n };
    };
    let totalPickups = payments.filter(func(p) { p.userId == userId }).size().toInt();
    let (tierName, discPct) = tierInfoFromCount(qCount);
    let toNext = ordersToNextTierFromCount(qCount);
    {
      userId = userId;
      totalPickups = totalPickups;
      qualifyingOrderCount = qCount.toInt();
      tier = tierName;
      discountPercent = discPct;
      ordersToNextTier = toNext;
    };
  };

  public func initDefaultDiscountTiers(
    discountTiers : Map.Map<Text, DiscountTier>,
  ) : () {
    discountTiers.clear();
    discountTiers.add("tier-2pct",  { id = "tier-2pct";  name = "Bronze (2% Off)";  percentage = 2.0;  description = "2% discount for repeat customers (2+ large orders)" });
    discountTiers.add("tier-5pct",  { id = "tier-5pct";  name = "Silver (5% Off)";  percentage = 5.0;  description = "5% discount for loyal customers (3+ large orders)" });
    discountTiers.add("tier-7pct",  { id = "tier-7pct";  name = "Gold (7% Off)";    percentage = 7.0;  description = "7% discount for premium customers (4+ large orders)" });
    discountTiers.add("tier-10pct", { id = "tier-10pct"; name = "Platinum (10% Off)"; percentage = 10.0; description = "10% discount for VIP customers (10+ large orders)" });
  };
};
