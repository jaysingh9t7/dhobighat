# DhobiGhat Design Brief

**Purpose** | Premium laundry & cleaning service booking app. Mobile-first, built for busy professionals in Mumbai scheduling pickups and managing orders.

**Tone** | Trustworthy, professional, premium. Dark navy primary signals reliability; clean surfaces and gold accents convey luxury service.

**Differentiation** | Card-based service grid with icon system. Time-slot picker modal. Address selector dropdown. Clean section separation via layered backgrounds (header, hero, cards, footer).

## Color Palette (OKLCH)

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary | `0.28 0.09 258` Navy | `0.28 0.09 258` Navy | Nav, headers, primary text, trust |
| Accent | `0.70 0.15 70` Gold | `0.70 0.15 70` Gold | CTAs (Schedule, Pay), highlights |
| Background | `0.98 0 0` Cream | `0.12 0 0` Deep Navy | Page surface |
| Card | `0.99 0 0` White | `0.16 0 0` Navy+1 | Content containers |
| Muted | `0.92 0 0` Light | `0.20 0 0` Navy+2 | Secondary, disabled |
| Destructive | `0.55 0.20 25` Red | `0.65 0.20 25` Red | Cancellations, errors |
| Success | `0.65 0.15 150` Green | `0.65 0.15 150` Green | Confirmations, completed |

## Typography

| Layer | Font | Scale | Weight | Use |
|-------|------|-------|--------|-----|
| Display | DM Sans | 32px | 700 | Hero, section titles |
| Body | DM Sans | 16px | 400 | Body copy, labels |
| Mono | Geist Mono | 14px | 400 | Prices, times, confirmations |

## Structural Zones

| Zone | Light BG | Dark BG | Treatment |
|------|----------|---------|-----------|
| Header/Nav | `card` White | `card` Navy+1 | `border-b` `border-border`, white text on navy |
| Hero | Full-width image or gradient accent | Navy+1 | Clean, serviceable on mobile |
| Services Grid | Alternating `card` / `background` | Alternating `card` / `background` | 1 col mobile, 2–3 col desktop, gap-4 |
| Booking Modal | `popover` White | `popover` Navy+2 | Center overlay, shadow-elevated |
| Footer | `sidebar` White | `sidebar` Navy | White text, white text on navy |

## Component Patterns

- **Buttons**: Rounded-md (8px). Primary=Accent gold, Secondary=Muted, Destructive=Red. Min 44px height (touch). `transition-smooth` on all interactive.
- **Cards**: `rounded-md`, `shadow-card`, `border-border`, 1px border top/sides only for visual interest.
- **Inputs**: `rounded-sm` (4px), `border-input`, focus ring `ring-accent`.
- **Service Icons**: Square 64px containers, `bg-muted` light, `bg-muted` dark, icon center. No overflow.

## Motion

- **Default**: `transition-smooth` (0.3s cubic-bezier) on hover, focus, active states.
- **Modal**: Fade-in 200ms ease-out (use `accordion-down`/`accordion-up` animations).
- **Buttons**: Subtle scale on hover (1.02). No bounce.

## Spacing & Rhythm

- **Base unit**: 4px. Multiples: 4, 8, 12, 16, 24, 32, 48.
- **Gutter**: 16px mobile, 24px desktop.
- **Section gap**: 32px between major sections.
- **Card padding**: 16px on mobile, 24px on desktop.

## Anti-Patterns

- No purple gradients.
- No rounded-full unless pill button.
- No multiple accent colors in same section.
- No box-shadow glow effects.
- No animations on every element (choreograph intent, not decoration).

## Dark Mode Notes

Dark navy primary (`0.28 0.09 258`) is identical in light and dark for consistency. Gold accent pops against deep navy background. Borders use subtle blue tint (`0.24 0.04 258`) instead of grey for cohesion.
