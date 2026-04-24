module {
  public type Address = {
    id : Text;
    building : Text;
    flatNo : Text;
    society : Text;
    landmark : Text;
    pinCode : Text;
    city : Text;
    state : Text;
    country : Text;
    isDefault : Bool;
  };

  public type UserProfile = {
    id : Principal;
    name : Text;
    email : Text;
    phone : Text;
    passwordHash : Text;
    addresses : [Address];
    createdAt : Int;
    isVerified : Bool;
    isPasswordConfigured : Bool;
    otpCode : ?Text;
    otpExpiry : ?Int;
  };
};
