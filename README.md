# BIZmate — Smart Business Assistant

> An AI-powered retail management system for small businesses — combining inventory, billing, analytics, and intelligent forecasting in one platform.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Team](#team)

---

## Overview

Small kirana stores manage inventory, billing, and sales manually — without any visibility into their own business data. BIZmate solves this by bringing everything into one smart platform that any store owner can use.

Built with a React Native frontend, Flask REST API backend, PostgreSQL database, and an integrated AI/ML layer for sales forecasting and business insights.

---

## Features

### 📦 Inventory Management
- Add, edit, and delete products
- Real-time stock tracking
- Low stock alerts based on `min_stock_level`
- Expiry date tracking with risk classification (Critical / High / Medium)
- Dynamic category filtering

### 🧾 Billing System
- Search and add products to a bill
- Auto stock deduction on bill creation
- Tax (5%) and discount calculations
- PDF bill generation with professional layout
- Payment method selection — Cash, Card, UPI

### 📊 Analytics Dashboard
- KPI cards — Total Revenue, Avg Daily Sales, Top Product, Growth %
- Revenue trend chart (Week / Month / 6M)
- Monthly sales bar chart
- Category distribution pie chart
- Expiry risk table

### 🤖 AI Sales Forecast
- 7-day future sales prediction
- Trained RandomForestRegressor model
- Features: `day_index`, `day_of_week`, `month`
- Peak day and average forecast stats

### 💬 AI Chatbot
- Powered by Google Gemini (gemini-1.5-flash)
- Injected with real store KPIs and data context
- Quick prompt shortcuts for common queries
- Natural language business insights

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native · TypeScript |
| Backend | Python · Flask · Flask-CORS |
| Database | PostgreSQL · SQLAlchemy ORM |
| AI Forecast | scikit-learn · RandomForestRegressor |
| AI Chatbot | Google Gemini API |
| PDF Generation | ReportLab |
| API Layer | RESTful JSON APIs |

---

## System Architecture

```
React Native App  (api.ts)
        ↓  JSON
Flask REST API
  ├── Routes (Blueprints)
  ├── Controllers
  ├── Services (business logic)
  └── SQLAlchemy ORM
        ↓  SQL
PostgreSQL Database
  ├── product
  ├── bill
  ├── bill_item
  └── customer (phone stored on bill)

AI Module
  ├── sales_model.pkl  (RandomForestRegressor)
  └── Gemini API  (chatbot)
```

---

## Project Structure

```
bizmate/
│
├── backend/
│   ├── run.py
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── extensions.py
│   │   ├── gen_ai.py               # Gemini API wrapper
│   │   ├── utils.py                # PDF generation (ReportLab)
│   │   │
│   │   ├── models/
│   │   │   ├── product.py
│   │   │   ├── bill.py
│   │   │   ├── bill_item.py
│   │   │
│   │   ├── routes/
│   │   │   ├── inventory_routes.py
│   │   │   ├── billing_routes.py
│   │   │   ├── analytics_routes.py
│   │   │   ├── ai_routes.py
│   │   │   └── chatbot_routes.py
│   │   │
│   │   ├── controllers/
│   │   │   ├── inventory_controller.py
│   │   │   ├── billing_controller.py
│   │   │   ├── analytics_controller.py
│   │   │   ├── ai_controller.py
│   │   │   └── chatbot_controller.py
│   │   │
│   │   └── services/
│   │       ├── inventory_service.py
│   │       ├── billing_service.py
│   │       ├── analytics_service.py
│   │       ├── ai_service.py
│   │       └── chatbot_service.py
│   │
│   └── ai_models/
│       └── sales_model.pkl
│
└── frontend/
    ├── services/
    │   └── api.ts                  # Single source of truth for all API calls
    ├── screens/
    │   ├── Billing.tsx
    │   ├── Inventory.tsx
    │   ├── Analytics.tsx
    │   └── Chatbot.tsx
    ├── components/
    │   ├── LineChart.tsx
    │   ├── BarChart.tsx
    │   └── PieChart.tsx
    └── constants/
        └── theme.ts
```

---

## Getting Started

### Backend Setup

**1. Clone the repository**
```bash
git clone https://github.com/yourteam/bizmate.git
cd bizmate/backend
```

**2. Create and activate virtual environment**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Set up environment variables**

Create a `.env` file in `/backend`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/bizmate
GEMINI_API_KEY=your_gemini_api_key_here
```

**5. Set up the database**
```bash
flask db init
flask db migrate
flask db upgrade
```

**6. Run the server**
```bash
python run.py
```

Backend runs at: `http://127.0.0.1:5000`

---

### Frontend Setup

**1. Navigate to frontend**
```bash
cd bizmate/frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Update the base URL**

In `services/api.ts`:
```typescript
const BASE_URL = "http://YOUR_LOCAL_IP:5000";
```

> Use your machine's local IP (not `127.0.0.1`) when running on a physical device.

**4. Start the app**
```bash
npx expo start
```

---

## API Endpoints

### Inventory
| Method | Endpoint | Description |
|---|---|---|
| GET | `/inventory/products` | Get all products |
| POST | `/inventory/add-product` | Add a new product |
| PUT | `/inventory/update-product/<id>` | Update a product |
| DELETE | `/inventory/delete-product/<id>` | Delete a product |

### Billing
| Method | Endpoint | Description |
|---|---|---|
| POST | `/billing/create-bill` | Create a bill + reduce stock |
| GET | `/billing/bills` | Get all bills |
| GET | `/billing/bill-pdf/<id>` | Download bill as PDF |

### Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/analytics/total-sales` | Total sales amount |
| GET | `/analytics/dashboard` | Full dashboard data (KPIs, charts, expiry) |
| GET | `/analytics/product-performance` | Sales by product |

### AI
| Method | Endpoint | Description |
|---|---|---|
| GET | `/ai/predict` | 7-day sales forecast |

### Chatbot
| Method | Endpoint | Description |
|---|---|---|
| POST | `/chatbot/chat` | Send message, get AI response |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `GEMINI_API_KEY` | Google Gemini API key for chatbot |

---

## Team

Built with ❤️ by:

- **Kushagra Agrawal**
- **Vishva Chauvisa**
- **Viduit Devraj Saini**

> Project developed at **Bennett University**

---

*BIZmate — making smart retail accessible to every store owner.*
