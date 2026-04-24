module {

  public type PriceCategory = {
    #men;
    #women;
    #kids;
    #household;
    #shoes;
    #bulk;
  };

  public type PriceUnit = {
    #perPiece;
    #perKg;
    #perMeter;
    #perSeat;
  };

  /// Shared (immutable) PriceItem for API boundary
  public type PriceItem = {
    id : Text;
    category : PriceCategory;
    itemName : Text;
    ironingPrice : ?Float;
    steamIroningPrice : ?Float;
    dryCleaningPrice : ?Float;
    washFoldPrice : ?Float;
    unit : PriceUnit;
    updatedAt : Int;
  };

};
