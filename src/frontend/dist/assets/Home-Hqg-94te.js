import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, A as APP_CONFIG, S as SERVICES } from "./index-DhEm9TMn.js";
import { L as Layout } from "./Layout-OLXsu3gU.js";
import { W as Wind, S as ServiceIcon } from "./ServiceIcon-mecTTRCV.js";
import { T as Truck, S as Shield, U as Users } from "./users-NcbA5j5i.js";
import { S as Star } from "./star-CLTNlB2X.js";
import { C as ChevronRight } from "./chevron-right-DKcnBIaf.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { P as Package } from "./package-8feS7cyk.js";
import "./zap-CjUkV88X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode);
const HERO_FEATURES = [
  { icon: Truck, label: "Free Pickup" },
  { icon: Wind, label: "Express Delivery" },
  { icon: Star, label: "Expert Cleaning" },
  { icon: Shield, label: "Stain Removal" }
];
const HERO_IMAGES = [
  "/assets/generated/hero-laundry.dim_800x500.jpg",
  "/assets/generated/hero-laundry-2.dim_800x500.jpg",
  "/assets/generated/hero-laundry-3.dim_800x500.jpg"
];
const STATS = [
  { value: "5,000+", label: "Happy Customers", icon: Users },
  { value: "10,000+", label: "Orders Completed", icon: Package },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "3 Years", label: "Of Excellence", icon: Shield }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Schedule Pickup",
    desc: "Choose your service and preferred pickup slot in under 60 seconds."
  },
  {
    step: "02",
    icon: Truck,
    title: "We Collect",
    desc: "Our team arrives at your door on time, with zero hassle for you."
  },
  {
    step: "03",
    icon: Wind,
    title: "Expert Cleaning",
    desc: "Garments are cleaned using professional-grade equipment and eco detergents."
  },
  {
    step: "04",
    icon: Package,
    title: "Free Delivery",
    desc: "Fresh, folded clothes returned to your doorstep — always on schedule."
  }
];
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Andheri West",
    rating: 5,
    review: "DhobiGhat transformed my wardrobe routine completely. The pickup is always on time and my silk sarees come back looking brand new. Absolutely love the service!",
    initials: "PS"
  },
  {
    name: "Rahul Mehta",
    location: "Bandra East",
    rating: 5,
    review: "Best laundry service in Mumbai, hands down. The app is super easy, staff are courteous, and the quality is consistently excellent. Highly recommend!",
    initials: "RM"
  },
  {
    name: "Sneha Kulkarni",
    location: "Versova",
    rating: 5,
    review: "I've tried many laundry services but DhobiGhat stands out for its professionalism. Stubborn stains removed, clothes ironed perfectly. Great value for money.",
    initials: "SK"
  },
  {
    name: "Aditya Nair",
    location: "Juhu",
    rating: 5,
    review: "The express service is a lifesaver for my busy schedule. Same-day delivery with top-notch quality — I'm a loyal customer for life!",
    initials: "AN"
  }
];
function HomePage() {
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = reactExports.useState(0);
  const [revealed, setRevealed] = reactExports.useState(false);
  const [imgErrors, setImgErrors] = reactExports.useState({});
  const timerRef = reactExports.useRef(null);
  const servicesRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    timerRef.current = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 4e3);
    return () => clearInterval(timerRef.current ?? void 0);
  }, []);
  reactExports.useEffect(() => {
    function onScroll() {
      if (!revealed && window.scrollY > window.innerHeight * 0.5) {
        setRevealed(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealed]);
  function handleReveal() {
    setRevealed(true);
    setTimeout(() => {
      var _a;
      (_a = servicesRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
  function handleHide() {
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleGoToServices() {
    void navigate({ to: "/services" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { showHeader: false, showFooter: revealed, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HeroSplash,
      {
        heroIdx,
        imgErrors,
        onImgError: (i) => setImgErrors((prev) => ({ ...prev, [i]: true })),
        onReveal: handleReveal,
        onHide: handleHide,
        revealed,
        onSchedule: handleGoToServices,
        onAdmin: () => void navigate({ to: "/admin" }),
        onCustomerLogin: () => void navigate({ to: "/login" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: servicesRef,
        className: `${revealed ? "block" : "hidden"} animate-in fade-in duration-500`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesSection, { onSchedule: handleGoToServices }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WhyChooseSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, { onSchedule: handleGoToServices }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-4 px-4 flex justify-end max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void navigate({ to: "/admin" }),
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "landing-admin-login",
              children: "Admin Login →"
            }
          ) })
        ]
      }
    )
  ] });
}
function HeroSplash({
  heroIdx,
  imgErrors,
  onImgError,
  onReveal,
  onHide,
  revealed,
  onSchedule,
  onAdmin,
  onCustomerLogin
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-[600px] md:min-h-[640px] overflow-hidden",
      style: { background: "oklch(0.14 0.07 260)" },
      children: [
        HERO_IMAGES.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-1000",
            style: { opacity: i === heroIdx ? 1 : 0 },
            "aria-hidden": "true",
            children: [
              !imgErrors[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img,
                  alt: "",
                  className: "w-full h-full object-cover",
                  onError: () => onImgError(i)
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full h-full",
                  style: {
                    background: `linear-gradient(135deg, oklch(0.14 0.07 ${260 + i * 5}) 0%, oklch(0.22 0.09 ${255 + i * 5}) 100%)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(160deg, oklch(0.10 0.07 260 / 0.92) 0%, oklch(0.15 0.08 258 / 0.80) 50%, oklch(0.18 0.07 255 / 0.55) 100%)"
                  }
                }
              )
            ]
          },
          img
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex sm:items-center sm:justify-between gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: APP_CONFIG.logo,
                  alt: "DhobiGhat logo",
                  className: "h-20 w-auto object-contain rounded-xl shadow-lg flex-shrink-0",
                  style: { maxWidth: "160px" },
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-4xl leading-tight text-white whitespace-nowrap", children: [
                  "Dhobi",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.12 80)" }, children: "Ghat" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mt-0.5 font-medium leading-snug",
                    style: { color: "oklch(0.82 0.12 80 / 0.85)" },
                    children: APP_CONFIG.tagline
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCustomerLogin,
                  className: "text-white/90 text-sm hover:text-white transition-colors border border-white/30 rounded-xl px-5 py-2.5 backdrop-blur-sm font-semibold whitespace-nowrap",
                  style: { background: "oklch(0.82 0.12 80 / 0.20)" },
                  "data-ocid": "customer-login-link",
                  children: "Customer Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onAdmin,
                  className: "text-white/70 text-sm hover:text-white/90 transition-colors border border-white/20 rounded-xl px-5 py-2.5 backdrop-blur-sm font-medium whitespace-nowrap",
                  style: { background: "oklch(1 0 0 / 0.06)" },
                  "data-ocid": "admin-login-link",
                  children: "Admin Login"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex sm:hidden flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: APP_CONFIG.logo,
                alt: "DhobiGhat logo",
                className: "h-14 w-auto object-contain rounded-xl shadow-lg flex-shrink-0",
                style: { maxWidth: "120px" },
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl leading-tight text-white whitespace-nowrap", children: [
                "Dhobi",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.12 80)" }, children: "Ghat" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mt-0.5 font-medium leading-snug",
                  style: { color: "oklch(0.82 0.12 80 / 0.85)" },
                  children: APP_CONFIG.tagline
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCustomerLogin,
                  className: "flex-1 text-white/90 text-xs hover:text-white transition-colors border border-white/30 rounded-xl px-3 py-2 backdrop-blur-sm font-semibold text-center whitespace-nowrap",
                  style: { background: "oklch(0.82 0.12 80 / 0.20)" },
                  "data-ocid": "customer-login-link",
                  children: "Customer Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onAdmin,
                  className: "flex-1 text-white/70 text-xs hover:text-white/90 transition-colors border border-white/20 rounded-xl px-3 py-2 backdrop-blur-sm font-medium text-center whitespace-nowrap",
                  style: { background: "oklch(1 0 0 / 0.06)" },
                  "data-ocid": "admin-login-link",
                  children: "Admin Login"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 min-h-[600px] md:min-h-[640px] flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col md:flex-row items-center justify-center px-6 sm:px-8 pt-[230px] sm:pt-[150px] md:pt-[120px] pb-8 gap-10 md:gap-16 max-w-6xl mx-auto w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-white flex flex-col gap-5 sm:gap-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 self-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full flex-shrink-0",
                    style: { background: "oklch(0.82 0.12 80)" },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase",
                    style: { color: "oklch(0.82 0.12 80)" },
                    children: "Mumbai's #1 Choice"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-balance", children: [
                "Premium",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.12 80)" }, children: "Laundry" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Service"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/75 text-base sm:text-lg leading-relaxed max-w-md", children: [
                APP_CONFIG.tagline,
                ". Professional care delivered right to your doorstep across Mumbai."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5", children: HERO_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white border border-white/25 backdrop-blur-sm",
                  style: { background: "oklch(1 0 0 / 0.10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      f.icon,
                      {
                        className: "w-4 h-4 flex-shrink-0",
                        style: { color: "oklch(0.82 0.12 80)" }
                      }
                    ),
                    f.label
                  ]
                },
                f.label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: onSchedule,
                    className: "btn-gold inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base font-bold shadow-lg",
                    "data-ocid": "hero-schedule-pickup",
                    children: [
                      "Schedule Pickup",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: revealed ? onHide : onReveal,
                    className: "inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold text-white border border-white/35 backdrop-blur-sm transition-smooth hover:border-white/65 hover:bg-white/10",
                    style: { background: "oklch(1 0 0 / 0.08)" },
                    "data-ocid": "hero-explore",
                    children: revealed ? "Go Back to Home ↑" : "Explore Services"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col gap-4 w-96 lg:w-[450px] flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: HERO_IMAGES[heroIdx],
                  alt: "Premium laundry service",
                  className: "w-full h-64 lg:h-80 object-cover",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mx-2 rounded-2xl px-5 py-4 flex items-center gap-4 border border-white/15 backdrop-blur-sm",
                  style: { background: "oklch(1 0 0 / 0.10)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CalendarCheck,
                      {
                        className: "w-10 h-10 flex-shrink-0",
                        style: { color: "oklch(0.82 0.12 80)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-base", children: "Free Pickup & Delivery" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-sm mt-0.5", children: "At your doorstep, on time" })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 pb-10 flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5", children: HERO_IMAGES.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-full transition-all duration-500",
                style: {
                  width: i === heroIdx ? 28 : 8,
                  height: 8,
                  background: i === heroIdx ? "oklch(0.82 0.12 80)" : "oklch(1 0 0 / 0.35)"
                }
              },
              `dot-${img}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: revealed ? onHide : onReveal,
                className: "text-white/50 text-xs hover:text-white/80 transition-colors animate-pulse flex items-center gap-1.5",
                "aria-label": revealed ? "Go back to home" : "Scroll to services",
                children: revealed ? "Go Back to Home ↑" : "Scroll to explore ↓"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const MARQUEE_ITEMS = [
  { symbol: "★", text: "Free Pickup & Delivery" },
  { symbol: "✦", text: "Mumbai's #1 Choice" },
  { symbol: "✦", text: "Trusted by 10,000+ Customers" },
  { symbol: "★", text: "Express Same-Day Service" },
  { symbol: "✦", text: "Premium Garment Care" },
  { symbol: "★", text: "Eco-Friendly Cleaning" },
  { symbol: "✦", text: "Doorstep Convenience" },
  { symbol: "★", text: "Professional Steam Iron" },
  { symbol: "✦", text: "Dry Cleaning Experts" },
  { symbol: "★", text: "5-Star Rated Service" },
  { symbol: "✦", text: "Hassle-Free Experience" },
  { symbol: "✦", text: "Safe & Hygienic Process" }
];
function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full overflow-hidden flex items-center select-none",
      style: {
        height: "48px",
        background: "linear-gradient(90deg, oklch(0.14 0.07 260) 0%, oklch(0.18 0.08 258) 50%, oklch(0.14 0.07 260) 100%)",
        borderTop: "1px solid oklch(0.82 0.12 80 / 0.20)",
        borderBottom: "1px solid oklch(0.82 0.12 80 / 0.20)"
      },
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-2 px-5 whitespace-nowrap font-semibold text-sm tracking-wide",
          style: { color: "oklch(0.82 0.12 80)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-base leading-none flex-shrink-0",
                style: { color: "oklch(0.72 0.16 72)" },
                children: item.symbol
              }
            ),
            item.text,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "ml-3 opacity-40 text-base",
                style: { color: "oklch(0.82 0.12 80)" },
                children: "|"
              }
            )
          ]
        },
        `${item.text}-${idx}`
      )) })
    }
  );
}
function ServicesSection({ onSchedule }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 lg:py-16 px-4 sm:px-8 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 sm:mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground", children: "Our Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onSchedule,
            className: "text-sm font-semibold transition-colors flex items-center gap-1",
            style: { color: "oklch(0.5 0.12 72)" },
            "data-ocid": "services-see-all",
            children: [
              "View All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl", children: "Professional garment and fabric care tailored for every need — from everyday wear to delicate specialties." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory", children: SERVICES.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { svc, onClick: onSchedule }, svc.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-10 sm:mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onSchedule,
        className: "btn-gold inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold shadow-md",
        "data-ocid": "landing-schedule-pickup",
        children: [
          "Schedule Pickup",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        ]
      }
    ) })
  ] }) });
}
function ServiceCard({ svc, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "service-card-hover relative flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-card border-2 border-border hover:border-accent/50 text-left flex-shrink-0 w-48 sm:w-auto snap-start group",
      "data-ocid": `service-${svc.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3.5 right-3.5 w-3 h-3 rounded-full",
            style: { background: "oklch(0.82 0.12 80)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-5",
            style: { background: "oklch(0.22 0.09 258)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ServiceIcon,
              {
                name: svc.icon,
                className: "w-7 h-7 sm:w-8 sm:h-8",
                style: { color: "oklch(0.82 0.12 80)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm sm:text-base text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors", children: svc.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm text-muted-foreground leading-tight", children: svc.description })
      ]
    }
  );
}
function WhyChooseSection() {
  const cards = [
    {
      icon: Truck,
      title: "Free Pickup & Delivery",
      body: "We come to your home or office. No extra charges, no hidden fees — convenience is our promise."
    },
    {
      icon: Clock,
      title: "Express Service",
      body: "Need it fast? Our express service ensures same-day or next-day delivery right to your door."
    },
    {
      icon: Star,
      title: "Professional Quality",
      body: "State-of-the-art equipment, eco-friendly detergents, and an expert team that treats your clothes with care."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-12 lg:py-16 px-4 sm:px-8 border-t border-border",
      style: { background: "oklch(0.97 0.012 250 / 0.6)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-3", children: "Why Choose DhobiGhat?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto", children: "Mumbai's most trusted laundry partner — combining technology, expertise, and genuine care." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-md transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                  style: { background: "oklch(0.7 0.15 72 / 0.12)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    card.icon,
                    {
                      className: "w-7 h-7",
                      style: { color: "oklch(0.6 0.14 72)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground mb-2 text-base sm:text-lg", children: card.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed", children: card.body })
            ]
          },
          card.title
        )) })
      ] })
    }
  );
}
function StatsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-12 lg:py-14 px-4 sm:px-8",
      style: { background: "oklch(0.14 0.07 260)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center text-center gap-2",
          "data-ocid": `stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center mb-1",
                style: { background: "oklch(0.82 0.12 80 / 0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  stat.icon,
                  {
                    className: "w-6 h-6",
                    style: { color: "oklch(0.82 0.12 80)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-bold text-3xl sm:text-4xl leading-none",
                style: { color: "oklch(0.82 0.12 80)" },
                children: stat.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm sm:text-base text-white/65 font-medium", children: stat.label })
          ]
        },
        stat.label
      )) }) })
    }
  );
}
function HowItWorksSection({ onSchedule }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 lg:py-16 px-4 sm:px-8 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-3", children: "How It Works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto", children: "Four simple steps to fresh, perfectly cleaned clothes at your door." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6", children: HOW_IT_WORKS.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-4", children: [
      idx < HOW_IT_WORKS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "hidden md:block absolute top-[26px] left-[calc(50%+28px)] right-0 h-px",
          style: { background: "oklch(0.82 0.12 80 / 0.25)" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center shadow-md",
              style: { background: "oklch(0.22 0.09 258)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                step.icon,
                {
                  className: "w-7 h-7",
                  style: { color: "oklch(0.82 0.12 80)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center",
              style: {
                background: "oklch(0.82 0.12 80)",
                color: "oklch(0.12 0.04 258)"
              },
              children: idx + 1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground text-sm sm:text-base mb-1", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: step.desc })
        ] })
      ] })
    ] }, step.step)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onSchedule,
        className: "btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold shadow-md",
        "data-ocid": "how-it-works-cta",
        children: [
          "Get Started Now",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        ]
      }
    ) })
  ] }) });
}
function TestimonialsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-12 lg:py-16 px-4 sm:px-8 border-t border-border",
      style: { background: "oklch(0.97 0.012 250 / 0.5)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 mb-3", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: "w-5 h-5 fill-current",
              style: { color: "oklch(0.75 0.15 72)" }
            },
            k
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground mb-3", children: "What Our Customers Say" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto", children: "Thousands of happy customers across Mumbai trust DhobiGhat for their laundry needs every week." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: TESTIMONIALS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4",
            "data-ocid": `testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["r1", "r2", "r3", "r4", "r5"].slice(0, t.rating).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 fill-current",
                  style: { color: "oklch(0.75 0.15 72)" }
                },
                k
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm sm:text-base text-muted-foreground leading-relaxed flex-1", children: [
                '"',
                t.review,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm",
                    style: {
                      background: "oklch(0.22 0.09 258)",
                      color: "oklch(0.82 0.12 80)"
                    },
                    children: t.initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.location })
                ] })
              ] })
            ]
          },
          t.name
        )) })
      ] })
    }
  );
}
export {
  HomePage as default
};
