module {
  public type ServiceType = {
    #dryCleaning;
    #washSteamIron;
    #washFold;
    #shoeCleaning;
    #steamIron;
  };

  public type PickupStatus = {
    #pending;
    #pickupDone;
    #dropDone;
    #cancelled;
  };

  public type PickupRequest = {
    id : Text;
    userId : Principal;
    serviceIds : [ServiceType];
    scheduledDate : Int;
    timeSlot : Text;
    addressId : Text;
    isExpress : Bool;
    status : PickupStatus;
    createdAt : Int;
    updatedAt : Int;
    totalAmount : ?Float;
    discountPercent : ?Float;
    isPaid : Bool;
    paymentId : ?Text;
  };
};
