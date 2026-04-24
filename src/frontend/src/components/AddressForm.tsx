import type { AddressFormData } from "@/types";
import { useState } from "react";

interface AddressFormProps {
  value: AddressFormData;
  onChange: (data: AddressFormData) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  saving?: boolean;
}

export function AddressForm({
  value,
  onChange,
  onSave,
  onCancel,
  saving = false,
}: AddressFormProps) {
  function set(field: keyof AddressFormData, val: string) {
    onChange({ ...value, [field]: val });
  }

  function handlePincodeChange(pin: string) {
    set("pincode", pin);
    if (pin.length === 6) {
      const pincodeMap: Record<string, { city: string; state: string }> = {
        "400053": { city: "Mumbai", state: "Maharashtra" },
        "400001": { city: "Mumbai", state: "Maharashtra" },
        "400002": { city: "Mumbai", state: "Maharashtra" },
        "110001": { city: "New Delhi", state: "Delhi" },
        "560001": { city: "Bengaluru", state: "Karnataka" },
        "600001": { city: "Chennai", state: "Tamil Nadu" },
        "700001": { city: "Kolkata", state: "West Bengal" },
      };
      const match = pincodeMap[pin];
      if (match) {
        onChange({
          ...value,
          pincode: pin,
          city: match.city,
          state: match.state,
        });
      }
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-3" noValidate>
      {/* Label */}
      <div>
        <label
          htmlFor="af-label"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Label
        </label>
        <input
          id="af-label"
          type="text"
          placeholder="e.g. Home, Office"
          value={value.label}
          onChange={(e) => set("label", e.target.value)}
          className="input-navy text-sm py-2.5"
        />
      </div>

      {/* Flat + Building */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="af-flat"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Flat No. *
          </label>
          <input
            id="af-flat"
            type="text"
            placeholder="Flat / Unit No."
            value={value.flat}
            onChange={(e) => set("flat", e.target.value)}
            className="input-navy text-sm py-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="af-building"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Building *
          </label>
          <input
            id="af-building"
            type="text"
            placeholder="Building name"
            value={value.building}
            onChange={(e) => set("building", e.target.value)}
            className="input-navy text-sm py-2.5"
          />
        </div>
      </div>

      {/* Society */}
      <div>
        <label
          htmlFor="af-society"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Society / Colony
        </label>
        <input
          id="af-society"
          type="text"
          placeholder="Society or colony name"
          value={value.society}
          onChange={(e) => set("society", e.target.value)}
          className="input-navy text-sm py-2.5"
        />
      </div>

      {/* Landmark */}
      <div>
        <label
          htmlFor="af-landmark"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Landmark
        </label>
        <input
          id="af-landmark"
          type="text"
          placeholder="Near landmark"
          value={value.landmark}
          onChange={(e) => set("landmark", e.target.value)}
          className="input-navy text-sm py-2.5"
        />
      </div>

      {/* Pincode */}
      <div>
        <label
          htmlFor="af-pincode"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Pin Code *
        </label>
        <input
          id="af-pincode"
          type="tel"
          inputMode="numeric"
          placeholder="6-digit pin code"
          maxLength={6}
          value={value.pincode}
          onChange={(e) => handlePincodeChange(e.target.value)}
          className="input-navy text-sm py-2.5"
        />
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="af-city"
            className="text-xs text-muted-foreground mb-1 block"
          >
            City
          </label>
          <input
            id="af-city"
            type="text"
            placeholder="City"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className="input-navy text-sm py-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="af-state"
            className="text-xs text-muted-foreground mb-1 block"
          >
            State
          </label>
          <input
            id="af-state"
            type="text"
            placeholder="State"
            value={value.state}
            onChange={(e) => set("state", e.target.value)}
            className="input-navy text-sm py-2.5"
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label
          htmlFor="af-country"
          className="text-xs text-muted-foreground mb-1 block"
        >
          Country
        </label>
        <input
          id="af-country"
          type="text"
          value={value.country}
          onChange={(e) => set("country", e.target.value)}
          className="input-navy text-sm py-2.5"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="btn-gold flex-1 py-2.5 rounded-xl text-sm font-semibold"
          data-ocid="add-address-save"
        >
          {saving ? "Saving…" : "Save Address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-sm border border-border bg-card hover:bg-muted transition-smooth"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export const EMPTY_ADDRESS: AddressFormData = {
  label: "Home",
  flat: "",
  building: "",
  society: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  country: "India",
};
