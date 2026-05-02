import { Check, Zap } from 'lucide-react'
import type { Product } from '../lib/products'
import { PRODUCTS } from '../lib/products'

interface PricingPageProps {
  onSelect: (product: Product) => void
}

export default function PricingPage({ onSelect }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose your plan
          </h1>
          <p className="text-lg text-gray-500 text-center">
            Start for free, scale as you grow. No hidden fees, no surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`relative bg-white rounded-2xl border flex flex-col ${
                product.highlighted
                  ? 'border-indigo-500 shadow-xl shadow-indigo-100 scale-105'
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              {product.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {product.priceLabel}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    /{product.period.replace('per ', '')}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        product.highlighted ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${product.highlighted ? 'text-indigo-600' : 'text-gray-500'}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelect(product)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    product.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Get started
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          All plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </div>
  )
}
