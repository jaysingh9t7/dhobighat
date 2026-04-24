import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { L as Layout } from "./Layout-OLXsu3gU.js";
import { d as useAllPrices } from "./useQueries-DmaS4Psf.js";
import { P as PRICE_CATEGORIES } from "./index-89CnAFbC.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import "./createLucideIcon-CkU-QaFE.js";
const FALLBACK_PRICES = [
  // MEN
  {
    id: "m-1",
    category: "men",
    name: "Shirt",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 60
  },
  {
    id: "m-2",
    category: "men",
    name: "Pants",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 60
  },
  {
    id: "m-3",
    category: "men",
    name: "Pajama",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115
  },
  {
    id: "m-4",
    category: "men",
    name: "Underwear",
    steamIron: void 0,
    washIron: void 0,
    dryCleaning: 45
  },
  {
    id: "m-5",
    category: "men",
    name: "Long Kurta",
    steamIron: 15,
    washIron: 30,
    dryCleaning: 75
  },
  {
    id: "m-6",
    category: "men",
    name: "Blazer / Coat",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 265
  },
  {
    id: "m-7",
    category: "men",
    name: "V. Jacket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 145
  },
  {
    id: "m-8",
    category: "men",
    name: "Sherwani",
    steamIron: 150,
    washIron: 120,
    dryCleaning: 265
  },
  {
    id: "m-9",
    category: "men",
    name: "Long Coat",
    steamIron: 150,
    washIron: 120,
    dryCleaning: 190
  },
  {
    id: "m-10",
    category: "men",
    name: "Jacket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 165
  },
  {
    id: "m-11",
    category: "men",
    name: "Sweater",
    steamIron: 50,
    washIron: 75,
    dryCleaning: 135
  },
  // WOMEN
  {
    id: "w-1",
    category: "women",
    name: "Tops / Kurtis",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115
  },
  {
    id: "w-2",
    category: "women",
    name: "Salwar",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 115
  },
  {
    id: "w-3",
    category: "women",
    name: "Kameez",
    steamIron: 20,
    washIron: 30,
    dryCleaning: 140
  },
  {
    id: "w-4",
    category: "women",
    name: "Dupatta / Blouse",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 95
  },
  {
    id: "w-5",
    category: "women",
    name: "One Piece Dress",
    steamIron: 50,
    washIron: 80,
    dryCleaning: 150
  },
  {
    id: "w-6",
    category: "women",
    name: "Sarees",
    steamIron: 40,
    washIron: 60,
    dryCleaning: 190
  },
  {
    id: "w-7",
    category: "women",
    name: "Designer Sarees",
    steamIron: 60,
    washIron: 100,
    dryCleaning: 250
  },
  {
    id: "w-8",
    category: "women",
    name: "Skirt",
    steamIron: 30,
    washIron: 50,
    dryCleaning: 145
  },
  {
    id: "w-9",
    category: "women",
    name: "Ghagra",
    steamIron: 150,
    washIron: 100,
    dryCleaning: 265
  },
  // KIDS (using same column structure, prices estimated at ~60% of men)
  {
    id: "k-1",
    category: "kids",
    name: "Shirt",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40
  },
  {
    id: "k-2",
    category: "kids",
    name: "T-Shirt",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40
  },
  {
    id: "k-3",
    category: "kids",
    name: "Pants / Trouser",
    steamIron: 8,
    washIron: 15,
    dryCleaning: 40
  },
  {
    id: "k-4",
    category: "kids",
    name: "Frock / Dress",
    steamIron: 15,
    washIron: 25,
    dryCleaning: 75
  },
  {
    id: "k-5",
    category: "kids",
    name: "Kurta",
    steamIron: 10,
    washIron: 20,
    dryCleaning: 50
  },
  {
    id: "k-6",
    category: "kids",
    name: "Jacket",
    steamIron: 40,
    washIron: 60,
    dryCleaning: 95
  },
  {
    id: "k-7",
    category: "kids",
    name: "Sweater",
    steamIron: 30,
    washIron: 50,
    dryCleaning: 80
  },
  {
    id: "k-8",
    category: "kids",
    name: "School Uniform (Set)",
    steamIron: 20,
    washIron: 35,
    dryCleaning: 90
  },
  // HOUSEHOLD
  {
    id: "h-1",
    category: "household",
    name: "Towel",
    steamIron: 20,
    washIron: 40,
    dryCleaning: 75
  },
  {
    id: "h-2",
    category: "household",
    name: "Shawl",
    steamIron: 50,
    washIron: 60,
    dryCleaning: 135
  },
  {
    id: "h-3",
    category: "household",
    name: "Soft Toys",
    steamIron: void 0,
    washIron: void 0,
    dryCleaning: 75
  },
  {
    id: "h-4",
    category: "household",
    name: "Bedsheets",
    steamIron: 40,
    washIron: 75,
    dryCleaning: 115
  },
  {
    id: "h-5",
    category: "household",
    name: "Pillow Cover",
    steamIron: 20,
    washIron: 30,
    dryCleaning: 45
  },
  {
    id: "h-6",
    category: "household",
    name: "Bed Covers",
    steamIron: 80,
    washIron: 100,
    dryCleaning: 265
  },
  {
    id: "h-7",
    category: "household",
    name: "Single Rajai",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 225
  },
  {
    id: "h-8",
    category: "household",
    name: "Double Rajai",
    steamIron: 120,
    washIron: 150,
    dryCleaning: 265
  },
  {
    id: "h-9",
    category: "household",
    name: "Single Blanket",
    steamIron: 100,
    washIron: 120,
    dryCleaning: 190
  },
  {
    id: "h-10",
    category: "household",
    name: "Double Blanket",
    steamIron: 120,
    washIron: 150,
    dryCleaning: 265
  },
  {
    id: "h-11",
    category: "household",
    name: "Curtains (per m)",
    steamIron: 50,
    washIron: void 0,
    dryCleaning: 145
  },
  {
    id: "h-12",
    category: "household",
    name: "Curtain Sheets (per m)",
    steamIron: 40,
    washIron: void 0,
    dryCleaning: 110
  },
  {
    id: "h-13",
    category: "household",
    name: "Carpet (per m)",
    steamIron: void 0,
    washIron: void 0,
    dryCleaning: 55
  },
  {
    id: "h-14",
    category: "household",
    name: "Sofa (per seat)",
    steamIron: void 0,
    washIron: void 0,
    dryCleaning: 340
  },
  {
    id: "h-15",
    category: "household",
    name: "Dining Chairs (per seat)",
    steamIron: void 0,
    washIron: void 0,
    dryCleaning: 190
  },
  // SHOES
  { id: "s-1", category: "shoes", name: "Sport Shoes", dryCleaning: 350 },
  { id: "s-2", category: "shoes", name: "Canvas Shoes", dryCleaning: 400 },
  { id: "s-3", category: "shoes", name: "Leather Shoes", dryCleaning: 500 },
  { id: "s-4", category: "shoes", name: "Suede Leather", dryCleaning: 550 },
  { id: "s-5", category: "shoes", name: "Boots", dryCleaning: 800 }
];
function formatPrice(val) {
  if (val == null || val === 0) return "N/A";
  return `₹${val}`;
}
function isHouseholdUnit(name) {
  return name.includes("per m") || name.includes("per seat");
}
function ClothingTable({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "gradient-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold rounded-tl-lg", children: "Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold whitespace-nowrap", children: "Ironing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold whitespace-nowrap", children: "Steam Iron" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold whitespace-nowrap rounded-tr-lg", children: "Dry Clean" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: `border-b border-border last:border-0 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "bg-background" : "bg-card"}`,
        "data-ocid": `price-row-${item.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right text-foreground tabular-nums", children: formatPrice(item.washIron) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right text-foreground tabular-nums", children: formatPrice(item.steamIron) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right font-semibold text-foreground tabular-nums", children: formatPrice(item.dryCleaning) })
        ]
      },
      item.id
    )) })
  ] }) });
}
function ShoesTable({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[280px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "gradient-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold rounded-tl-lg", children: "Shoe Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-semibold rounded-tr-lg", children: "Cleaning Price" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: `border-b border-border last:border-0 transition-colors hover:bg-secondary/40 ${i % 2 === 0 ? "bg-background" : "bg-card"}`,
        "data-ocid": `price-row-${item.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-gold tabular-nums", children: formatPrice(item.dryCleaning) })
        ]
      },
      item.id
    )) })
  ] }) });
}
function PricesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = reactExports.useState("men");
  const { data: backendPrices, isLoading } = useAllPrices();
  const allPrices = backendPrices && backendPrices.length > 0 ? backendPrices : FALLBACK_PRICES;
  const filtered = allPrices.filter((p) => p.category === activeCategory);
  const isShoes = activeCategory === "shoes";
  const hasUnits = activeCategory === "household" && filtered.some((i) => isHouseholdUnit(i.name));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "prices-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Price List" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "All prices in Indian Rupees (₹) per item" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none",
        role: "tablist",
        "aria-label": "Price categories",
        children: PRICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeCategory === cat.id,
            onClick: () => setActiveCategory(cat.id),
            className: `
                px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 transition-smooth border
                ${activeCategory === cat.id ? "bg-primary text-primary-foreground border-primary shadow-elevated" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}
              `,
            "data-ocid": `prices-tab-${cat.id}`,
            children: cat.label
          },
          cat.id
        ))
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 bg-muted animate-pulse rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border overflow-hidden shadow-card", children: isShoes ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShoesTable, { items: filtered }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClothingTable, { items: filtered }) }),
    hasUnits && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 px-1", children: [
      "* Items marked with ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"per m"' }),
      " are charged per metre. Items marked with ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"per seat"' }),
      " are charged per seat/piece."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground mb-3", children: "Bulk Rates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Wash + Fold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Per kilogram" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold font-bold text-xl tabular-nums", children: [
            "₹160",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "/kg" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Wash + Fold + Iron" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Per kilogram" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold font-bold text-xl tabular-nums", children: [
            "₹200",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "/kg" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-6 px-1 leading-relaxed", children: "* Prices are indicative. Final charges depend on item condition and quantity. Express service attracts additional charges. Prices subject to change — please confirm at time of pickup." })
  ] }) });
}
export {
  PricesPage as default
};
