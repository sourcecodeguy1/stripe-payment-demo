# Stripe Payment Demo

A full-stack payment demo using **Stripe PaymentElement** (multi-method: card, Apple Pay, Google Pay, etc.) built with **React + Vite + TypeScript + TailwindCSS** on the frontend and **Laravel 11** on the backend.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, TypeScript, TailwindCSS, Stripe.js |
| Backend | Laravel 11, stripe-php |
| Payments | Stripe PaymentElement (multi-method) |

## Local Setup

### Prerequisites
- PHP 8.2+, Composer
- Node.js 20+, npm
- A [Stripe account](https://dashboard.stripe.com/register) (free test mode)

### 1. Backend

```bash
cd server
cp .env.example .env
composer install
php artisan key:generate
```

Add your Stripe keys to `server/.env`:
```
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # optional for local dev
```

```bash
php artisan serve
```

### 2. Frontend

```bash
cd client
cp .env.example .env
```

Add your Stripe publishable key to `client/.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Testing

Use Stripe's test card numbers:

| Card | Number |
|------|--------|
| Success | `4242 4242 4242 4242` |
| Requires authentication | `4000 0025 0000 3155` |
| Declined | `4000 0000 0000 9995` |

Use any future expiry date and any 3-digit CVC.

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/payment-intent` | Creates a Stripe PaymentIntent |
| `POST` | `/api/webhook` | Handles Stripe webhook events |

## With Docker

```bash
docker compose up
```
