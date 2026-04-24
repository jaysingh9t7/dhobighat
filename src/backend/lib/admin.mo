import Types "../types/admin";
import Common "../types/common";
import Map "mo:core/Map";

module {
  public type AdminSession = Types.AdminSession;
  public type AdminStats = Types.AdminStats;
  public type AdminCredentials = Types.AdminCredentials;
  public type RepeaterCategory = Types.RepeaterCategory;

  // Simple hash — same approach as users lib (deterministic for prototype)
  public func hashPassword(password : Text) : Text {
    var hash : Nat = 5381;
    for (c in password.toIter()) {
      let code = c.toNat32().toNat();
      hash := (hash * 33) + code;
    };
    "hash_" # hash.toText();
  };

  // Generate a pseudo-unique token from email + time fragment
  public func generateToken(email : Text) : Text {
    var hash : Nat = 0;
    for (c in email.toIter()) {
      hash := hash * 31 + c.toNat32().toNat();
    };
    "tok_" # hash.toText();
  };

  public func tierFromPickupCount(count : Int) : Text {
    if (count >= 10) { "platinum" }
    else if (count >= 4) { "gold" }
    else if (count >= 3) { "silver" }
    else if (count >= 2) { "bronze" }
    else { "standard" };
  };

  public func tierIdFromPickupCount(count : Int) : ?Text {
    if (count >= 10) { ?"tier-10pct" }
    else if (count >= 4) { ?"tier-7pct" }
    else if (count >= 3) { ?"tier-5pct" }
    else if (count >= 2) { ?"tier-2pct" }
    else { null };
  };

  public func initCredentials() : AdminCredentials {
    {
      email = "admin@mydhobighat.com";
      var passwordHash = hashPassword("Admin@DhobiGhat2024!");
      var lastPasswordReset = 0;
      var mustResetPassword = false;
    };
  };

  public func login(
    credentials : AdminCredentials,
    activeSessions : Map.Map<Text, AdminSession>,
    email : Text,
    password : Text,
    now : Int,
  ) : Common.Result<AdminSession, Text> {
    if (credentials.email != email) {
      return #err("Invalid credentials");
    };
    if (credentials.passwordHash != hashPassword(password)) {
      return #err("Invalid credentials");
    };
    let token = generateToken(email # now.toText());
    let expiresAt = now + 86_400_000_000_000; // 24 hours in nanoseconds
    let session : AdminSession = { token = token; expiresAt = expiresAt; email = email };
    activeSessions.add(token, session);
    #ok(session);
  };

  public func validateToken(
    activeSessions : Map.Map<Text, AdminSession>,
    token : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (activeSessions.get(token)) {
      case null { #err("Invalid or expired token") };
      case (?session) {
        if (now > session.expiresAt) {
          activeSessions.remove(token);
          #err("Session expired");
        } else {
          #ok(true);
        };
      };
    };
  };

  public func resetPassword(
    credentials : AdminCredentials,
    activeSessions : Map.Map<Text, AdminSession>,
    currentPassword : Text,
    newPassword : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    if (credentials.passwordHash != hashPassword(currentPassword)) {
      return #err("Current password is incorrect");
    };
    credentials.passwordHash := hashPassword(newPassword);
    credentials.lastPasswordReset := now;
    credentials.mustResetPassword := false;
    activeSessions.clear();
    #ok(true);
  };

  public func getStats(
    ordersData : {
      totalUsers : Int;
      totalOrders : Int;
      pendingPickups : Int;
      completedPickups : Int;
      totalRevenue : Float;
      pendingPayments : Int;
    }
  ) : AdminStats {
    {
      totalUsers = ordersData.totalUsers;
      totalOrders = ordersData.totalOrders;
      pendingPickups = ordersData.pendingPickups;
      completedPickups = ordersData.completedPickups;
      totalRevenue = ordersData.totalRevenue;
      pendingPayments = ordersData.pendingPayments;
    };
  };

  // pickupCounts tuple: (userId, phone, name, totalPickups, qualifyingOrderCount, discountPercent)
  public func getRepeaterCustomers(
    pickupCounts : [(Principal, Text, Text, Int, Int, Float)]
  ) : [RepeaterCategory] {
    pickupCounts.map<(Principal, Text, Text, Int, Int, Float), RepeaterCategory>(
      func((uid, phone, name, cnt, qCnt, discPct)) {
        {
          userId = uid;
          phone = phone;
          name = name;
          totalPickups = cnt;
          qualifyingOrderCount = qCnt;
          tier = tierFromPickupCount(qCnt);
          discountPercent = discPct;
        };
      }
    );
  };

  public func isPasswordResetRequired(credentials : AdminCredentials, now : Int) : Bool {
    if (credentials.mustResetPassword) { return true };
    // Require reset every 3 months (90 days in nanoseconds)
    let threeMonths : Int = 90 * 24 * 3_600_000_000_000;
    credentials.lastPasswordReset != 0 and (now - credentials.lastPasswordReset) > threeMonths;
  };
};
