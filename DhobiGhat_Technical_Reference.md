# DhobiGhat — Complete Technical Reference Document

> **Purpose:** Migration reference only. No code changes made to the deployed app.
> **Generated:** 2026-04-11T20:44:02Z
> **Stack:** Motoko (ICP) + React + TypeScript
> **Company:** DhobiGhat — Your Premium Cleaning & Revitalization Partners

---

## Table of Contents

1. [Company Details](#1-company-details)
2. [Project File Structure](#2-project-file-structure)
3. [Database Structure + SQL Schema](#3-database-structure--sql-schema)
4. [All Data Models](#4-all-data-models)
5. [Backend API Functions](#5-backend-api-functions)
6. [All Routes](#6-all-routes)
7. [Loyalty Tier Logic](#7-loyalty-tier-logic)
8. [Config.ts Reference](#8-configts-reference)
9. [Migration Guide — ICP → Node.js + Firebase](#9-migration-guide--icp--nodejs--firebase)

---

## 1. Company Details

| Field | Value |
|---|---|
| Company Name | DhobiGhat |
| Domain Name | MyDhobiGhat |
| Website | mydhobighat.com |
| ICP URL | https://mydhobighat-una.caffeine.xyz |
| Address | Shop No.2, Dinananth ITUS Tower, C.T.S. Number 1, Opposite to Kokilaben Hospital, Andheri West, Mumbai-400053 |
| Caffeine Support | support@caffeine.ai |

---

## 2. Project File Structure

```
workspace/app/
├── src/
│   ├── backend/
│   │   ├── main.mo                        ← Root actor (composition root, all stable state)
│   │   ├── types/
│   │   │   ├── common.mo                  ← Shared Result types, error codes
│   │   │   ├── users.mo                   ← UserProfile, Address, OTP types
│   │   │   ├── pickups.mo                 ← PickupRequest, ServiceType, PickupStatus
│   │   │   ├── pricing.mo                 ← PriceItem, PriceCategory
│   │   │   ├── payments.mo                ← PaymentRecord, DiscountTier, LoyaltyStats
│   │   │   └── admin.mo                   ← AdminSession, AdminStats, AdminCredentials
│   │   ├── lib/
│   │   │   ├── users.mo                   ← Pure user logic
│   │   │   ├── pickups.mo                 ← Pure pickup logic
│   │   │   ├── pricing.mo                 ← Pure pricing + 50+ item seed data
│   │   │   ├── payments.mo                ← Pure payment + loyalty logic
│   │   │   └── admin.mo                   ← Pure admin auth logic
│   │   └── mixins/
│   │       ├── users-api.mo
│   │       ├── pickups-api.mo
│   │       ├── pricing-api.mo
│   │       ├── payments-api.mo
│   │       └── admin-api.mo
│   │
│   └── frontend/src/
│       ├── config.ts                      ← ALL BRAND CONFIG IS HERE
│       ├── types/index.ts                 ← All TypeScript interfaces
│       ├── services/api.service.ts        ← Backend abstraction layer
│       ├── hooks/useQueries.ts            ← All React Query hooks
│       ├── contexts/
│       │   ├── auth.context.tsx           ← Customer auth (localStorage: dg_session)
│       │   └── admin.context.tsx          ← Admin auth
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Login.tsx
│       │   ├── Services.tsx
│       │   ├── Schedule.tsx
│       │   ├── Reschedule.tsx
│       │   ├── Dashboard.tsx
│       │   ├── Requests.tsx
│       │   ├── Prices.tsx
│       │   ├── Contact.tsx
│       │   ├── Pay.tsx
│       │   └── admin/
│       │       ├── AdminLogin.tsx
│       │       ├── AdminDashboard.tsx
│       │       ├── AdminRates.tsx
│       │       ├── AdminOrders.tsx
│       │       ├── AdminPayments.tsx
│       │       └── AdminLoyalty.tsx
│       └── components/
│           ├── Layout.tsx
│           ├── DashboardLayout.tsx
│           ├── AdminLayout.tsx
│           ├── AddressForm.tsx
│           ├── ServiceIcon.tsx
│           └── ui/ (60+ shadcn/ui components)
├── dfx.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 3. Database Structure + SQL Schema

### Current ICP Stable State Variables (in main.mo)

| Variable | Type | Key | Value |
|---|---|---|---|
| users | Map | Phone number | UserProfile |
| pickups | Map | Pickup ID string | PickupRequest |
| pickupIdCounter | Nat | — | Auto-increment counter |
| prices | List | — | PriceItem (50+ items) |
| payments | List | — | PaymentRecord |
| discountTiers | Map | Tier ID string | DiscountTier |
| customerDiscounts | Map | User Principal | CustomerDiscount |
| qualifyingCounts | Map | User Principal | Nat |
| adminCredentials | Optional | — | AdminCredentials |
| adminSessions | Map | Token string | AdminSession (24hr TTL) |

### SQL Schema (MySQL / PostgreSQL)

```sql
CREATE TABLE users (
  id            VARCHAR(36)  PRIMARY KEY,
  phone         VARCHAR(15)  UNIQUE NOT NULL,
  name          VARCHAR(100),
  email         VARCHAR(150),
  password_hash VARCHAR(255),
  is_verified   BOOLEAN DEFAULT FALSE,
  has_password  BOOLEAN DEFAULT FALSE,
  otp_code      VARCHAR(6),
  otp_expiry    BIGINT,
  created_at    BIGINT NOT NULL
);

CREATE TABLE addresses (
  id         VARCHAR(36) PRIMARY KEY,
  user_id    VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  building   VARCHAR(200),
  flat_no    VARCHAR(50),
  society    VARCHAR(200),
  landmark   VARCHAR(200),
  pin_code   VARCHAR(10),
  city       VARCHAR(100),
  state      VARCHAR(100),
  country    VARCHAR(100) DEFAULT 'India',
  is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE pickups (
  id               VARCHAR(36)  PRIMARY KEY,
  user_id          VARCHAR(36)  NOT NULL REFERENCES users(id),
  service_ids      JSON         NOT NULL,
  scheduled_date   VARCHAR(20)  NOT NULL,
  time_slot        VARCHAR(50)  NOT NULL,
  address_id       VARCHAR(36)  REFERENCES addresses(id),
  is_express       BOOLEAN DEFAULT FALSE,
  status           ENUM('pending','pickupDone','dropDone','cancelled') DEFAULT 'pending',
  total_amount     DECIMAL(10,2),
  discount_percent DECIMAL(5,2) DEFAULT 0,
  final_amount     DECIMAL(10,2),
  is_paid          BOOLEAN DEFAULT FALSE,
  payment_id       VARCHAR(36),
  created_at       BIGINT NOT NULL,
  updated_at       BIGINT NOT NULL
);

CREATE TABLE prices (
  id                   VARCHAR(36) PRIMARY KEY,
  category             ENUM('men','women','kids','household','shoes') NOT NULL,
  item_name            VARCHAR(150) NOT NULL,
  ironing_price        DECIMAL(8,2),
  steam_ironing_price  DECIMAL(8,2),
  dry_cleaning_price   DECIMAL(8,2),
  wash_fold_price      DECIMAL(8,2),
  unit                 ENUM('perPiece','perKg','perMeter','perSeat'),
  updated_at           BIGINT
);

CREATE TABLE payments (
  id                  VARCHAR(36) PRIMARY KEY,
  user_id             VARCHAR(36) NOT NULL REFERENCES users(id),
  pickup_id           VARCHAR(36) NOT NULL REFERENCES pickups(id),
  amount              DECIMAL(10,2),
  discount_percent    DECIMAL(5,2) DEFAULT 0,
  final_amount        DECIMAL(10,2),
  status              ENUM('pending','paid','failed') DEFAULT 'pending',
  upi_transaction_id  VARCHAR(100),
  marked_by_admin     BOOLEAN DEFAULT FALSE,
  created_at          BIGINT NOT NULL,
  updated_at          BIGINT NOT NULL
);

CREATE TABLE discount_tiers (
  id          VARCHAR(36) PRIMARY KEY,
  name        VARCHAR(50),
  percentage  DECIMAL(5,2),
  description VARCHAR(200)
);

CREATE TABLE customer_discounts (
  user_id      VARCHAR(36) NOT NULL REFERENCES users(id),
  tier_id      VARCHAR(36) NOT NULL REFERENCES discount_tiers(id),
  assigned_at  BIGINT,
  assigned_by  VARCHAR(50),
  PRIMARY KEY (user_id)
);

CREATE TABLE qualifying_counts (
  user_id          VARCHAR(36) NOT NULL REFERENCES users(id),
  qualifying_count INT DEFAULT 0,
  PRIMARY KEY (user_id)
);

CREATE TABLE admin_credentials (
  id                    INT PRIMARY KEY DEFAULT 1,
  email                 VARCHAR(150) UNIQUE NOT NULL,
  password_hash         VARCHAR(255),
  last_password_reset   BIGINT,
  must_reset_password   BOOLEAN DEFAULT FALSE
);

CREATE TABLE admin_sessions (
  token       VARCHAR(255) PRIMARY KEY,
  expires_at  BIGINT NOT NULL,
  email       VARCHAR(150)
);
```

### Firebase Firestore Collections

```
/users/{userId}             - phone, name, email, passwordHash, isVerified, hasPassword, otpCode, otpExpiry, createdAt, addresses[]
/pickups/{pickupId}         - userId, serviceIds[], scheduledDate, timeSlot, addressId, isExpress, status, totalAmount, discountPercent, finalAmount, isPaid, paymentId, createdAt, updatedAt
/prices/{priceId}           - category, itemName, ironingPrice, steamIroningPrice, dryCleaningPrice, washFoldPrice, unit, updatedAt
/payments/{paymentId}       - userId, pickupId, amount, discountPercent, finalAmount, status, upiTransactionId, markedByAdmin, createdAt, updatedAt
/discountTiers/{tierId}     - name, percentage, description
/customerDiscounts/{userId} - tierId, assignedAt, assignedBy
/qualifyingCounts/{userId}  - qualifyingCount
/adminCredentials/main      - email, passwordHash, lastPasswordReset, mustResetPassword
/adminSessions/{token}      - expiresAt, email
```

---

## 4. All Data Models

### UserProfile
id (UUID), name, email, phone (primary login key), passwordHash (XOR prototype — use bcrypt in production), addresses[], createdAt, isVerified, isPasswordConfigured, otpCode, otpExpiry

### Address
id, building, flatNo, society, landmark, pinCode, city (auto from PIN), state (auto from PIN), country (default: India), isDefault

### PickupRequest
id (PKP-001 format), userId, serviceIds[] (dryCleaning | washSteamIron | washFold | shoeCleaning | steamIron), scheduledDate (YYYY-MM-DD), timeSlot, addressId, isExpress, status (pending | pickupDone | dropDone | cancelled), totalAmount, discountPercent, finalAmount, isPaid, paymentId, createdAt, updatedAt

### PriceItem
id, category (men | women | kids | household | shoes), itemName, ironingPrice, steamIroningPrice, dryCleaningPrice, washFoldPrice, unit (perPiece | perKg | perMeter | perSeat), updatedAt

### PaymentRecord
id, userId, pickupId, amount, discountPercent, finalAmount, status (pending | paid | failed), upiTransactionId, markedByAdmin, createdAt, updatedAt

### DiscountTier
id (tier-2pct | tier-5pct | tier-7pct | tier-10pct), name (Bronze | Silver | Gold | Platinum), percentage (2 | 5 | 7 | 10), description

### LoyaltyStats
userId, totalPickups, qualifyingOrderCount, tier, discountPercent, ordersToNextTier

### AdminStats
totalUsers, totalOrders, pendingPickups, completedPickups, totalRevenue, pendingPayments

### AdminCredentials
email, passwordHash, lastPasswordReset, mustResetPassword

### AdminSession
token, expiresAt (24hr TTL), email

---

## 5. Backend API Functions

### Users
- registerUser(phone, name, email, password)
- loginUser(phone, password)
- generateOTP(phone)
- verifyOTP(phone, otp)
- setupPassword(phone, otp, newPassword)
- resetPasswordWithOTP(phone, otp, newPassword)
- generateOTPForPasswordReset(phone)
- getUser(userId)
- addAddress(userId, address)
- getAddresses(userId)
- updateAddress(userId, addressId, address)

### Pickups
- createPickup(serviceIds, scheduledDate, timeSlot, addressId, isExpress)
- getPickup(pickupId)
- getUserPickups()
- getAllPickups() — admin only
- updatePickupStatus(pickupId, status) — admin only
- reschedulePickup(pickupId, newDate, newTimeSlot)
- setPickupAmount(pickupId, amount, discountPercent) — admin only
- markPickupPaid(pickupId, paymentId)

### Pricing
- getAllPrices()
- getPricesByCategory(category)
- updatePrice(itemId, prices) — admin only
- addPriceItem(item) — admin only
- initDefaultPrices()

### Payments
- createPayment(userId, pickupId, amount)
- getPayment(paymentId)
- getUserPayments(userId)
- getAllPayments() — admin only
- markPaymentPaid(paymentId, upiTxnId, byAdmin)
- markPaymentPending(paymentId)
- getDiscountTiers()
- addDiscountTier(tier) — admin only
- updateDiscountTier(tierId, percentage) — admin only
- assignCustomerDiscount(userId, tierId) — admin only
- getCustomerDiscount(userId)
- getLoyaltyStats() — admin only
- getMyLoyaltyStats()
- initDefaultDiscountTiers()

### Admin
- adminLogin(email, password) — returns 24hr session token
- validateAdminToken(token)
- resetAdminPassword(currentPassword, newPassword)
- getAdminStats()
- getRepeaterCustomers()
- checkPasswordResetRequired()
- initAdminCredentials()

---

## 6. All Routes

### Customer Routes
| Route | Page | Auth |
|---|---|---|
| / | Home | No |
| /login | Login / Register / Forgot Password | No |
| /services | Multi-select service picker | Yes |
| /schedule | Date + time slot picker | Yes |
| /dashboard | My Tier card + address management | Yes |
| /dashboard/requests | Order history | Yes |
| /dashboard/reschedule | Reschedule eligible pickups | Yes |
| /prices | Price catalog | No |
| /contact | Contact info | No |
| /pay | UPI payment | Yes |

### Admin Routes
| Route | Page | Auth |
|---|---|---|
| /admin-login | Admin login | No |
| /admin | Stats dashboard | Admin |
| /admin/rates | Edit price catalog | Admin |
| /admin/orders | Update order statuses | Admin |
| /admin/payments | Mark payments | Admin |
| /admin/loyalty | Manage loyalty tiers | Admin |

### Hamburger Menu Items
Home, Request Pickup, Reschedule Pickup, My Request List, Price List, Contact Us, Pay Now (UPI), Logout

---

## 7. Loyalty Tier Logic

| Qualifying Orders | Tier | Discount |
|---|---|---|
| 1 | None | 0% |
| 2 | Bronze | 2% |
| 3 | Silver | 5% |
| 4–9 | Gold | 7% |
| 10+ | Platinum | 10% |

**Qualifying Order Rule:** Only orders with 2 or more services selected count as qualifying orders toward tier progression. Single-service orders are tracked but do not advance the tier.

**Tier IDs:** tier-2pct (Bronze, 2%), tier-5pct (Silver, 5%), tier-7pct (Gold, 7%), tier-10pct (Platinum, 10%)

Discount is automatically applied to new pickups. Admin can view and manually override any customer's tier from the Admin Loyalty page.

---

## 8. Config.ts Reference

File location: src/frontend/src/config.ts

All brand, company, and environment settings are centralised here. For migration, update only this file for brand/config changes.

Key config fields:
- companyName: "DhobiGhat"
- tagline: "Your Premium Cleaning & Revitalization Partners"
- address: "Shop No.2, Dinananth ITUS Tower, C.T.S. Number 1, Opposite to Kokilaben Hospital, Andheri West, Mumbai-400053"
- phone: (your phone number)
- email: (your email)
- website: "mydhobighat.com"
- upiId: (your UPI ID — replace with live UPI ID for production)
- upiName: "DhobiGhat"
- logo: "/assets/logo.png"
- heroImages: ["/assets/hero-1.jpg", "/assets/hero-2.jpg", "/assets/hero-3.jpg"]
- apiBaseUrl: "https://mydhobighat-una.caffeine.xyz" (update to Node.js server URL on migration)
- environment: "production"
- otpSimulated: true (set to false and connect SMS gateway for production)
- adminEmail: (your admin domain email)

Migration Checklist:
- Update apiBaseUrl to your new Node.js/Firebase API URL
- Set otpSimulated: false and connect MSG91/Twilio for SMS OTP
- Replace upiId with live UPI ID or Razorpay key
- Swap logo and hero image paths to new CDN/hosting URLs
- Update adminEmail, phone, and email with live details

---

## 9. Migration Guide — ICP → Node.js + Firebase

### Target Stack
| Layer | Current (ICP) | Target |
|---|---|---|
| Frontend | React + TypeScript | React + TypeScript on Netlify/Vercel (free) |
| Backend | Motoko canister | Node.js + Express on Firebase Functions |
| Database | Canister stable state | Firebase Firestore |
| Auth | Custom OTP + password | Custom JWT auth (keep existing flow) |
| Domain | mydhobighat-una.caffeine.xyz | mydhobighat.com |

### Step 1 — Set Up Firebase Project
1. Go to console.firebase.google.com
2. Create project: "DhobiGhat"
3. Enable Firestore Database (production mode)
4. Enable Firebase Functions
5. Note your firebaseConfig for the frontend

### Step 2 — Set Up Node.js Backend (Firebase Functions)
Create Express routes replicating all backend API functions from Section 5.
Key packages: express, firebase-admin, bcrypt, jsonwebtoken, cors

Replace XOR password hashing with bcrypt.
Issue JWT tokens on login. Keep localStorage key dg_session unchanged.

### Step 3 — Rewrite api.service.ts (Frontend API Layer)
Replace all canister calls with fetch() pointing to your Firebase Functions URL.
Only api.service.ts changes — all React pages, components, hooks, and contexts stay the same.

### Step 4 — Migrate Authentication
- Replace XOR with bcrypt in Node.js
- Issue JWT tokens on login
- Keep localStorage key dg_session the same
- Connect MSG91 or Twilio for real SMS OTP

### Step 5 — Seed Default Data
Run once after deploying:
- Seed 50+ price items into Firestore /prices
- Seed 4 discount tiers into Firestore /discountTiers
- Create admin credentials in Firestore /adminCredentials/main

### Step 6 — Deploy Frontend to Netlify/Vercel
Build: cd src/frontend && pnpm build (outputs to dist/)
Deploy dist/ to Netlify via CLI or dashboard drag-and-drop.
Update config.ts: set apiBaseUrl to Firebase Functions URL, set otpSimulated: false.

### Step 7 — Connect Custom Domain
In Netlify/Vercel domain settings: add mydhobighat.com
In GoDaddy DNS: add CNAME pointing to Netlify/Vercel URL

### Step 8 — Production Checklist Before Go-Live
- Replace XOR with bcrypt for passwords
- Connect real SMS OTP (MSG91/Twilio)
- Integrate Razorpay SDK for UPI payments
- Set up Firebase security rules
- Set JWT_SECRET as environment variable
- Update config.ts with live UPI ID, phone, admin email
- Set otpSimulated: false
- Test all flows end-to-end
- Enable CORS for your frontend domain only

### Cost Estimate for Migrated Stack
| Service | Free Tier | Paid |
|---|---|---|
| Netlify Frontend | Free (100GB bandwidth/mo) | $19/month Pro |
| Firebase Functions | Free (2M calls/mo) | Pay-per-use |
| Firebase Firestore | Free (50K reads/day) | $0.06/100K reads |
| GoDaddy Domain | — | ~Rs 800-1500/year |
| Twilio OTP SMS | Free trial | ~Rs 0.50-1.00 per SMS |
| Razorpay Payments | Free setup | 2% per transaction |

Estimated monthly cost for startup: Rs 800–2,000/month

---

## Notes

- This document is for migration reference only — no changes made to the deployed app.
- The deployed app on ICP continues to run exactly as before.
- All prices, OTP logic, and admin credentials reflect the prototype design.
- Production versions should use bcrypt, real SMS, and Razorpay.
- For code export requests, contact: support@caffeine.ai

---
*DhobiGhat Technical Reference — Generated 2026-04-11 | Caffeine / ICP Platform*
