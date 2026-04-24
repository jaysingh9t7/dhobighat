import { u as useNavigate, b as useAuth, r as reactExports, j as jsxRuntimeExports, A as APP_CONFIG } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { B as Badge } from "./badge-B_vJLzXC.js";
import { u as useUserPickups, e as useUserPayments, f as useCustomerDiscount, g as useCreatePayment, h as useMarkPaymentPaid } from "./useQueries-DmaS4Psf.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { C as CircleAlert } from "./circle-alert-BQbBuOua.js";
import { C as CreditCard } from "./tag-B14AJu_C.js";
import "./x-SeTMXdzH.js";
import "./refresh-cw-CpwTUfNU.js";
import "./phone-Beqcrkz1.js";
import "./chevron-right-DKcnBIaf.js";
import "./utils-PXmmHler.js";
import "./index-ChT6nWzq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent
  );
}
function buildUpiUrl(amount, pickupId) {
  const params = new URLSearchParams({
    pa: APP_CONFIG.upiId,
    pn: APP_CONFIG.upiName,
    am: amount.toString(),
    cu: "INR",
    tn: `DhobiGhat-${pickupId.slice(-6).toUpperCase()}`
  });
  return `upi://pay?${params.toString()}`;
}
function DiscountBadge({ percent }) {
  if (!percent) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800", children: [
    "🎉 ",
    percent,
    "% loyalty discount"
  ] });
}
function CopyUpiButton() {
  const [copied, setCopied] = reactExports.useState(false);
  function handleCopy() {
    void navigator.clipboard.writeText(APP_CONFIG.upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-border transition-colors text-xs font-mono",
      "aria-label": "Copy UPI ID",
      "data-ocid": "copy-upi-id",
      children: [
        APP_CONFIG.upiId,
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3 text-muted-foreground" })
      ]
    }
  );
}
function DesktopPayHint({
  amount,
  pickupId
}) {
  const upiUrl = buildUpiUrl(amount, pickupId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block mt-3 p-3 rounded-xl bg-muted/50 border border-border text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "Open UPI app on your mobile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Scan with Google Pay, PhonePe, or Paytm QR scanner, or send manually to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyUpiButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
        "Reference:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: pickupId.slice(-6).toUpperCase() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: upiUrl,
        className: "shrink-0 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline",
        "aria-label": "Try UPI deep link",
        children: [
          "Try link ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
        ]
      }
    )
  ] }) });
}
function PickupPayCard({
  pickup,
  onPay,
  isPaying,
  isPaid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl border border-border p-4 shadow-card",
      "data-ocid": `pay-item-${pickup.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: pickup.serviceIds.join(", ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              new Date(pickup.scheduledDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }),
              " ",
              "· ",
              pickup.timeSlot
            ] }),
            pickup.isExpress && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs mt-1 border-accent text-accent-foreground",
                children: "Express Service"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: pickup.discountPercent > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg text-foreground", children: [
              "₹",
              pickup.finalAmount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-through", children: [
              "₹",
              pickup.totalAmount
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg text-foreground", children: [
            "₹",
            pickup.finalAmount
          ] }) })
        ] }),
        pickup.discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiscountBadge, { percent: pickup.discountPercent }) }),
        isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-2.5 text-green-600 font-medium text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
          "Payment Initiated — check your UPI app to confirm"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPay(pickup.id, pickup.finalAmount),
              disabled: isPaying,
              className: "btn-gold w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold sm:hidden",
              "data-ocid": `pay-button-${pickup.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
                isPaying ? "Opening UPI app…" : `Pay ₹${pickup.finalAmount} via UPI`
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex gap-3 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPay(pickup.id, pickup.finalAmount),
              disabled: isPaying,
              className: "btn-gold flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold",
              "data-ocid": `pay-button-desktop-${pickup.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                isPaying ? "Redirecting…" : `Pay ₹${pickup.finalAmount}`
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DesktopPayHint, { amount: pickup.finalAmount, pickupId: pickup.id })
        ] })
      ]
    }
  );
}
function PayPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [], refetch: refetchPickups } = useUserPickups(
    user == null ? void 0 : user.id
  );
  const { data: payments = [], refetch: refetchPayments } = useUserPayments(
    user == null ? void 0 : user.id
  );
  const { data: discountPercent = 0 } = useCustomerDiscount(user == null ? void 0 : user.id);
  const createPayment = useCreatePayment();
  const markPaid = useMarkPaymentPaid();
  const [payingId, setPayingId] = reactExports.useState("");
  const [initiatedIds, setInitiatedIds] = reactExports.useState([]);
  const unpaidPickups = pickups.filter(
    (p) => !p.isPaid && p.status !== "cancelled"
  );
  const totalDue = unpaidPickups.reduce((sum, p) => sum + p.finalAmount, 0);
  const totalOriginal = unpaidPickups.reduce(
    (sum, p) => sum + p.totalAmount,
    0
  );
  const totalSavings = totalOriginal - totalDue;
  async function handlePay(pickupId, amount) {
    if (!user) return;
    setPayingId(pickupId);
    try {
      const payment = await createPayment.mutateAsync({
        userId: user.id,
        pickupId
      });
      const upiUrl = buildUpiUrl(amount, pickupId);
      if (isMobileDevice()) {
        window.location.href = upiUrl;
      } else {
        window.open(upiUrl, "_blank");
      }
      setInitiatedIds((prev) => [...prev, pickupId]);
      setTimeout(async () => {
        await markPaid.mutateAsync({ paymentId: payment.id });
        void refetchPickups();
        void refetchPayments();
      }, 4e3);
    } finally {
      setPayingId("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/dashboard" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "pay-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Pay Now" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-primary rounded-2xl p-5 mb-6 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mb-1", children: "Total Amount Due" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-4xl", children: [
            "₹",
            totalDue
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs mt-1", children: [
            unpaidPickups.length,
            " unpaid order",
            unpaidPickups.length !== 1 ? "s" : ""
          ] })
        ] }),
        totalSavings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs", children: "You saved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-xl text-accent", children: [
            "₹",
            totalSavings
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs", children: "loyalty discount" })
        ] })
      ] }),
      discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/90", children: [
          "Your ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            discountPercent,
            "% loyalty discount"
          ] }),
          " is automatically applied"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-xl p-4 mb-6 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-0.5", children: "Secure UPI Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Payments are processed directly via your UPI app (Google Pay, PhonePe, Paytm). UPI ID: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyUpiButton, {})
        ] })
      ] })
    ] }) }),
    unpaidPickups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border",
        "data-ocid": "empty-payments",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-accent mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "All Paid!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You have no outstanding payments. Great!" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: unpaidPickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PickupPayCard,
      {
        pickup: p,
        onPay: handlePay,
        isPaying: payingId === p.id,
        isPaid: initiatedIds.includes(p.id)
      },
      p.id
    )) }),
    payments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base text-foreground mb-3", children: "Payment History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: payments.map((pay) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-3 bg-card rounded-xl border border-border text-sm",
          "data-ocid": `payment-history-${pay.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
                "#",
                pay.pickupId.slice(-6).toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(pay.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
                "₹",
                pay.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${pay.status === "paid" ? "bg-green-100 text-green-800" : pay.status === "failed" ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"}`,
                  children: pay.status
                }
              )
            ] })
          ]
        },
        pay.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-yellow-700 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-yellow-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Security Note:" }),
        " Always verify the UPI ID before confirming payment. DhobiGhat will never ask for your UPI PIN or OTP over call or message. Disputes? Contact us at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `mailto:${APP_CONFIG.email}`,
            className: "underline hover:no-underline",
            children: APP_CONFIG.email
          }
        ),
        "."
      ] })
    ] }) })
  ] });
}
export {
  PayPage as default
};
