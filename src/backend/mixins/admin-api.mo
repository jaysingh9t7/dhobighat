import Types "../types/admin";
import TypesPickup "../types/pickups";
import TypesPayment "../types/payments";
import TypesUser "../types/users";
import Common "../types/common";
import AdminLib "../lib/admin";
import PickupsLib "../lib/pickups";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  adminCredentials : { var value : ?Types.AdminCredentials },
  adminSessions : Map.Map<Text, Types.AdminSession>,
  pickups : Map.Map<Text, TypesPickup.PickupRequest>,
  payments : List.List<TypesPayment.PaymentRecord>,
  users : Map.Map<Text, TypesUser.UserProfile>,
  customerDiscounts : Map.Map<Principal, TypesPayment.CustomerDiscount>,
  discountTiers : Map.Map<Text, TypesPayment.DiscountTier>,
  qualifyingCounts : Map.Map<Principal, Nat>,
) {

  public shared func adminLogin(email : Text, password : Text) : async Common.Result<Types.AdminSession, Text> {
    let now = Time.now();
    let creds = switch (adminCredentials.value) {
      case null {
        let c = AdminLib.initCredentials();
        adminCredentials.value := ?c;
        c;
      };
      case (?c) { c };
    };
    AdminLib.login(creds, adminSessions, email, password, now);
  };

  public shared func validateAdminToken(token : Text) : async Common.Result<Bool, Text> {
    let now = Time.now();
    AdminLib.validateToken(adminSessions, token, now);
  };

  public shared func resetAdminPassword(currentPassword : Text, newPassword : Text) : async Common.Result<Bool, Text> {
    let now = Time.now();
    switch (adminCredentials.value) {
      case null { #err("Admin not initialized") };
      case (?creds) {
        AdminLib.resetPassword(creds, adminSessions, currentPassword, newPassword, now);
      };
    };
  };

  public shared func getAdminStats() : async Types.AdminStats {
    let allPickups = PickupsLib.getAllPickups(pickups);
    var pending : Int = 0;
    var completed : Int = 0;
    var revenue : Float = 0.0;
    var pendingPay : Int = 0;

    for (p in allPickups.values()) {
      switch (p.status) {
        case (#pending) { pending += 1 };
        case (#dropDone) { completed += 1 };
        case _ {};
      };
      if (not p.isPaid) { pendingPay += 1 };
      switch (p.totalAmount) {
        case (?amt) { revenue += amt };
        case null {};
      };
    };

    AdminLib.getStats({
      totalUsers = users.size().toInt();
      totalOrders = allPickups.size().toInt();
      pendingPickups = pending;
      completedPickups = completed;
      totalRevenue = revenue;
      pendingPayments = pendingPay;
    });
  };

  public shared func getRepeaterCustomers() : async [Types.RepeaterCategory] {
    // Count total pickups per user
    let totalCounts = Map.empty<Principal, Int>();
    let allPickups = PickupsLib.getAllPickups(pickups);
    for (p in allPickups.values()) {
      let cur = switch (totalCounts.get(p.userId)) {
        case null { 0 };
        case (?n) { n };
      };
      totalCounts.add(p.userId, cur + 1);
    };

    // Build rows from the union of users who have any pickups
    let rows = totalCounts.entries()
      .map<(Principal, Int), (Principal, Text, Text, Int, Int, Float)>(func((uid, cnt) : (Principal, Int)) {
        var phone = "";
        var name = "";
        for ((_, profile) in users.entries()) {
          if (profile.id.toText() == uid.toText()) {
            phone := profile.phone;
            name := profile.name;
          };
        };
        // Qualifying order count (large/multi-service orders only)
        let qCnt : Int = switch (qualifyingCounts.get(uid)) {
          case null { 0 };
          case (?n) { n.toInt() };
        };
        // Current discount percentage
        let discPct : Float = switch (customerDiscounts.get(uid)) {
          case null { 0.0 };
          case (?cd) {
            switch (discountTiers.get(cd.tierId)) {
              case null { 0.0 };
              case (?tier) { tier.percentage };
            };
          };
        };
        (uid, phone, name, cnt, qCnt, discPct);
      })
      .toArray();
    AdminLib.getRepeaterCustomers(rows);
  };

  public shared func checkPasswordResetRequired() : async Bool {
    let now = Time.now();
    switch (adminCredentials.value) {
      case null { false };
      case (?creds) { AdminLib.isPasswordResetRequired(creds, now) };
    };
  };

  public shared func initAdminCredentials() : async () {
    switch (adminCredentials.value) {
      case null {
        adminCredentials.value := ?AdminLib.initCredentials();
      };
      case (?_) {};
    };
  };
};
