import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Types "../types/users";
import Common "../types/common";

module {
  public type UserMap = Map.Map<Text, Types.UserProfile>;

  // Simple password hash — XOR-based deterministic hash for prototype
  public func hashPassword(password : Text) : Text {
    var hash : Nat = 5381;
    for (c in password.toIter()) {
      let code = c.toNat32().toNat();
      hash := (hash * 33) + code;
    };
    "hash_" # hash.toText();
  };

  // Register a new user by phone number; returns user id text or error
  public func registerUser(
    users : UserMap,
    phone : Text,
    name : Text,
    email : Text,
    password : Text,
    callerId : Principal,
    now : Int,
  ) : Common.Result<Text, Text> {
    // Check if phone already registered
    if (users.containsKey(phone)) {
      return #err("Phone number already registered");
    };
    let userId = callerId.toText();
    let profile : Types.UserProfile = {
      id = callerId;
      name = name;
      email = email;
      phone = phone;
      passwordHash = hashPassword(password);
      addresses = [];
      createdAt = now;
      isVerified = false;
      isPasswordConfigured = password != "";
      otpCode = null;
      otpExpiry = null;
    };
    users.add(phone, profile);
    #ok(userId);
  };

  // Authenticate an existing user by phone + password; returns profile or error
  public func loginUser(
    users : UserMap,
    phone : Text,
    password : Text,
  ) : Common.Result<Types.UserProfile, Text> {
    switch (users.get(phone)) {
      case null { #err("User not found") };
      case (?profile) {
        if (not profile.isVerified) {
          #err("Phone number not verified. Please verify OTP first.");
        } else if (not profile.isPasswordConfigured) {
          #err("Password not set. Please set your password first.");
        } else if (profile.passwordHash == hashPassword(password)) {
          #ok(profile);
        } else {
          #err("Invalid password");
        };
      };
    };
  };

  // Validate OTP for a given phone; returns true/false or error
  public func verifyOTP(
    users : UserMap,
    phone : Text,
    otp : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (users.get(phone)) {
      case null { #err("User not found") };
      case (?profile) {
        switch (profile.otpCode, profile.otpExpiry) {
          case (?code, ?expiry) {
            if (now > expiry) {
              #err("OTP has expired");
            } else if (code == otp) {
              // Mark verified
              let updated : Types.UserProfile = {
                profile with
                isVerified = true;
                otpCode = null;
                otpExpiry = null;
              };
              users.add(phone, updated);
              #ok(true);
            } else {
              #err("Invalid OTP");
            };
          };
          case _ { #err("No OTP generated for this phone") };
        };
      };
    };
  };

  // Setup password after OTP verification (new users); marks isPasswordConfigured = true
  public func setupPassword(
    users : UserMap,
    phone : Text,
    otp : Text,
    newPassword : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (users.get(phone)) {
      case null { #err("User not found") };
      case (?profile) {
        // Verify OTP first
        switch (profile.otpCode, profile.otpExpiry) {
          case (?code, ?expiry) {
            if (now > expiry) {
              return #err("OTP has expired");
            };
            if (code != otp) {
              return #err("Invalid OTP");
            };
          };
          case _ {
            // Allow password setup if already verified (OTP already consumed)
            if (not profile.isVerified) {
              return #err("Phone not verified. Please verify OTP first.");
            };
          };
        };
        if (newPassword.size() < 6) {
          return #err("Password must be at least 6 characters");
        };
        let updated : Types.UserProfile = {
          profile with
          passwordHash = hashPassword(newPassword);
          isVerified = true;
          isPasswordConfigured = true;
          otpCode = null;
          otpExpiry = null;
        };
        users.add(phone, updated);
        #ok(true);
      };
    };
  };

  // Reset password using OTP (forgot password flow); OTP must be valid
  public func resetPasswordWithOTP(
    users : UserMap,
    phone : Text,
    otp : Text,
    newPassword : Text,
    now : Int,
  ) : Common.Result<Bool, Text> {
    switch (users.get(phone)) {
      case null { #err("User not found") };
      case (?profile) {
        switch (profile.otpCode, profile.otpExpiry) {
          case (?code, ?expiry) {
            if (now > expiry) {
              return #err("OTP has expired");
            };
            if (code != otp) {
              return #err("Invalid OTP");
            };
          };
          case _ { return #err("No OTP generated for this phone. Please request a new OTP.") };
        };
        if (newPassword.size() < 6) {
          return #err("Password must be at least 6 characters");
        };
        let updated : Types.UserProfile = {
          profile with
          passwordHash = hashPassword(newPassword);
          isPasswordConfigured = true;
          otpCode = null;
          otpExpiry = null;
        };
        users.add(phone, updated);
        #ok(true);
      };
    };
  };

  // Retrieve a user profile by Principal id
  public func getUser(
    users : UserMap,
    userId : Principal,
  ) : Common.Result<Types.UserProfile, Text> {
    let target = userId.toText();
    var found : ?Types.UserProfile = null;
    for ((_, profile) in users.entries()) {
      if (profile.id.toText() == target) {
        found := ?profile;
      };
    };
    switch (found) {
      case null { #err("User not found") };
      case (?p) { #ok(p) };
    };
  };

  // Add a new address to a user's address list; returns new address id or error
  public func addAddress(
    users : UserMap,
    userId : Principal,
    address : Types.Address,
  ) : Common.Result<Text, Text> {
    var phone : ?Text = null;
    for ((ph, profile) in users.entries()) {
      if (profile.id.toText() == userId.toText()) {
        phone := ?ph;
      };
    };
    switch (phone) {
      case null { #err("User not found") };
      case (?ph) {
        switch (users.get(ph)) {
          case null { #err("User not found") };
          case (?profile) {
            let addrId = address.id;
            let updated : Types.UserProfile = {
              profile with
              addresses = profile.addresses.concat([address]);
            };
            users.add(ph, updated);
            #ok(addrId);
          };
        };
      };
    };
  };

  // Return all addresses for a user
  public func getAddresses(
    users : UserMap,
    userId : Principal,
  ) : [Types.Address] {
    for ((_, profile) in users.entries()) {
      if (profile.id.toText() == userId.toText()) {
        return profile.addresses;
      };
    };
    [];
  };

  // Update an existing address for a user; returns success or error
  public func updateAddress(
    users : UserMap,
    userId : Principal,
    addressId : Text,
    address : Types.Address,
  ) : Common.Result<Bool, Text> {
    var phone : ?Text = null;
    for ((ph, profile) in users.entries()) {
      if (profile.id.toText() == userId.toText()) {
        phone := ?ph;
      };
    };
    switch (phone) {
      case null { #err("User not found") };
      case (?ph) {
        switch (users.get(ph)) {
          case null { #err("User not found") };
          case (?profile) {
            let newAddrs = profile.addresses.map(func(a : Types.Address) : Types.Address {
              if (a.id == addressId) { address } else { a };
            });
            let updated : Types.UserProfile = { profile with addresses = newAddrs };
            users.add(ph, updated);
            #ok(true);
          };
        };
      };
    };
  };

  // Generate and store a 6-digit OTP for a phone; returns the OTP or error
  public func generateOTP(
    users : UserMap,
    phone : Text,
    now : Int,
  ) : Common.Result<Text, Text> {
    switch (users.get(phone)) {
      case null { #err("User not found. Please register first.") };
      case (?profile) {
        // Derive a pseudo-random 6-digit OTP from phone + timestamp
        var hash : Nat = 0;
        for (c in phone.toIter()) {
          hash := hash * 31 + c.toNat32().toNat();
        };
        // Mix in time to vary between calls
        let timeComponent = Int.abs(now);
        hash := (hash + timeComponent) % 1_000_000;
        // Zero-pad to 6 digits
        let raw = hash.toText();
        let otp = if (raw.size() < 6) {
          let pad = "000000";
          Text.fromIter(pad.toIter().take(6 - raw.size())).concat(raw);
        } else { raw };
        let expiry = now + 300_000_000_000; // 5 minutes in nanoseconds
        let updated : Types.UserProfile = {
          profile with
          otpCode = ?otp;
          otpExpiry = ?expiry;
        };
        users.add(phone, updated);
        #ok(otp);
      };
    };
  };

  // Generate OTP for forgot-password flow (phone must be registered)
  public func generateOTPForPasswordReset(
    users : UserMap,
    phone : Text,
    now : Int,
  ) : Common.Result<Text, Text> {
    // Re-uses generateOTP — same logic, same validation
    generateOTP(users, phone, now);
  };
};
