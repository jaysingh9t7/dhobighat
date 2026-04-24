import { j as jsxRuntimeExports, u as useNavigate, b as useAuth, r as reactExports, a as useSearch, S as SERVICES, P as PICKUP_TIME_SLOTS, f as addAddress } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { S as ServiceIcon } from "./ServiceIcon-mecTTRCV.js";
import { b as useCreatePickup } from "./useQueries-DmaS4Psf.js";
import { C as CircleCheck } from "./circle-check-DokRLRsv.js";
import { T as Tag } from "./tag-B14AJu_C.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { C as CalendarDays } from "./calendar-days-D1hGWSfi.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { Z as Zap } from "./zap-CjUkV88X.js";
import { M as MapPin } from "./map-pin-D8mqcdW5.js";
import { P as Plus } from "./plus-Bg3ENaAP.js";
import "./x-SeTMXdzH.js";
import "./createLucideIcon-CkU-QaFE.js";
import "./refresh-cw-CpwTUfNU.js";
import "./phone-Beqcrkz1.js";
import "./chevron-right-DKcnBIaf.js";
function AddressForm({
  value,
  onChange,
  onSave,
  onCancel,
  saving = false
}) {
  function set(field, val) {
    onChange({ ...value, [field]: val });
  }
  function handlePincodeChange(pin) {
    set("pincode", pin);
    if (pin.length === 6) {
      const pincodeMap = {
        "400053": { city: "Mumbai", state: "Maharashtra" },
        "400001": { city: "Mumbai", state: "Maharashtra" },
        "400002": { city: "Mumbai", state: "Maharashtra" },
        "110001": { city: "New Delhi", state: "Delhi" },
        "560001": { city: "Bengaluru", state: "Karnataka" },
        "600001": { city: "Chennai", state: "Tamil Nadu" },
        "700001": { city: "Kolkata", state: "West Bengal" }
      };
      const match = pincodeMap[pin];
      if (match) {
        onChange({
          ...value,
          pincode: pin,
          city: match.city,
          state: match.state
        });
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: onSave, className: "space-y-3", noValidate: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "af-label",
          className: "text-xs text-muted-foreground mb-1 block",
          children: "Label"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "af-label",
          type: "text",
          placeholder: "e.g. Home, Office",
          value: value.label,
          onChange: (e) => set("label", e.target.value),
          className: "input-navy text-sm py-2.5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "af-flat",
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Flat No. *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "af-flat",
            type: "text",
            placeholder: "Flat / Unit No.",
            value: value.flat,
            onChange: (e) => set("flat", e.target.value),
            className: "input-navy text-sm py-2.5"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "af-building",
            className: "text-xs text-muted-foreground mb-1 block",
            children: "Building *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "af-building",
            type: "text",
            placeholder: "Building name",
            value: value.building,
            onChange: (e) => set("building", e.target.value),
            className: "input-navy text-sm py-2.5"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "af-society",
          className: "text-xs text-muted-foreground mb-1 block",
          children: "Society / Colony"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "af-society",
          type: "text",
          placeholder: "Society or colony name",
          value: value.society,
          onChange: (e) => set("society", e.target.value),
          className: "input-navy text-sm py-2.5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "af-landmark",
          className: "text-xs text-muted-foreground mb-1 block",
          children: "Landmark"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "af-landmark",
          type: "text",
          placeholder: "Near landmark",
          value: value.landmark,
          onChange: (e) => set("landmark", e.target.value),
          className: "input-navy text-sm py-2.5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "af-pincode",
          className: "text-xs text-muted-foreground mb-1 block",
          children: "Pin Code *"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "af-pincode",
          type: "tel",
          inputMode: "numeric",
          placeholder: "6-digit pin code",
          maxLength: 6,
          value: value.pincode,
          onChange: (e) => handlePincodeChange(e.target.value),
          className: "input-navy text-sm py-2.5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "af-city",
            className: "text-xs text-muted-foreground mb-1 block",
            children: "City"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "af-city",
            type: "text",
            placeholder: "City",
            value: value.city,
            onChange: (e) => set("city", e.target.value),
            className: "input-navy text-sm py-2.5"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "af-state",
            className: "text-xs text-muted-foreground mb-1 block",
            children: "State"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "af-state",
            type: "text",
            placeholder: "State",
            value: value.state,
            onChange: (e) => set("state", e.target.value),
            className: "input-navy text-sm py-2.5"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "af-country",
          className: "text-xs text-muted-foreground mb-1 block",
          children: "Country"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "af-country",
          type: "text",
          value: value.country,
          onChange: (e) => set("country", e.target.value),
          className: "input-navy text-sm py-2.5"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: saving,
          className: "btn-gold flex-1 py-2.5 rounded-xl text-sm font-semibold",
          "data-ocid": "add-address-save",
          children: saving ? "Saving…" : "Save Address"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "flex-1 py-2.5 rounded-xl text-sm border border-border bg-card hover:bg-muted transition-smooth",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
const EMPTY_ADDRESS = {
  label: "Home",
  flat: "",
  building: "",
  society: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  country: "India"
};
function getNextWeekDates() {
  const dates = [];
  const today = /* @__PURE__ */ new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}
function SectionHeader({
  step,
  label,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0", children: step }),
    icon,
    label
  ] });
}
const PREFILL_KEY = "dhobighat_schedule_prefill";
function SchedulePage() {
  var _a, _b;
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const createPickup = useCreatePickup();
  const weekDates = getNextWeekDates();
  const [selectedServices, setSelectedServices] = reactExports.useState([]);
  const [selectedDate, setSelectedDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedSlot, setSelectedSlot] = reactExports.useState("");
  const [isExpress, setIsExpress] = reactExports.useState(false);
  const [selectedAddress, setSelectedAddress] = reactExports.useState(
    ((_b = (_a = user == null ? void 0 : user.addresses) == null ? void 0 : _a[0]) == null ? void 0 : _b.id) ?? ""
  );
  const [showAddAddress, setShowAddAddress] = reactExports.useState(false);
  const [newAddress, setNewAddress] = reactExports.useState(EMPTY_ADDRESS);
  const [addingAddress, setAddingAddress] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [createdPickup, setCreatedPickup] = reactExports.useState(
    null
  );
  const rawSearch = useSearch({ strict: false });
  const hasPrefillParam = rawSearch.prefill === "1";
  reactExports.useEffect(() => {
    if (!hasPrefillParam) return;
    try {
      const raw = localStorage.getItem(PREFILL_KEY);
      if (!raw) return;
      const prefill = JSON.parse(raw);
      localStorage.removeItem(PREFILL_KEY);
      if (prefill.serviceIds && prefill.serviceIds.length > 0) {
        setSelectedServices(prefill.serviceIds);
      } else if (prefill.serviceId) {
        setSelectedServices([prefill.serviceId]);
      }
      if (prefill.date) {
        const d = new Date(prefill.date);
        if (!Number.isNaN(d.getTime())) {
          setSelectedDate(d);
        }
      }
      if (prefill.timeSlot) {
        setSelectedSlot(prefill.timeSlot);
      }
    } catch {
    }
  }, [hasPrefillParam]);
  const addresses = (user == null ? void 0 : user.addresses) ?? [];
  function toggleService(id) {
    setSelectedServices(
      (prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }
  async function handleAddAddress(e) {
    e.preventDefault();
    if (!user) return;
    if (!newAddress.flat || !newAddress.building || !newAddress.pincode) {
      setError("Please fill in Flat No., Building, and Pin Code");
      return;
    }
    setError("");
    setAddingAddress(true);
    try {
      const addr = await addAddress(user.id, newAddress);
      await refreshUser();
      setSelectedAddress(addr.id);
      setShowAddAddress(false);
      setNewAddress(EMPTY_ADDRESS);
    } catch {
      setError("Failed to add address. Please try again.");
    } finally {
      setAddingAddress(false);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }
    if (!selectedSlot) {
      setError("Please select a pickup time slot");
      return;
    }
    if (!selectedAddress) {
      setError("Please select a pickup address");
      return;
    }
    if (!user) return;
    setError("");
    const result = await createPickup.mutateAsync({
      userId: user.id,
      form: {
        serviceIds: selectedServices,
        date: selectedDate.toISOString().split("T")[0],
        timeSlot: selectedSlot,
        isExpress,
        addressId: selectedAddress
      }
    });
    setCreatedPickup(result);
    setSubmitted(true);
  }
  if (submitted) {
    const hasDiscount = createdPickup && createdPickup.discountPercent > 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "schedule-success",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Pickup Scheduled!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4 max-w-[280px]", children: "We'll be at your door at the selected time. Track your request from the dashboard." }),
          createdPickup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-5 text-left space-y-2", children: [
            hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-xl text-xs font-semibold mb-3",
                "data-ocid": "schedule-discount-badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 shrink-0" }),
                  "Loyalty discount applied — ",
                  createdPickup.discountPercent,
                  "% off"
                ]
              }
            ),
            hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Original amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "line-through", children: [
                "₹",
                createdPickup.totalAmount
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Final amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "₹",
                createdPickup.finalAmount
              ] })
            ] }),
            hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-accent font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "You saved" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "₹",
                createdPickup.totalAmount - createdPickup.finalAmount
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/dashboard" }),
                className: "btn-navy px-6 py-2.5 rounded-xl text-sm",
                children: "Back to Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/dashboard/requests" }),
                className: "btn-gold px-6 py-2.5 rounded-xl text-sm",
                children: "View Requests"
              }
            )
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/dashboard" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "schedule-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Schedule Pickup" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { step: 1, label: "Select Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: SERVICES.map((svc) => {
          const sel = selectedServices.includes(svc.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleService(svc.id),
              className: `flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-smooth cursor-pointer text-center ${sel ? "border-accent bg-accent/10 shadow-card" : "border-border bg-card hover:border-accent/40"}`,
              "data-ocid": `schedule-service-${svc.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-11 h-11 rounded-xl flex items-center justify-center ${sel ? "bg-primary" : "bg-muted"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ServiceIcon,
                      {
                        name: svc.icon,
                        className: `w-5 h-5 ${sel ? "text-accent" : "text-muted-foreground"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-semibold leading-snug ${sel ? "text-foreground" : "text-muted-foreground"}`,
                    children: svc.name
                  }
                ),
                sel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-bold", children: "✓" })
              ]
            },
            svc.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            step: 2,
            label: "Pick-Up Date",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 snap-x", children: weekDates.map((d) => {
          const isSel = d.toDateString() === selectedDate.toDateString();
          const isToday = d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedDate(d),
              className: `date-btn shrink-0 snap-start min-w-[3.5rem] ${isSel ? "selected" : ""}`,
              "data-ocid": `date-btn-${d.toISOString().split("T")[0]}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-medium ${isSel ? "text-white/80" : "text-muted-foreground"}`,
                    children: isToday ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold leading-none", children: d.getDate() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs ${isSel ? "text-white/70" : "text-muted-foreground"}`,
                    children: d.toLocaleDateString("en-IN", { month: "short" })
                  }
                )
              ]
            },
            d.toISOString()
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            step: 3,
            label: "Pick-Up Time Slot",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: PICKUP_TIME_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedSlot(slot.id),
            className: `time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`,
            "data-ocid": `time-slot-${slot.id}`,
            children: slot.label
          },
          slot.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { step: 4, label: "Express Option" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between p-4 rounded-xl border-2 transition-smooth ${isExpress ? "border-accent bg-accent/8" : "border-border bg-card"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-xl flex items-center justify-center ${isExpress ? "bg-accent/20" : "bg-muted"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        className: `w-5 h-5 ${isExpress ? "text-accent" : "text-muted-foreground"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Express Service" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Priority processing, faster turnaround" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": isExpress,
                  onClick: () => setIsExpress((v) => !v),
                  className: `w-12 h-6 rounded-full transition-colors relative shrink-0 ${isExpress ? "bg-accent" : "bg-muted"}`,
                  "data-ocid": "schedule-express-toggle",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${isExpress ? "left-6" : "left-0.5"}`
                    }
                  )
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            step: 5,
            label: "Address Selector",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          addresses.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: `flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-smooth ${selectedAddress === addr.id ? "border-accent bg-accent/8" : "border-border bg-card hover:border-accent/30"}`,
              "data-ocid": `address-option-${addr.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: "address",
                    value: addr.id,
                    checked: selectedAddress === addr.id,
                    onChange: () => setSelectedAddress(addr.id),
                    className: "mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
                    addr.label,
                    addr.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-normal text-accent", children: "Default" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [addr.flat, addr.building, addr.society].filter(Boolean).join(", ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    addr.city,
                    addr.pincode ? ` — ${addr.pincode}` : ""
                  ] })
                ] })
              ]
            },
            addr.id
          )),
          !showAddAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAddAddress(true),
              className: "flex items-center gap-2 w-full p-3.5 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-smooth text-sm font-medium",
              "data-ocid": "schedule-add-address",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 shrink-0" }),
                "Add New Address"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-muted/30 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-3", children: "New Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AddressForm,
              {
                value: newAddress,
                onChange: setNewAddress,
                onSave: handleAddAddress,
                onCancel: () => {
                  setShowAddAddress(false);
                  setNewAddress(EMPTY_ADDRESS);
                  setError("");
                },
                saving: addingAddress
              }
            )
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm font-medium bg-destructive/8 px-4 py-3 rounded-xl border border-destructive/20", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: createPickup.isPending,
          className: "btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card",
          "data-ocid": "schedule-submit",
          children: createPickup.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" }),
            "Scheduling…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
            "Confirm Pickup"
          ] })
        }
      )
    ] })
  ] });
}
export {
  SchedulePage as default
};
