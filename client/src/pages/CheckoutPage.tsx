import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ShoppingBag, Shield, Zap, ArrowLeft } from 'lucide-react'
import CheckoutForm from '../components/CheckoutForm'
import api from '../lib/axios'
import type { Product } from '../lib/products'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string)

interface CheckoutPageProps {
  product: Product
  onBack: () => void
}

export default function CheckoutPage({ product, onBack }: CheckoutPageProps) {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    setClientSecret('')
    setError('')
    api
      .post('/payment-intent', { amount: product.price, currency: 'usd' })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => setError('Failed to initialize payment. Please try again.'))
      .finally(() => setLoading(false))
  }, [product])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Change plan
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-500 mt-2">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{product.name} Plan</p>
                <p className="text-sm text-gray-500 mt-0.5">{product.description}</p>
              </div>
              <p className="font-bold text-gray-900">{product.priceLabel}</p>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{product.priceLabel}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg mt-2">
                <span>Total</span>
                <span>{product.priceLabel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Your payment info is encrypted and secure</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#4f46e5',
                      borderRadius: '8px',
                    },
                  },
                }}
              >
                <CheckoutForm priceLabel={product.priceLabel} />
              </Elements>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Use test card <span className="font-mono font-medium">4242 4242 4242 4242</span> · Any
          future expiry · Any CVC
        </p>
      </div>
    </div>
  )
}
