import React from 'react'
import PurchasesList from '../components/PurchasesList'
import Oreders from '../components/Oreders'
import Footer from '../layout/Footer'

const Cart = () => {
  return (
    <div>
      <main>
        <PurchasesList />
        <Oreders />
      </main>
      <Footer />
    </div>
  )
}

export default Cart
