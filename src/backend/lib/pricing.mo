import Types "../types/pricing";
import Common "../types/common";
import List "mo:core/List";

module {

  public type PriceItem = Types.PriceItem;
  public type PriceCategory = Types.PriceCategory;
  public type PricingResult<T> = Common.Result<T, Text>;

  /// Return all price items as an immutable array
  public func getAllPrices(prices : List.List<PriceItem>) : [PriceItem] {
    prices.toArray();
  };

  /// Return price items filtered by category
  public func getPricesByCategory(prices : List.List<PriceItem>, category : PriceCategory) : [PriceItem] {
    prices.filter(func(item) { item.category == category }).toArray();
  };

  /// Update pricing fields for a given item id
  public func updatePrice(
    prices : List.List<PriceItem>,
    itemId : Text,
    ironingPrice : ?Float,
    steamIroningPrice : ?Float,
    dryCleaningPrice : ?Float,
    washFoldPrice : ?Float,
    now : Int,
  ) : PricingResult<Bool> {
    var found = false;
    prices.mapInPlace(
      func(item) {
        if (item.id == itemId) {
          found := true;
          {
            item with
            ironingPrice = ironingPrice;
            steamIroningPrice = steamIroningPrice;
            dryCleaningPrice = dryCleaningPrice;
            washFoldPrice = washFoldPrice;
            updatedAt = now;
          };
        } else { item };
      }
    );
    if (found) { #ok(true) } else { #err("Price item not found: " # itemId) };
  };

  /// Add a new price item
  public func addPriceItem(prices : List.List<PriceItem>, item : PriceItem) : PricingResult<Text> {
    let exists = prices.find(func(p) { p.id == item.id });
    switch (exists) {
      case (?_) { #err("Price item already exists: " # item.id) };
      case null {
        prices.add(item);
        #ok(item.id);
      };
    };
  };

  /// Seed the list with all default DhobiGhat prices (idempotent — clears first)
  public func initDefaultPrices(prices : List.List<PriceItem>, now : Int) {
    prices.clear();

    // MEN
    prices.add({ id = "men-kurta-plain"; category = #men; itemName = "Kurta Plain"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?60.0; washFoldPrice = ?30.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-kurta-print"; category = #men; itemName = "Kurta Printed"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?70.0; washFoldPrice = ?30.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-shirt"; category = #men; itemName = "Shirt"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?60.0; washFoldPrice = ?25.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-tshirt"; category = #men; itemName = "T-Shirt"; ironingPrice = ?8.0; steamIroningPrice = ?12.0; dryCleaningPrice = ?50.0; washFoldPrice = ?20.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-trouser"; category = #men; itemName = "Trouser / Pant"; ironingPrice = ?12.0; steamIroningPrice = ?18.0; dryCleaningPrice = ?70.0; washFoldPrice = ?30.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-jeans"; category = #men; itemName = "Jeans"; ironingPrice = ?12.0; steamIroningPrice = ?18.0; dryCleaningPrice = ?80.0; washFoldPrice = ?35.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-suit"; category = #men; itemName = "Suit (2 pcs)"; ironingPrice = ?50.0; steamIroningPrice = ?70.0; dryCleaningPrice = ?250.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-blazer"; category = #men; itemName = "Blazer / Coat"; ironingPrice = ?30.0; steamIroningPrice = ?45.0; dryCleaningPrice = ?150.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-sherwani"; category = #men; itemName = "Sherwani"; ironingPrice = ?80.0; steamIroningPrice = ?100.0; dryCleaningPrice = ?350.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });
    prices.add({ id = "men-underwear"; category = #men; itemName = "Underwear / Socks"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = null; washFoldPrice = ?10.0; unit = #perPiece; updatedAt = now });

    // WOMEN
    prices.add({ id = "women-saree-plain"; category = #women; itemName = "Saree Plain"; ironingPrice = ?20.0; steamIroningPrice = ?30.0; dryCleaningPrice = ?120.0; washFoldPrice = ?60.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-saree-silk"; category = #women; itemName = "Saree Silk"; ironingPrice = ?30.0; steamIroningPrice = ?45.0; dryCleaningPrice = ?200.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-salwar-suit"; category = #women; itemName = "Salwar Suit (3 pcs)"; ironingPrice = ?30.0; steamIroningPrice = ?45.0; dryCleaningPrice = ?180.0; washFoldPrice = ?70.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-kurta"; category = #women; itemName = "Kurta"; ironingPrice = ?12.0; steamIroningPrice = ?18.0; dryCleaningPrice = ?80.0; washFoldPrice = ?30.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-lehenga"; category = #women; itemName = "Lehenga (2 pcs)"; ironingPrice = ?60.0; steamIroningPrice = ?80.0; dryCleaningPrice = ?400.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-blouse"; category = #women; itemName = "Blouse"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?60.0; washFoldPrice = ?25.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-dupatta"; category = #women; itemName = "Dupatta"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?50.0; washFoldPrice = ?20.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-top"; category = #women; itemName = "Top / T-Shirt"; ironingPrice = ?8.0; steamIroningPrice = ?12.0; dryCleaningPrice = ?50.0; washFoldPrice = ?20.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "women-gown"; category = #women; itemName = "Gown / Frock"; ironingPrice = ?40.0; steamIroningPrice = ?55.0; dryCleaningPrice = ?250.0; washFoldPrice = null; unit = #perPiece; updatedAt = now });

    // KIDS
    prices.add({ id = "kids-shirt"; category = #kids; itemName = "Shirt / T-Shirt"; ironingPrice = ?6.0; steamIroningPrice = ?10.0; dryCleaningPrice = ?40.0; washFoldPrice = ?15.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "kids-trouser"; category = #kids; itemName = "Trouser / Jeans"; ironingPrice = ?6.0; steamIroningPrice = ?10.0; dryCleaningPrice = ?40.0; washFoldPrice = ?15.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "kids-frock"; category = #kids; itemName = "Frock / Dress"; ironingPrice = ?10.0; steamIroningPrice = ?15.0; dryCleaningPrice = ?60.0; washFoldPrice = ?20.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "kids-uniform"; category = #kids; itemName = "School Uniform (set)"; ironingPrice = ?15.0; steamIroningPrice = ?20.0; dryCleaningPrice = ?80.0; washFoldPrice = ?30.0; unit = #perPiece; updatedAt = now });

    // HOUSEHOLD
    prices.add({ id = "hh-bedsheet-single"; category = #household; itemName = "Bed Sheet Single"; ironingPrice = ?20.0; steamIroningPrice = ?30.0; dryCleaningPrice = ?80.0; washFoldPrice = ?40.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-bedsheet-double"; category = #household; itemName = "Bed Sheet Double"; ironingPrice = ?30.0; steamIroningPrice = ?45.0; dryCleaningPrice = ?120.0; washFoldPrice = ?60.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-pillow-cover"; category = #household; itemName = "Pillow Cover"; ironingPrice = ?5.0; steamIroningPrice = ?8.0; dryCleaningPrice = ?30.0; washFoldPrice = ?15.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-curtain-small"; category = #household; itemName = "Curtain Small (up to 4ft)"; ironingPrice = ?20.0; steamIroningPrice = ?30.0; dryCleaningPrice = ?80.0; washFoldPrice = ?40.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-curtain-large"; category = #household; itemName = "Curtain Large (above 4ft)"; ironingPrice = ?30.0; steamIroningPrice = ?45.0; dryCleaningPrice = ?120.0; washFoldPrice = ?60.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-blanket"; category = #household; itemName = "Blanket / Quilt"; ironingPrice = null; steamIroningPrice = ?50.0; dryCleaningPrice = ?200.0; washFoldPrice = ?100.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-sofa-cover"; category = #household; itemName = "Sofa Cover"; ironingPrice = ?20.0; steamIroningPrice = ?30.0; dryCleaningPrice = ?100.0; washFoldPrice = ?50.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "hh-mat"; category = #household; itemName = "Carpet / Mat (per sq ft)"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = ?15.0; washFoldPrice = ?10.0; unit = #perMeter; updatedAt = now });

    // SHOES
    prices.add({ id = "shoes-leather"; category = #shoes; itemName = "Leather Shoes / Formal"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = ?150.0; washFoldPrice = ?80.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "shoes-sports"; category = #shoes; itemName = "Sports / Canvas Shoes"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = ?120.0; washFoldPrice = ?60.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "shoes-sandals"; category = #shoes; itemName = "Sandals / Slippers"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = ?80.0; washFoldPrice = ?40.0; unit = #perPiece; updatedAt = now });
    prices.add({ id = "shoes-boots"; category = #shoes; itemName = "Boots / High Ankle"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = ?200.0; washFoldPrice = ?100.0; unit = #perPiece; updatedAt = now });

    // BULK
    prices.add({ id = "bulk-wash-fold"; category = #bulk; itemName = "Bulk Wash & Fold (per kg)"; ironingPrice = null; steamIroningPrice = null; dryCleaningPrice = null; washFoldPrice = ?60.0; unit = #perKg; updatedAt = now });
  };

};
