import { j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { A as AdminLayout } from "./AdminLayout-3jg1paCt.js";
import { n as useAllPayments, h as useMarkPaymentPaid, o as useMarkPaymentPending } from "./useQueries-DmaS4Psf.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { C as CircleAlert } from "./circle-alert-BQbBuOua.js";
import "./users-NcbA5j5i.js";
import "./createLucideIcon-CkU-QaFE.js";
import "./tag-B14AJu_C.js";
function AdminPaymentsPage() {
  const { data: payments = [], isLoading } = useAllPayments();
  const markPaid = useMarkPaymentPaid();
  const markPending = useMarkPaymentPending();
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Payments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-green-700 mb-1", children: "Collected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-2xl text-green-800", children: [
          "₹",
          totalPaid
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-orange-700 mb-1", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-2xl text-orange-800", children: [
          "₹",
          totalPending
        ] })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-muted animate-pulse rounded-xl" }, i)) }),
    !isLoading && payments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 text-muted-foreground mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No payments yet" })
    ] }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: payments.map((pay) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 shadow-card",
        "data-ocid": `admin-payment-${pay.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
                "#",
                pay.pickupId.slice(-6).toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(pay.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) }),
              pay.transactionId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
                "TXN: ",
                pay.transactionId
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg text-foreground", children: [
                "₹",
                pay.amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${pay.status === "paid" ? "bg-green-100 text-green-800" : pay.status === "pending" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`,
                  children: pay.status
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            pay.status !== "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => markPaid.mutate({ paymentId: pay.id }),
                disabled: markPaid.isPending,
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-900 hover:bg-green-200 transition-colors",
                "data-ocid": `admin-mark-paid-${pay.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                  " Mark Paid"
                ]
              }
            ),
            pay.status === "paid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => markPending.mutate(pay.id),
                disabled: markPending.isPending,
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-100 text-orange-900 hover:bg-orange-200 transition-colors",
                "data-ocid": `admin-mark-pending-${pay.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5" }),
                  " Mark Pending"
                ]
              }
            )
          ] })
        ]
      },
      pay.id
    )) })
  ] });
}
export {
  AdminPaymentsPage as default
};
