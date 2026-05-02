export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceLabel: string
  period: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individuals getting started',
    price: 999,
    priceLabel: '$9.99',
    period: 'per month',
    highlighted: false,
    features: [
      '5 projects',
      '10 GB storage',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Great for growing teams and businesses',
    price: 1999,
    priceLabel: '$19.99',
    period: 'per month',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: 4999,
    priceLabel: '$49.99',
    period: 'per month',
    highlighted: false,
    features: [
      'Unlimited everything',
      '1 TB storage',
      '24/7 dedicated support',
      'Custom analytics',
      'SSO & advanced security',
      'SLA guarantee',
    ],
  },
]
