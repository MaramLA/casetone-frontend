import React from 'react'
import PurchasesList from '../components/Cart'
import Orders from '../components/Orders'
import Footer from '../layout/Footer'

const Purchases = () => {
  return (
    <div>
      <main>
        <PurchasesList />
        <Orders />
      </main>
      <Footer />
    </div>
  )
}

export default Purchases
