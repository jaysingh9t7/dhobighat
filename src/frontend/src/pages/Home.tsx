import { Layout } from "@/components/Layout";
import { ServiceIcon } from "@/components/ServiceIcon";
import { APP_CONFIG, SERVICES } from "@/config";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  Package,
  Shield,
  Star,
  Truck,
  Users,
  Wind,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Hero features ───────────────────────────────────────────────────────────
const HERO_FEATURES = [
  { icon: Truck, label: "Free Pickup" },
  { icon: Wind, label: "Express Delivery" },
  { icon: Star, label: "Expert Cleaning" },
  { icon: Shield, label: "Stain Removal" },
];

const HERO_IMAGES = [
  "/assets/generated/hero-laundry.dim_800x500.jpg",
  "/assets/generated/hero-laundry-2.dim_800x500.jpg",
  "/assets/generated/hero-laundry-3.dim_800x500.jpg",
];

// ─── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "5,000+", label: "Happy Customers", icon: Users },
  { value: "10,000+", label: "Orders Completed", icon: Package },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "3 Years", label: "Of Excellence", icon: Shield },
];

// ─── How It Works steps ───────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Schedule Pickup",
    desc: "Choose your service and preferred pickup slot in under 60 seconds.",
  },
  {
    step: "02",
    icon: Truck,
    title: "We Collect",
    desc: "Our team arrives at your door on time, with zero hassle for you.",
  },
  {
    step: "03",
    icon: Wind,
    title: "Expert Cleaning",
    desc: "Garments are cleaned using professional-grade equipment and eco detergents.",
  },
  {
    step: "04",
    icon: Package,
    title: "Free Delivery",
    desc: "Fresh, folded clothes returned to your doorstep — always on schedule.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Andheri West",
    rating: 5,
    review:
      "DhobiGhat transformed my wardrobe routine completely. The pickup is always on time and my silk sarees come back looking brand new. Absolutely love the service!",
    initials: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Bandra East",
    rating: 5,
    review:
      "Best laundry service in Mumbai, hands down. The app is super easy, staff are courteous, and the quality is consistently excellent. Highly recommend!",
    initials: "RM",
  },
  {
    name: "Sneha Kulkarni",
    location: "Versova",
    rating: 5,
    review:
      "I've tried many laundry services but DhobiGhat stands out for its professionalism. Stubborn stains removed, clothes ironed perfectly. Great value for money.",
    initials: "SK",
  },
  {
    name: "Aditya Nair",
    location: "Juhu",
    rating: 5,
    review:
      "The express service is a lifesaver for my busy schedule. Same-day delivery with top-notch quality — I'm a loyal customer for life!",
    initials: "AN",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timerRef.current ?? undefined);
  }, []);

  // Scroll listener — reveal when user scrolls past 50% of viewport height
  useEffect(() => {
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
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function handleHide() {
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleGoToServices() {
    void navigate({ to: "/services" });
  }

  return (
    <Layout showHeader={false} showFooter={revealed}>
      {/* ── FULL-SCREEN SPLASH ─────────────────────────────────────────────── */}
      <HeroSplash
        heroIdx={heroIdx}
        imgErrors={imgErrors}
        onImgError={(i) => setImgErrors((prev) => ({ ...prev, [i]: true }))}
        onReveal={handleReveal}
        onHide={handleHide}
        revealed={revealed}
        onSchedule={handleGoToServices}
        onAdmin={() => void navigate({ to: "/admin" })}
        onCustomerLogin={() => void navigate({ to: "/login" })}
      />

      {/* ── MARQUEE STRIP — always visible ─────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── CONTENT SECTIONS ───────────────────────────────────────────────── */}
      {/* Hidden on ALL screen sizes until user clicks Scroll to Explore or scrolls */}
      <div
        ref={servicesRef}
        className={`${revealed ? "block" : "hidden"} animate-in fade-in duration-500`}
      >
        <ServicesSection onSchedule={handleGoToServices} />
        <WhyChooseSection />
        <StatsSection />
        <HowItWorksSection onSchedule={handleGoToServices} />
        <TestimonialsSection />

        {/* Admin corner link */}
        <div className="bg-background py-4 px-4 flex justify-end max-w-6xl mx-auto">
          <button
            type="button"
            onClick={() => void navigate({ to: "/admin" })}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="landing-admin-login"
          >
            Admin Login →
          </button>
        </div>
      </div>
    </Layout>
  );
}

// ─── Hero Splash ──────────────────────────────────────────────────────────────
interface HeroSplashProps {
  heroIdx: number;
  imgErrors: Record<number, boolean>;
  onImgError: (i: number) => void;
  onReveal: () => void;
  onHide: () => void;
  revealed: boolean;
  onSchedule: () => void;
  onAdmin: () => void;
  onCustomerLogin: () => void;
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
  onCustomerLogin,
}: HeroSplashProps) {
  return (
    <section
      className="relative min-h-[600px] md:min-h-[640px] overflow-hidden"
      style={{ background: "oklch(0.14 0.07 260)" }}
    >
      {/* Background carousel */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === heroIdx ? 1 : 0 }}
          aria-hidden="true"
        >
          {!imgErrors[i] ? (
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              onError={() => onImgError(i)}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, oklch(0.14 0.07 ${260 + i * 5}) 0%, oklch(0.22 0.09 ${255 + i * 5}) 100%)`,
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.10 0.07 260 / 0.92) 0%, oklch(0.15 0.08 258 / 0.80) 50%, oklch(0.18 0.07 255 / 0.55) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Header bar ─────────────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5">
        {/* Mobile layout: logo row → name+tagline row → buttons row (all stacked) */}
        {/* Desktop (sm+): logo+name side by side with buttons on the right */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={APP_CONFIG.logo}
                alt="DhobiGhat logo"
                className="h-20 w-auto object-contain rounded-xl shadow-lg flex-shrink-0"
                style={{ maxWidth: "160px" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="text-left min-w-0">
                <h2 className="font-display font-bold text-4xl leading-tight text-white whitespace-nowrap">
                  Dhobi
                  <span style={{ color: "oklch(0.82 0.12 80)" }}>Ghat</span>
                </h2>
                <p
                  className="text-sm mt-0.5 font-medium leading-snug"
                  style={{ color: "oklch(0.82 0.12 80 / 0.85)" }}
                >
                  {APP_CONFIG.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={onCustomerLogin}
                className="text-white/90 text-sm hover:text-white transition-colors border border-white/30 rounded-xl px-5 py-2.5 backdrop-blur-sm font-semibold whitespace-nowrap"
                style={{ background: "oklch(0.82 0.12 80 / 0.20)" }}
                data-ocid="customer-login-link"
              >
                Customer Login
              </button>
              <button
                type="button"
                onClick={onAdmin}
                className="text-white/70 text-sm hover:text-white/90 transition-colors border border-white/20 rounded-xl px-5 py-2.5 backdrop-blur-sm font-medium whitespace-nowrap"
                style={{ background: "oklch(1 0 0 / 0.06)" }}
                data-ocid="admin-login-link"
              >
                Admin Login
              </button>
            </div>
          </div>

          {/* Mobile layout: centered stack — logo → name+tagline → buttons */}
          <div className="flex sm:hidden flex-col items-center gap-3">
            <img
              src={APP_CONFIG.logo}
              alt="DhobiGhat logo"
              className="h-14 w-auto object-contain rounded-xl shadow-lg flex-shrink-0"
              style={{ maxWidth: "120px" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="text-center">
              <h2 className="font-display font-bold text-2xl leading-tight text-white whitespace-nowrap">
                Dhobi<span style={{ color: "oklch(0.82 0.12 80)" }}>Ghat</span>
              </h2>
              <p
                className="text-xs mt-0.5 font-medium leading-snug"
                style={{ color: "oklch(0.82 0.12 80 / 0.85)" }}
              >
                {APP_CONFIG.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={onCustomerLogin}
                className="flex-1 text-white/90 text-xs hover:text-white transition-colors border border-white/30 rounded-xl px-3 py-2 backdrop-blur-sm font-semibold text-center whitespace-nowrap"
                style={{ background: "oklch(0.82 0.12 80 / 0.20)" }}
                data-ocid="customer-login-link"
              >
                Customer Login
              </button>
              <button
                type="button"
                onClick={onAdmin}
                className="flex-1 text-white/70 text-xs hover:text-white/90 transition-colors border border-white/20 rounded-xl px-3 py-2 backdrop-blur-sm font-medium text-center whitespace-nowrap"
                style={{ background: "oklch(1 0 0 / 0.06)" }}
                data-ocid="admin-login-link"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main hero content ───────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[600px] md:min-h-[640px] flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 sm:px-8 pt-[230px] sm:pt-[150px] md:pt-[120px] pb-8 gap-10 md:gap-16 max-w-6xl mx-auto w-full">
          {/* Left text block */}
          <div className="flex-1 text-white flex flex-col gap-5 sm:gap-7">
            <div className="inline-flex items-center gap-2 self-start">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "oklch(0.82 0.12 80)" }}
                aria-hidden="true"
              />
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase"
                style={{ color: "oklch(0.82 0.12 80)" }}
              >
                Mumbai's #1 Choice
              </p>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-balance">
              Premium
              <br />
              <span style={{ color: "oklch(0.82 0.12 80)" }}>Laundry</span>
              <br />
              Service
            </h1>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-md">
              {APP_CONFIG.tagline}. Professional care delivered right to your
              doorstep across Mumbai.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5">
              {HERO_FEATURES.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white border border-white/25 backdrop-blur-sm"
                  style={{ background: "oklch(1 0 0 / 0.10)" }}
                >
                  <f.icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.82 0.12 80)" }}
                  />
                  {f.label}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onSchedule}
                className="btn-gold inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base font-bold shadow-lg"
                data-ocid="hero-schedule-pickup"
              >
                Schedule Pickup
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={revealed ? onHide : onReveal}
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold text-white border border-white/35 backdrop-blur-sm transition-smooth hover:border-white/65 hover:bg-white/10"
                style={{ background: "oklch(1 0 0 / 0.08)" }}
                data-ocid="hero-explore"
              >
                {revealed ? "Go Back to Home ↑" : "Explore Services"}
              </button>
            </div>
          </div>

          {/* Right image panel — desktop only */}
          <div className="hidden md:flex flex-col gap-4 w-96 lg:w-[450px] flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10">
              <img
                src={HERO_IMAGES[heroIdx]}
                alt="Premium laundry service"
                className="w-full h-64 lg:h-80 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div
              className="mx-2 rounded-2xl px-5 py-4 flex items-center gap-4 border border-white/15 backdrop-blur-sm"
              style={{ background: "oklch(1 0 0 / 0.10)" }}
            >
              <CalendarCheck
                className="w-10 h-10 flex-shrink-0"
                style={{ color: "oklch(0.82 0.12 80)" }}
              />
              <div className="min-w-0">
                <p className="text-white font-bold text-base">
                  Free Pickup & Delivery
                </p>
                <p className="text-white/65 text-sm mt-0.5">
                  At your doorstep, on time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel dots + scroll hint */}
        <div className="relative z-10 pb-10 flex flex-col items-center gap-4">
          <div className="flex gap-2.5">
            {HERO_IMAGES.map((img, i) => (
              <div
                key={`dot-${img}`}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === heroIdx ? 28 : 8,
                  height: 8,
                  background:
                    i === heroIdx
                      ? "oklch(0.82 0.12 80)"
                      : "oklch(1 0 0 / 0.35)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={revealed ? onHide : onReveal}
            className="text-white/50 text-xs hover:text-white/80 transition-colors animate-pulse flex items-center gap-1.5"
            aria-label={revealed ? "Go back to home" : "Scroll to services"}
          >
            {revealed ? "Go Back to Home ↑" : "Scroll to explore ↓"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee Strip ────────────────────────────────────────────────────────────
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
  { symbol: "✦", text: "Safe & Hygienic Process" },
];

function MarqueeStrip() {
  // Duplicate items for seamless loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="w-full overflow-hidden flex items-center select-none"
      style={{
        height: "48px",
        background:
          "linear-gradient(90deg, oklch(0.14 0.07 260) 0%, oklch(0.18 0.08 258) 50%, oklch(0.14 0.07 260) 100%)",
        borderTop: "1px solid oklch(0.82 0.12 80 / 0.20)",
        borderBottom: "1px solid oklch(0.82 0.12 80 / 0.20)",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((item, idx) => (
          <span
            key={`${item.text}-${idx}`}
            className="inline-flex items-center gap-2 px-5 whitespace-nowrap font-semibold text-sm tracking-wide"
            style={{ color: "oklch(0.82 0.12 80)" }}
          >
            <span
              className="text-base leading-none flex-shrink-0"
              style={{ color: "oklch(0.72 0.16 72)" }}
            >
              {item.symbol}
            </span>
            {item.text}
            <span
              className="ml-3 opacity-40 text-base"
              style={{ color: "oklch(0.82 0.12 80)" }}
            >
              |
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection({ onSchedule }: { onSchedule: () => void }) {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12">
          <div className="flex items-end justify-between mb-3">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Our Services
            </h2>
            <button
              type="button"
              onClick={onSchedule}
              className="text-sm font-semibold transition-colors flex items-center gap-1"
              style={{ color: "oklch(0.5 0.12 72)" }}
              data-ocid="services-see-all"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Professional garment and fabric care tailored for every need — from
            everyday wear to delicate specialties.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 md:grid-cols-5 sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} onClick={onSchedule} />
          ))}
        </div>

        <div className="flex justify-center mt-10 sm:mt-12">
          <button
            type="button"
            onClick={onSchedule}
            className="btn-gold inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold shadow-md"
            data-ocid="landing-schedule-pickup"
          >
            Schedule Pickup
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  svc: (typeof SERVICES)[number];
  onClick: () => void;
}

function ServiceCard({ svc, onClick }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="service-card-hover relative flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-card border-2 border-border hover:border-accent/50 text-left flex-shrink-0 w-48 sm:w-auto snap-start group"
      data-ocid={`service-${svc.id}`}
    >
      <div
        className="absolute top-3.5 right-3.5 w-3 h-3 rounded-full"
        style={{ background: "oklch(0.82 0.12 80)" }}
        aria-hidden="true"
      />
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
        style={{ background: "oklch(0.22 0.09 258)" }}
      >
        <ServiceIcon
          name={svc.icon}
          className="w-7 h-7 sm:w-8 sm:h-8"
          style={{ color: "oklch(0.82 0.12 80)" }}
        />
      </div>
      <span className="font-bold text-sm sm:text-base text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
        {svc.name}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground leading-tight">
        {svc.description}
      </span>
    </button>
  );
}

// ─── Why Choose Section ───────────────────────────────────────────────────────
function WhyChooseSection() {
  const cards = [
    {
      icon: Truck,
      title: "Free Pickup & Delivery",
      body: "We come to your home or office. No extra charges, no hidden fees — convenience is our promise.",
    },
    {
      icon: Clock,
      title: "Express Service",
      body: "Need it fast? Our express service ensures same-day or next-day delivery right to your door.",
    },
    {
      icon: Star,
      title: "Professional Quality",
      body: "State-of-the-art equipment, eco-friendly detergents, and an expert team that treats your clothes with care.",
    },
  ];

  return (
    <section
      className="py-12 lg:py-16 px-4 sm:px-8 border-t border-border"
      style={{ background: "oklch(0.97 0.012 250 / 0.6)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            Why Choose DhobiGhat?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Mumbai's most trusted laundry partner — combining technology,
            expertise, and genuine care.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "oklch(0.7 0.15 72 / 0.12)" }}
              >
                <card.icon
                  className="w-7 h-7"
                  style={{ color: "oklch(0.6 0.14 72)" }}
                />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-base sm:text-lg">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section
      className="py-12 lg:py-14 px-4 sm:px-8"
      style={{ background: "oklch(0.14 0.07 260)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2"
              data-ocid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-1"
                style={{ background: "oklch(0.82 0.12 80 / 0.15)" }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.82 0.12 80)" }}
                />
              </div>
              <span
                className="font-display font-bold text-3xl sm:text-4xl leading-none"
                style={{ color: "oklch(0.82 0.12 80)" }}
              >
                {stat.value}
              </span>
              <span className="text-sm sm:text-base text-white/65 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────
function HowItWorksSection({ onSchedule }: { onSchedule: () => void }) {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Four simple steps to fresh, perfectly cleaned clothes at your door.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {HOW_IT_WORKS.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col gap-4">
              {/* Connector line between steps on desktop */}
              {idx < HOW_IT_WORKS.length - 1 && (
                <div
                  className="hidden md:block absolute top-[26px] left-[calc(50%+28px)] right-0 h-px"
                  style={{ background: "oklch(0.82 0.12 80 / 0.25)" }}
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: "oklch(0.22 0.09 258)" }}
                  >
                    <step.icon
                      className="w-7 h-7"
                      style={{ color: "oklch(0.82 0.12 80)" }}
                    />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      background: "oklch(0.82 0.12 80)",
                      color: "oklch(0.12 0.04 258)",
                    }}
                  >
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={onSchedule}
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold shadow-md"
            data-ocid="how-it-works-cta"
          >
            Get Started Now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section
      className="py-12 lg:py-16 px-4 sm:px-8 border-t border-border"
      style={{ background: "oklch(0.97 0.012 250 / 0.5)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            {["s1", "s2", "s3", "s4", "s5"].map((k) => (
              <Star
                key={k}
                className="w-5 h-5 fill-current"
                style={{ color: "oklch(0.75 0.15 72)" }}
              />
            ))}
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Thousands of happy customers across Mumbai trust DhobiGhat for their
            laundry needs every week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              data-ocid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {["r1", "r2", "r3", "r4", "r5"].slice(0, t.rating).map((k) => (
                  <Star
                    key={k}
                    className="w-4 h-4 fill-current"
                    style={{ color: "oklch(0.75 0.15 72)" }}
                  />
                ))}
              </div>
              {/* Review */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                "{t.review}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: "oklch(0.22 0.09 258)",
                    color: "oklch(0.82 0.12 80)",
                  }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
