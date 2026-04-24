import { r as reactExports, j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { A as AdminLayout } from "./AdminLayout-3jg1paCt.js";
import { d as useAllPrices, j as useUpdatePrice, k as useAddPriceItem } from "./useQueries-DmaS4Psf.js";
import { P as PRICE_CATEGORIES } from "./index-89CnAFbC.js";
import { P as Plus } from "./plus-Bg3ENaAP.js";
import { X } from "./x-SeTMXdzH.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import "./users-NcbA5j5i.js";
import "./tag-B14AJu_C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function AdminRatesPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("men");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editValues, setEditValues] = reactExports.useState({});
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [newItem, setNewItem] = reactExports.useState({
    category: "men"
  });
  const { data: allPrices = [], isLoading } = useAllPrices();
  const updatePrice = useUpdatePrice();
  const addPriceItem = useAddPriceItem();
  const filtered = allPrices.filter((p) => p.category === activeCategory);
  function startEdit(item) {
    setEditingId(item.id);
    setEditValues({
      dryCleaning: item.dryCleaning,
      washIron: item.washIron,
      washFold: item.washFold,
      steamIron: item.steamIron
    });
  }
  async function saveEdit(id) {
    await updatePrice.mutateAsync({ itemId: id, updates: editValues });
    setEditingId(null);
  }
  async function handleAddItem(e) {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;
    await addPriceItem.mutateAsync({
      name: newItem.name,
      category: newItem.category,
      dryCleaning: newItem.dryCleaning,
      washIron: newItem.washIron,
      washFold: newItem.washFold,
      steamIron: newItem.steamIron
    });
    setNewItem({ category: activeCategory });
    setShowAddForm(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Rate Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowAddForm(true),
          className: "btn-gold flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
          "data-ocid": "admin-add-price",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Item"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4", children: PRICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveCategory(cat.id),
        className: `px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
        "data-ocid": `admin-prices-tab-${cat.id}`,
        children: cat.label
      },
      cat.id
    )) }),
    showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4 mb-4 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Add New Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowAddForm(false),
            className: "p-1 hover:bg-muted rounded transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleAddItem,
          className: "grid grid-cols-2 md:grid-cols-3 gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input-navy text-sm py-2 col-span-2",
                placeholder: "Item name *",
                value: newItem.name ?? "",
                onChange: (e) => setNewItem((d) => ({ ...d, name: e.target.value })),
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                className: "input-navy text-sm py-2",
                value: newItem.category,
                onChange: (e) => setNewItem((d) => ({
                  ...d,
                  category: e.target.value
                })),
                children: PRICE_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.label }, c.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input-navy text-sm py-2",
                type: "number",
                placeholder: "Dry Clean ₹",
                value: newItem.dryCleaning ?? "",
                onChange: (e) => setNewItem((d) => ({
                  ...d,
                  dryCleaning: Number(e.target.value)
                }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input-navy text-sm py-2",
                type: "number",
                placeholder: "Wash+Iron ₹",
                value: newItem.washIron ?? "",
                onChange: (e) => setNewItem((d) => ({ ...d, washIron: Number(e.target.value) }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input-navy text-sm py-2",
                type: "number",
                placeholder: "Wash+Fold ₹",
                value: newItem.washFold ?? "",
                onChange: (e) => setNewItem((d) => ({ ...d, washFold: Number(e.target.value) }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input-navy text-sm py-2",
                type: "number",
                placeholder: "Steam Iron ₹",
                value: newItem.steamIron ?? "",
                onChange: (e) => setNewItem((d) => ({ ...d, steamIron: Number(e.target.value) }))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "btn-gold py-2 rounded-lg text-sm col-span-2 md:col-span-1",
                children: "Save Item"
              }
            )
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted animate-pulse rounded" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border overflow-hidden shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold", children: "Item" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold", children: "Dry Clean" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold", children: "Wash+Iron" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold", children: "Wash+Fold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 font-semibold", children: "Steam Iron" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: i % 2 === 0 ? "bg-background" : "bg-card",
          "data-ocid": `admin-price-row-${item.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-foreground", children: item.name }),
            editingId === item.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: editValues.dryCleaning ?? "",
                  onChange: (e) => setEditValues((d) => ({
                    ...d,
                    dryCleaning: Number(e.target.value)
                  })),
                  className: "w-20 input-navy text-xs py-1 text-right"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: editValues.washIron ?? "",
                  onChange: (e) => setEditValues((d) => ({
                    ...d,
                    washIron: Number(e.target.value)
                  })),
                  className: "w-20 input-navy text-xs py-1 text-right"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: editValues.washFold ?? "",
                  onChange: (e) => setEditValues((d) => ({
                    ...d,
                    washFold: Number(e.target.value)
                  })),
                  className: "w-20 input-navy text-xs py-1 text-right"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: editValues.steamIron ?? "",
                  onChange: (e) => setEditValues((d) => ({
                    ...d,
                    steamIron: Number(e.target.value)
                  })),
                  className: "w-20 input-navy text-xs py-1 text-right"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-1.5 flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => saveEdit(item.id),
                    className: "p-1.5 bg-accent/20 hover:bg-accent/30 rounded text-accent transition-colors",
                    "aria-label": "Save",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEditingId(null),
                    className: "p-1.5 hover:bg-muted rounded transition-colors",
                    "aria-label": "Cancel",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right text-foreground", children: item.dryCleaning ? `₹${item.dryCleaning}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right text-foreground", children: item.washIron ? `₹${item.washIron}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right text-foreground", children: item.washFold ? `₹${item.washFold}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right text-foreground", children: item.steamIron ? `₹${item.steamIron}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => startEdit(item),
                  className: "text-xs text-primary hover:underline",
                  "data-ocid": `admin-edit-price-${item.id}`,
                  children: "Edit"
                }
              ) })
            ] })
          ]
        },
        item.id
      )) })
    ] }) }) })
  ] });
}
export {
  AdminRatesPage as default
};
