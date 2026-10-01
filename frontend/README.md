# ⚡ profit.exe — AI-Powered Business Intelligence for Small Merchants

> *"Your business is running. Is it profitable?"*

A production-grade, venture-quality fintech SaaS platform built for small retail merchants. Powered by the **AI Opportunity Engine**, profit.exe surfaces real-time revenue opportunities, inventory stockout risks, profit leaks, and cross-sell combos with measurable financial impact.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Expo
npx expo start
```

Press:
- **`w`** → Web Browser (Desktop SaaS Experience with Sidebar)
- **`a`** → Android Emulator
- **`i`** → iOS Simulator
- **Scan QR** → Expo Go

---

## 🏛️ System Architecture & Product Modules

| Module | Route | Purpose & Enterprise Capabilities |
|---|---|---|
| **Overview** | `app/(tabs)/index.tsx` | Executive summary, 4 compact financial KPIs, restrained sales velocity chart, and top priority opportunities. |
| **AI Opportunity Engine** | `app/(tabs)/opportunities.tsx` | Central intelligence cockpit surfacing actionable decisions (Stockout Risk, Profit Leak, Cross-Sell Upside, Dead Stock) with ₹ impact metrics and interactive evidence drawers. |
| **Sales Ledger** | `app/(tabs)/sales.tsx` | Live POS transaction streams, tender breakdown (UPI, Cash, Card), and automated PDF tax invoice downloads. |
| **Inventory Intelligence** | `app/(tabs)/inventory.tsx` | Table-first inventory health, stock runway calculations, 7D demand velocity, and full CRUD catalog integration. |
| **Billing & POS** | `app/(tabs)/billing.tsx` | High-velocity point-of-sale checkout terminal with instant product search, quantity steppers, discount/tax calculations, and thermal/PDF printing. |
| **Customer Directory** | `app/(tabs)/customers.tsx` | CRM telemetry tracking repeat customer visit frequency, lifetime spend, average basket size, and tender preference. |
| **Growth Analytics** | `app/(tabs)/analytics.tsx` | Audited financial analytics across 7D/30D/90D windows, gross profit margins, category contribution, and machine learning sales forecasts. |
| **profit.exe Assistant** | `app/(tabs)/chatbot.tsx` | Conversational retail copilot presenting structured business intelligence reports (Recommendation, Evidence, Expected ₹ Impact, and 1-Click Action triggers). |

---

## 🎨 Design Philosophy & Visual Language

- **Reference Standards**: Linear + Stripe + Ramp + Vercel.
- **Calm, Restrained Palette**: Crisp neutral canvas (`#F8FAFC`), pure white cards (`#FFFFFF`), dark contrast typography (`#0F172A`), precision royal blue (`#2563EB`).
- **Semantic Colors Only**: Emerald for Opportunity (`#10B981`), Amber for Attention (`#F59E0B`), Coral for Risk (`#EF4444`), Blue for Informational (`#3B82F6`).
- **Zero AI Clichés**: No glowing neon borders, no glassmorphism, no robot emojis, no floating gradient blobs.
- **Desktop Sidebar**: Compact, elegant sidebar with merchant switcher ("Sri Krishna Kirana & General Store") and live sync telemetry.
