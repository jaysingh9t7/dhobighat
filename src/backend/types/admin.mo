module {
  public type AdminSession = {
    token : Text;
    expiresAt : Int;
    email : Text;
  };

  public type AdminStats = {
    totalUsers : Int;
    totalOrders : Int;
    pendingPickups : Int;
    completedPickups : Int;
    totalRevenue : Float;
    pendingPayments : Int;
  };

  public type AdminCredentials = {
    email : Text;
    var passwordHash : Text;
    var lastPasswordReset : Int;
    var mustResetPassword : Bool;
  };

  public type RepeaterCategory = {
    userId : Principal;
    phone : Text;
    name : Text;
    totalPickups : Int;
    qualifyingOrderCount : Int;
    tier : Text;
    discountPercent : Float;
  };
};
