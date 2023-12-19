import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from 'react-icons/md'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { deleteForomCart, resetCart } from '../redux/slices/Orders/cartSlice'
import { fetchProducts } from '../redux/slices/products/productSlice'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleDeleteCartItem = (id: string) => {
    try {
      dispatch(deleteForomCart(id))
      toast.success('Product deleted from cart successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }
  const handleResetCart = () => {
    dispatch(resetCart())
  }
  const cartTotalAmount = () => {
    let totalAmount = 0
    cartItems.length > 0 &&
      cartItems.map((item) => {
        totalAmount += item.price
      })
    return totalAmount
  }
  return (
    <section className="cart">
      <h2 className="section-title">Purchases</h2>
      <div className="items">
        <h3 className="section-title">Cart</h3>
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <div key={item._id} className="item">
                <img src={item.image} alt={item.name} className="item-image" />
                <p className="item-name">{item.name}</p>
                <p className="item-price">{item.price}</p>
                <div className="controllers">
                  <MdDelete className="deleteIcon" onClick={() => handleDeleteCartItem(item._id)} />
                </div>
              </div>
            )
          })}

        <div className="purchase-summary">
          <p className="total-items">Total Items: {cartItems.length}</p>
          <p className="total-price">Total Price: {cartTotalAmount().toFixed(2)}$</p>
          <div className="btns">
            <button className="reset-btn" onClick={handleResetCart}>
              Reset
            </button>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
