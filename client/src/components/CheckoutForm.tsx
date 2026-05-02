import { useState } from 'react'
import type { FormEvent } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Loader2, CheckCircle, XCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setStatus('loading')
    setErrorMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.')
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <CheckCircle className="text-green-500 w-16 h-16" />
        <h2 className="text-2xl font-semibold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-500 text-center">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Make Another Payment
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement />

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <XCircle className="w-4 h-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || status === 'loading'}
        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Pay $19.99
          </>
        )}
      </button>
    </form>
  )
}
