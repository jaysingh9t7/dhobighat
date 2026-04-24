import Types "../types/pricing";
import PricingLib "../lib/pricing";
import List "mo:core/List";
import Common "../types/common";
import Time "mo:core/Time";

mixin (prices : List.List<Types.PriceItem>) {

  /// Return all price items across every category
  public query func getAllPrices() : async [Types.PriceItem] {
    PricingLib.getAllPrices(prices);
  };

  /// Return all price items for a specific category
  public query func getPricesByCategory(category : Types.PriceCategory) : async [Types.PriceItem] {
    PricingLib.getPricesByCategory(prices, category);
  };

  /// Admin: update price fields for one item by id
  public shared func updatePrice(
    itemId : Text,
    ironingPrice : ?Float,
    steamIroningPrice : ?Float,
    dryCleaningPrice : ?Float,
    washFoldPrice : ?Float,
  ) : async Common.Result<Bool, Text> {
    let now = Time.now();
    PricingLib.updatePrice(prices, itemId, ironingPrice, steamIroningPrice, dryCleaningPrice, washFoldPrice, now);
  };

  /// Admin: add a brand-new price item
  public shared func addPriceItem(item : Types.PriceItem) : async Common.Result<Text, Text> {
    PricingLib.addPriceItem(prices, item);
  };

  /// Admin: (re-)seed the canonical default price list
  public shared func initDefaultPrices() : async () {
    let now = Time.now();
    PricingLib.initDefaultPrices(prices, now);
  };

};
