import { Layout } from "@/components/Layout";
import { useAllPrices } from "@/hooks/useQueries";
import { PRICE_CATEGORIES } from "@/types";
import type { PriceCategory, PriceItem } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Hardcoded fallback data from pamphlet (used when backend not loaded)
// ---------------------------------------------------------------------------
const FALLBACK_PRICES: PriceItem[] = [
  // MEN
  {
    id: "m-1",
    category: "men",
    name: "Shirt",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 60,
  },
  {
    id: "m-2",
    category: "men",
    name: "Pants",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 60,
  },
  {
    id: "m-3",
    category: "men",
    name: "Pajama",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115,
  },
  {
    id: "m-4",
    category: "men",
    name: "Underwear",
    steamIron: undefined,
    washIron: undefined,
    dryCleaning: 45,
  },
  {
    id: "m-5",
    category: "men",
    name: "Long Kurta",
    steamIron: 15,
    washIron: 30,
    dryCleaning: 75,
  },
  {
    id: "m-6",
    category: "men",
    name: "Blazer / Coat",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 265,
  },
  {
    id: "m-7",
    category: "men",
    name: "V. Jacket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 145,
  },
  {
    id: "m-8",
    category: "men",
    name: "Sherwani",
    steamIron: 150,
    washIron: 120,
    dryCleaning: 265,
  },
  {
    id: "m-9",
    category: "men",
    name: "Long Coat",
    steamIron: 150,
    washIron: 120,
    dryCleaning: 190,
  },
  {
    id: "m-10",
    category: "men",
    name: "Jacket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 165,
  },
  {
    id: "m-11",
    category: "men",
    name: "Sweater",
    steamIron: 50,
    washIron: 75,
    dryCleaning: 135,
  },
  // WOMEN
  {
    id: "w-1",
    category: "women",
    name: "Tops / Kurtis",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115,
  },
  {
    id: "w-2",
    category: "women",
    name: "Salwar",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115,
  },
  {
    id: "w-3",
    category: "women",
    name: "Kameez",
    steamIron: 20,
    washIron: 30,
    dryCleaning: 140,
  },
  {
    id: "w-4",
    category: "women",
    name: "Dupatta / Blouse",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 95,
  },
  {
    id: "w-5",
    category: "women",
    name: "One Piece Dress",
    steamIron: 50,
    washIron: 80,
    dryCleaning: 150,
  },
  {
    id: "w-6",
    category: "women",
    name: "Sarees",
    steamIron: 40,
    washIron: 60,
    dryCleaning: 190,
  },
  {
    id: "w-7",
    category: "women",
    name: "Designer Sarees",
    steamIron: 60,
    washIron: 100,
    dryCleaning: 250,
  },
  {
    id: "w-8",
    category: "women",
    name: "Skirt",
    steamIron: 30,
    washIron: 50,
    dryCleaning: 145,
  },
  {
    id: "w-9",
    category: "women",
    name: "Ghagra",
    steamIron: 150,
    washIron: 100,
    dryCleaning: 265,
  },
  // KIDS (using same column structure, prices estimated at ~60% of men)
  {
    id: "k-1",
    category: "kids",
    name: "Shirt",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40,
  },
  {
    id: "k-2",
    category: "kids",
    name: "T-Shirt",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40,
  },
  {
    id: "k-3",
    category: "kids",
    name: "Pants / Trouser",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40,
  },
  {
    id: "k-4",
    category: "kids",
    name: "Frock / Dress",
    steamIron: 15,
    washIron: 25,
    dryCleaning: 75,
  },
  {
    id: "k-5",
    category: "kids",
    name: "Kurta",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 50,
  },
  {
    id: "k-6",
    category: "kids",
    name: "Jacket",
    steamIron: 40,
    washIron: 60,
    dryCleaning: 95,
  },
  {
    id: "k-7",
    category: "kids",
    name: "Sweater",
    steamIron: 30,
    washIron: 50,
    dryCleaning: 80,
  },
  {
    id: "k-8",
    category: "kids",
    name: "School Uniform (Set)",
    steamIron: 20,
    washIron: 35,
    dryCleaning: 90,
  },
  // HOUSEHOLD
  {
    id: "h-1",
    category: "household",
    name: "Towel",
    steamIron: 20,
    washIron: 40,
    dryCleaning: 75,
  },
  {
    id: "h-2",
    category: "household",
    name: "Shawl",
    steamIron: 50,
    washIron: 60,
    dryCleaning: 135,
  },
  {
    id: "h-3",
    category: "household",
    name: "Soft Toys",
    steamIron: undefined,
    washIron: undefined,
    dryCleaning: 75,
  },
  {
    id: "h-4",
    category: "household",
    name: "Bedsheets",
    steamIron: 40,
    washIron: 75,
    dryCleaning: 115,
  },
  {
    id: "h-5",
    category: "household",
    name: "Pillow Cover",
    steamIron: 20,
    washIron: 30,
    dryCleaning: 45,
  },
  {
    id: "h-6",
    category: "household",
    name: "Bed Covers",
    steamIron: 80,
    washIron: 100,
    dryCleaning: 265,
  },
  {
    id: "h-7",
    category: "household",
    name: "Single Rajai",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 225,
  },
  {
    id: "h-8",
    category: "household",
    name: "Double Rajai",
    steamIron: 120,
    washIron: 150,
    dryCleaning: 265,
  },
  {
    id: "h-9",
    category: "household",
    name: "Single Blanket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 190,
  },
  {
    id: "h-10",
    category: "household",
    name: "Double Blanket",
    steamIron: 120,
    washIron: 150,
    dryCleaning: 265,
  },
  {
    id: "h-11",
    category: "household",
    name: "Curtains (per m)",
    steamIron: 50,
    washIron: undefined,
    dryCleaning: 145,
  },
  {
    id: "h-12",
    category: "household",
    name: "Curtain Sheets (per m)",
    steamIron: 40,
    washIron: undefined,
    dryCleaning: 110,
  },
  {
    id: "h-13",
    category: "household",
    name: "Carpet (per m)",
    steamIron: undefined,
    washIron: undefined,
    dryCleaning: 55,
  },
  {
    id: "h-14",
    category: "household",
    name: "Sofa (per seat)",
    steamIron: undefined,
    washIron: undefined,
    dryCleaning: 340,
  },
  {
    id: "h-15",
    category: "household",
    name: "Dining Chairs (per seat)",
    steamIron: undefined,
    washIron: undefined,
    dryCleaning: 190,
  },
  // SHOES
  { id: "s-1", category: "shoes", name: "Sport Shoes", dryCleaning: 350 },
  { id: "s-2", category: "shoes", name: "Canvas Shoes", dryCleaning: 400 },
  { id: "s-3", category: "shoes", name: "Leather Shoes", dryCleaning: 500 },
  { id: "s-4", category: "shoes", name: "Suede Leather", dryCleaning: 550 },
  { id: "s-5", category: "shoes", name: "Boots", dryCleaning: 800 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(val: number | undefined): string {
  if (val == null || val === 0) return "N/A";
  return `₹${val}`;
}

function isHouseholdUnit(name: string): boolean {
  return name.includes("per m") || name.includes("per seat");
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ClothingTableProps {
  items: PriceItem[];
}

function ClothingTable({ items }: ClothingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[360px]">
        <thead>
          <tr className="gradient-primary text-primary-foreground">
            <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">
              Item
            </th>
            <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
              Ironing
            </th>
            <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
              Steam Iron
            </th>
            <th className="text-right px-3 py-3 font-semibold whitespace-nowrap rounded-tr-lg">
              Dry Clean
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item.id}
              className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
              data-ocid={`price-row-${item.id}`}
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {item.name}
              </td>
              <td className="px-3 py-3 text-right text-foreground tabular-nums">
                {formatPrice(item.washIron)}
              </td>
              <td className="px-3 py-3 text-right text-foreground tabular-nums">
                {formatPrice(item.steamIron)}
              </td>
              <td className="px-3 py-3 text-right font-semibold text-foreground tabular-nums">
                {formatPrice(item.dryCleaning)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShoesTable({ items }: ClothingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[280px]">
        <thead>
          <tr className="gradient-primary text-primary-foreground">
            <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">
              Shoe Type
            </th>
            <th className="text-right px-4 py-3 font-semibold rounded-tr-lg">
              Cleaning Price
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item.id}
              className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
              data-ocid={`price-row-${item.id}`}
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {item.name}
              </td>
              <td className="px-4 py-3 text-right font-bold text-gold tabular-nums">
                {formatPrice(item.dryCleaning)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function PricesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<PriceCategory>("men");
  const { data: backendPrices, isLoading } = useAllPrices();

  // Use backend data if available and non-empty, else fallback to hardcoded
  const allPrices =
    backendPrices && backendPrices.length > 0 ? backendPrices : FALLBACK_PRICES;

  const filtered = allPrices.filter((p) => p.category === activeCategory);
  const isShoes = activeCategory === "shoes";
  // Check if household has unit items
  const hasUnits =
    activeCategory === "household" &&
    filtered.some((i) => isHouseholdUnit(i.name));

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 pb-12">
        {/* Back button */}
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
          data-ocid="prices-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-foreground mb-1">
            Price List
          </h1>
          <p className="text-muted-foreground text-sm">
            All prices in Indian Rupees (₹) per item
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none"
          role="tablist"
          aria-label="Price categories"
        >
          {PRICE_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 transition-smooth border
                ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-elevated"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }
              `}
              data-ocid={`prices-tab-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-11 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
            {isShoes ? (
              <ShoesTable items={filtered} />
            ) : (
              <ClothingTable items={filtered} />
            )}
          </div>
        )}

        {/* Unit note for household */}
        {hasUnits && !isLoading && (
          <p className="text-xs text-muted-foreground mt-2 px-1">
            * Items marked with <em>"per m"</em> are charged per metre. Items
            marked with <em>"per seat"</em> are charged per seat/piece.
          </p>
        )}

        {/* Bulk Rates section */}
        <div className="mt-8">
          <h2 className="font-display font-bold text-base text-foreground mb-3">
            Bulk Rates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-subtle">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Wash + Fold
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Per kilogram
                </p>
              </div>
              <span className="text-gold font-bold text-xl tabular-nums">
                ₹160
                <span className="text-muted-foreground text-xs font-normal">
                  /kg
                </span>
              </span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-subtle">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Wash + Fold + Iron
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Per kilogram
                </p>
              </div>
              <span className="text-gold font-bold text-xl tabular-nums">
                ₹200
                <span className="text-muted-foreground text-xs font-normal">
                  /kg
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-6 px-1 leading-relaxed">
          * Prices are indicative. Final charges depend on item condition and
          quantity. Express service attracts additional charges. Prices subject
          to change — please confirm at time of pickup.
        </p>
      </div>
    </Layout>
  );
}
