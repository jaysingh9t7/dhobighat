module {
  public type PaymentStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type PaymentRecord = {
    id : Text;
    userId : Principal;
    pickupId : Text;
    amount : Float;
    discountPercent : Float;
    finalAmount : Float;
    var status : PaymentStatus;
    var upiTransactionId : ?Text;
    createdAt : Int;
    var updatedAt : Int;
    var markedByAdmin : Bool;
  };

  public type DiscountTier = {
    id : Text;
    name : Text;
    percentage : Float;
    description : Text;
  };

  public type CustomerDiscount = {
    userId : Principal;
    tierId : Text;
    assignedAt : Int;
    assignedBy : Text;
  };

  // Extended loyalty stats returned to the customer dashboard
  public type LoyaltyStats = {
    userId : Principal;
    totalPickups : Int;
    qualifyingOrderCount : Int;
    tier : Text;
    discountPercent : Float;
    ordersToNextTier : Int;
  };
};
