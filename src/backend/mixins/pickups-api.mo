import Types "../types/pickups";
import TypesPayments "../types/payments";
import Common "../types/common";
import PickupsLib "../lib/pickups";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  pickups : Map.Map<Text, Types.PickupRequest>,
  pickupIdCounter : { var value : Nat },
  customerDiscounts : Map.Map<Principal, TypesPayments.CustomerDiscount>,
  discountTiers : Map.Map<Text, TypesPayments.DiscountTier>,
  qualifyingCounts : Map.Map<Principal, Nat>,
) {

  public shared ({ caller }) func createPickup(
    serviceIds : [Types.ServiceType],
    scheduledDate : Int,
    timeSlot : Text,
    addressId : Text,
    isExpress : Bool,
  ) : async Common.Result<Text, Text> {
    let now = Time.now();
    let id = "pickup_" # pickupIdCounter.value.toText();
    pickupIdCounter.value += 1;
    PickupsLib.createPickup(pickups, qualifyingCounts, id, caller, serviceIds, scheduledDate, timeSlot, addressId, isExpress, now, customerDiscounts, discountTiers);
  };

  public shared query func getPickup(
    pickupId : Text,
  ) : async Common.Result<Types.PickupRequest, Text> {
    PickupsLib.getPickup(pickups, pickupId);
  };

  public shared query ({ caller }) func getUserPickups() : async [Types.PickupRequest] {
    PickupsLib.getUserPickups(pickups, caller);
  };

  public shared query func getAllPickups() : async [Types.PickupRequest] {
    PickupsLib.getAllPickups(pickups);
  };

  public shared func updatePickupStatus(
    pickupId : Text,
    status : Types.PickupStatus,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PickupsLib.updatePickupStatus(pickups, pickupId, status, now);
  };

  public shared ({ caller }) func reschedulePickup(
    pickupId : Text,
    newDate : Int,
    newTimeSlot : Text,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PickupsLib.reschedulePickup(pickups, pickupId, newDate, newTimeSlot, now);
  };

  public shared func setPickupAmount(
    pickupId : Text,
    amount : Float,
    discountPercent : Float,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PickupsLib.setPickupAmount(pickups, pickupId, amount, discountPercent, now);
  };

  public shared func markPickupPaid(
    pickupId : Text,
    paymentId : Text,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PickupsLib.markPickupPaid(pickups, pickupId, paymentId, now);
  };
};
