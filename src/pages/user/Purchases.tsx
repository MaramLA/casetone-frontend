import Footer from '../../layout/Footer'

import { useSelector } from 'react-redux'
import PurchasesList from '../../components/Cart'
import Checkout from '../../components/Checkout'
import Orders from '../../components/Orders'
import { RootState } from '../../redux/store'

const Purchases = () => {
  const { isCheckout } = useSelector((state: RootState) => state.cartReducer)

  return (
    <div>
      <main>
        {isCheckout && <Checkout />}
        {!isCheckout && (
          <>
            <PurchasesList />
            <Orders />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Purchases
