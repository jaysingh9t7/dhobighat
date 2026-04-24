import { AdminLayout } from "@/components/AdminLayout";
import {
  useAddPriceItem,
  useAllPrices,
  useUpdatePrice,
} from "@/hooks/useQueries";
import { PRICE_CATEGORIES } from "@/types";
import type { PriceCategory, PriceItem } from "@/types";
import { Plus, Save, X } from "lucide-react";
import { useState } from "react";

export default function AdminRatesPage() {
  const [activeCategory, setActiveCategory] = useState<PriceCategory>("men");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<PriceItem>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PriceItem>>({
    category: "men",
  });

  const { data: allPrices = [], isLoading } = useAllPrices();
  const updatePrice = useUpdatePrice();
  const addPriceItem = useAddPriceItem();

  const filtered = allPrices.filter((p) => p.category === activeCategory);

  function startEdit(item: PriceItem) {
    setEditingId(item.id);
    setEditValues({
      dryCleaning: item.dryCleaning,
      washIron: item.washIron,
      washFold: item.washFold,
      steamIron: item.steamIron,
    });
  }

  async function saveEdit(id: string) {
    await updatePrice.mutateAsync({ itemId: id, updates: editValues });
    setEditingId(null);
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;
    await addPriceItem.mutateAsync({
      name: newItem.name,
      category: newItem.category as PriceCategory,
      dryCleaning: newItem.dryCleaning,
      washIron: newItem.washIron,
      washFold: newItem.washFold,
      steamIron: newItem.steamIron,
    });
    setNewItem({ category: activeCategory });
    setShowAddForm(false);
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">
          Rate Management
        </h1>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="btn-gold flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          data-ocid="admin-add-price"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {PRICE_CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            data-ocid={`admin-prices-tab-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-card rounded-xl border border-border p-4 mb-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm text-foreground">
              Add New Item
            </p>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form
            onSubmit={handleAddItem}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            <input
              className="input-navy text-sm py-2 col-span-2"
              placeholder="Item name *"
              value={newItem.name ?? ""}
              onChange={(e) =>
                setNewItem((d) => ({ ...d, name: e.target.value }))
              }
              required
            />
            <select
              className="input-navy text-sm py-2"
              value={newItem.category}
              onChange={(e) =>
                setNewItem((d) => ({
                  ...d,
                  category: e.target.value as PriceCategory,
                }))
              }
            >
              {PRICE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              className="input-navy text-sm py-2"
              type="number"
              placeholder="Dry Clean ₹"
              value={newItem.dryCleaning ?? ""}
              onChange={(e) =>
                setNewItem((d) => ({
                  ...d,
                  dryCleaning: Number(e.target.value),
                }))
              }
            />
            <input
              className="input-navy text-sm py-2"
              type="number"
              placeholder="Wash+Iron ₹"
              value={newItem.washIron ?? ""}
              onChange={(e) =>
                setNewItem((d) => ({ ...d, washIron: Number(e.target.value) }))
              }
            />
            <input
              className="input-navy text-sm py-2"
              type="number"
              placeholder="Wash+Fold ₹"
              value={newItem.washFold ?? ""}
              onChange={(e) =>
                setNewItem((d) => ({ ...d, washFold: Number(e.target.value) }))
              }
            />
            <input
              className="input-navy text-sm py-2"
              type="number"
              placeholder="Steam Iron ₹"
              value={newItem.steamIron ?? ""}
              onChange={(e) =>
                setNewItem((d) => ({ ...d, steamIron: Number(e.target.value) }))
              }
            />
            <button
              type="submit"
              className="btn-gold py-2 rounded-lg text-sm col-span-2 md:col-span-1"
            >
              Save Item
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-muted animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 py-3 font-semibold">Item</th>
                  <th className="text-right px-3 py-3 font-semibold">
                    Dry Clean
                  </th>
                  <th className="text-right px-3 py-3 font-semibold">
                    Wash+Iron
                  </th>
                  <th className="text-right px-3 py-3 font-semibold">
                    Wash+Fold
                  </th>
                  <th className="text-right px-3 py-3 font-semibold">
                    Steam Iron
                  </th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr
                    key={item.id}
                    className={i % 2 === 0 ? "bg-background" : "bg-card"}
                    data-ocid={`admin-price-row-${item.id}`}
                  >
                    <td className="px-4 py-2 font-medium text-foreground">
                      {item.name}
                    </td>
                    {editingId === item.id ? (
                      <>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            value={editValues.dryCleaning ?? ""}
                            onChange={(e) =>
                              setEditValues((d) => ({
                                ...d,
                                dryCleaning: Number(e.target.value),
                              }))
                            }
                            className="w-20 input-navy text-xs py-1 text-right"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            value={editValues.washIron ?? ""}
                            onChange={(e) =>
                              setEditValues((d) => ({
                                ...d,
                                washIron: Number(e.target.value),
                              }))
                            }
                            className="w-20 input-navy text-xs py-1 text-right"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            value={editValues.washFold ?? ""}
                            onChange={(e) =>
                              setEditValues((d) => ({
                                ...d,
                                washFold: Number(e.target.value),
                              }))
                            }
                            className="w-20 input-navy text-xs py-1 text-right"
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            value={editValues.steamIron ?? ""}
                            onChange={(e) =>
                              setEditValues((d) => ({
                                ...d,
                                steamIron: Number(e.target.value),
                              }))
                            }
                            className="w-20 input-navy text-xs py-1 text-right"
                          />
                        </td>
                        <td className="px-2 py-1.5 flex gap-1">
                          <button
                            type="button"
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-accent/20 hover:bg-accent/30 rounded text-accent transition-colors"
                            aria-label="Save"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-1.5 hover:bg-muted rounded transition-colors"
                            aria-label="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2 text-right text-foreground">
                          {item.dryCleaning ? `₹${item.dryCleaning}` : "—"}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground">
                          {item.washIron ? `₹${item.washIron}` : "—"}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground">
                          {item.washFold ? `₹${item.washFold}` : "—"}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground">
                          {item.steamIron ? `₹${item.steamIron}` : "—"}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="text-xs text-primary hover:underline"
                            data-ocid={`admin-edit-price-${item.id}`}
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
