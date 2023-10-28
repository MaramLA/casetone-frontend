import Footer from '../../layout/Footer'

import Orders from '../../components/Orders'
import PurchasesList from '../../components/Cart'

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
