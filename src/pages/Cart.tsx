import React from 'react'
import ForPurchase from '../components/ForPurchase'
import Oreders from '../components/Oreders'
import Footer from '../layout/Footer'

const Cart = () => {
  return (
    <div>
      <main>
        <ForPurchase />
        <Oreders />
      </main>
      <Footer />
    </div>
  )
}

export default Cart
