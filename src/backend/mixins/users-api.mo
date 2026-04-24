import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/users";
import Common "../types/common";
import UsersLib "../lib/users";

mixin (users : Map.Map<Text, Types.UserProfile>) {

  // Register a new user; returns user id on success
  public shared ({ caller }) func registerUser(
    phone : Text,
    name : Text,
    email : Text,
    password : Text,
  ) : async Common.Result<Text, Text> {
    let now = Time.now();
    UsersLib.registerUser(users, phone, name, email, password, caller, now);
  };

  // Login with phone + password; returns full profile on success
  public shared func loginUser(
    phone : Text,
    password : Text,
  ) : async Common.Result<Types.UserProfile, Text> {
    UsersLib.loginUser(users, phone, password);
  };

  // Verify OTP sent to phone after registration
  public shared func verifyOTP(
    phone : Text,
    otp : Text,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    UsersLib.verifyOTP(users, phone, otp, now);
  };

  // Setup password after OTP verification (for new users post-registration)
  public shared func setupPassword(
    phone : Text,
    otp : Text,
    newPassword : Text,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    UsersLib.setupPassword(users, phone, otp, newPassword, now);
  };

  // Reset password using OTP (forgot password flow)
  public shared func resetPasswordWithOTP(
    phone : Text,
    otp : Text,
    newPassword : Text,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    UsersLib.resetPasswordWithOTP(users, phone, otp, newPassword, now);
  };

  // Generate OTP for forgot-password flow (phone must already be registered)
  public shared func generateOTPForPasswordReset(
    phone : Text,
  ) : async Common.Result<Text, Text> {
    let now = Time.now();
    UsersLib.generateOTPForPasswordReset(users, phone, now);
  };

  // Get full user profile by Principal
  public shared query ({ caller }) func getUser(
    userId : Principal,
  ) : async Common.Result<Types.UserProfile, Text> {
    UsersLib.getUser(users, userId);
  };

  // Add an address to the caller's profile
  public shared ({ caller }) func addAddress(
    userId : Principal,
    address : Types.Address,
  ) : async Common.Result<Text, Text> {
    UsersLib.addAddress(users, userId, address);
  };

  // List all addresses for a user
  public shared query ({ caller }) func getAddresses(
    userId : Principal,
  ) : async [Types.Address] {
    UsersLib.getAddresses(users, userId);
  };

  // Update an existing address
  public shared ({ caller }) func updateAddress(
    userId : Principal,
    addressId : Text,
    address : Types.Address,
  ) : async Common.Result<Bool, Text> {
    UsersLib.updateAddress(users, userId, addressId, address);
  };

  // Generate and return OTP for prototype testing (logged to console)
  public shared func generateOTP(
    phone : Text,
  ) : async Common.Result<Text, Text> {
    let now = Time.now();
    UsersLib.generateOTP(users, phone, now);
  };
};
