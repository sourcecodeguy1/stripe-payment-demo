import { useState } from 'react'
import PricingPage from './pages/PricingPage'
import CheckoutPage from './pages/CheckoutPage'
import type { Product } from './lib/products'

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (selectedProduct) {
    return (
      <CheckoutPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  return <PricingPage onSelect={setSelectedProduct} />
}

export default App
