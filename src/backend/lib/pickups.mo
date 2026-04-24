import Types "../types/pickups";
import TypesPayments "../types/payments";
import Common "../types/common";
import Map "mo:core/Map";

module {
  public type PickupRequest = Types.PickupRequest;
  public type ServiceType = Types.ServiceType;
  public type PickupStatus = Types.PickupStatus;
  public type PickupMap = Map.Map<Text, PickupRequest>;

  // A "large/qualifying" order has 2 or more services selected
  func isQualifyingOrder(serviceIds : [ServiceType]) : Bool {
    serviceIds.size() >= 2;
  };

  // Determine loyalty tier id from qualifying order count
  func tierIdFromCount(count : Nat) : ?Text {
    if (count >= 10) { ?"tier-10pct" }
    else if (count >= 4) { ?"tier-7pct" }
    else if (count >= 3) { ?"tier-5pct" }
    else if (count >= 2) { ?"tier-2pct" }
    else { null };
  };

  public func createPickup(
    pickups : PickupMap,
    qualifyingCounts : Map.Map<Principal, Nat>,
    id : Text,
    userId : Principal,
    serviceIds : [ServiceType],
    scheduledDate : Int,
    timeSlot : Text,
    addressId : Text,
    isExpress : Bool,
    now : Int,
    customerDiscounts : Map.Map<Principal, TypesPayments.CustomerDiscount>,
    discountTiers : Map.Map<Text, TypesPayments.DiscountTier>,
  ) : Common.Result<Text, Text> {
    if (pickups.containsKey(id)) {
      return #err("Pickup ID already exists");
    };
    let request : PickupRequest = {
      id = id;
      userId = userId;
      serviceIds = serviceIds;
      scheduledDate = scheduledDate;
      timeSlot = timeSlot;
      addressId = addressId;
      isExpress = isExpress;
      status = #pending;
      createdAt = now;
      updatedAt = now;
      totalAmount = null;
      discountPercent = null;
      isPaid = false;
      paymentId = null;
    };
    pickups.add(id, request);

    // Only large/multi-service orders (2+ services) count toward loyalty tier
    if (isQualifyingOrder(serviceIds)) {
      let curCount = switch (qualifyingCounts.get(userId)) {
        case null { 0 };
        case (?n) { n };
      };
      let newCount = curCount + 1;
      qualifyingCounts.add(userId, newCount);

      // Auto-assign loyalty tier based on qualifying order count
      switch (tierIdFromCount(newCount)) {
        case null {};
        case (?tierId) {
          if (discountTiers.containsKey(tierId)) {
            let cd : TypesPayments.CustomerDiscount = {
              userId = userId;
              tierId = tierId;
              assignedAt = now;
              assignedBy = "system";
            };
            customerDiscounts.add(userId, cd);
          };
        };
      };
    };

    #ok(id);
  };

  public func getPickup(
    pickups : PickupMap,
    pickupId : Text,
  ) : Common.Result<PickupRequest, Text> {
    switch (pickups.get(pickupId)) {
      case null { #err("Pickup not found") };
      case (?p) { #ok(p) };
    };
  };

  public func getUserPickups(
    pickups : PickupMap,
    userId : Principal,
  ) : [PickupRequest] {
    pickups.values()
      .filter(func(p : PickupRequest) : Bool { p.userId == userId })
      .toArray();
  };

  public func getAllPickups(
    pickups : PickupMap,
  ) : [PickupRequest] {
    pickups.entries()
      .map<(Text, PickupRequest), PickupRequest>(func((_, p)) { p })
      .toArray();
  };

  public func updatePickupStatus(
    pickups : PickupMap,
    pickupId : Text,
    status : PickupStatus,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (pickups.get(pickupId)) {
      case null { #err("Pickup not found") };
      case (?p) {
        let updated : PickupRequest = { p with status = status; updatedAt = now };
        pickups.add(pickupId, updated);
        #ok(true);
      };
    };
  };

  public func reschedulePickup(
    pickups : PickupMap,
    pickupId : Text,
    newDate : Int,
    newTimeSlot : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (pickups.get(pickupId)) {
      case null { #err("Pickup not found") };
      case (?p) {
        // Ensure at least 1 hour gap before scheduled time
        let oneHour : Int = 3_600_000_000_000;
        if (p.scheduledDate - now < oneHour) {
          return #err("Too late to reschedule. Less than 1 hour before pickup.");
        };
        let updated : PickupRequest = { p with scheduledDate = newDate; timeSlot = newTimeSlot; updatedAt = now };
        pickups.add(pickupId, updated);
        #ok(true);
      };
    };
  };

  public func setPickupAmount(
    pickups : PickupMap,
    pickupId : Text,
    amount : Float,
    discountPercent : Float,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (pickups.get(pickupId)) {
      case null { #err("Pickup not found") };
      case (?p) {
        let updated : PickupRequest = {
          p with
          totalAmount = ?amount;
          discountPercent = ?discountPercent;
          updatedAt = now;
        };
        pickups.add(pickupId, updated);
        #ok(true);
      };
    };
  };

  public func markPickupPaid(
    pickups : PickupMap,
    pickupId : Text,
    paymentId : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (pickups.get(pickupId)) {
      case null { #err("Pickup not found") };
      case (?p) {
        let updated : PickupRequest = {
          p with
          isPaid = true;
          paymentId = ?paymentId;
          updatedAt = now;
        };
        pickups.add(pickupId, updated);
        #ok(true);
      };
    };
  };
};
