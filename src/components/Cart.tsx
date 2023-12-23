import { useDispatch, useSelector } from 'react-redux'

import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteFromCart, resetCart } from '../redux/slices/Orders/cartSlice'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse, successResponse } from '../utils/messages'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleDeleteCartItem = (id: string) => {
    try {
      dispatch(deleteFromCart(id))
      successResponse('Product deleted from cart successfully')
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
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
          {cartItems.length > 0 && (
            <div className="btns">
              <button className="reset-btn" onClick={handleResetCart}>
                Reset
              </button>
              <button className="checkout-btn">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Cart
