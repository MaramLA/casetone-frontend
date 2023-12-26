import { FaMinus } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosError } from 'axios'
import { MdDelete } from 'react-icons/md'
import {
  closeCheckout,
  deleteFromCart,
  openCheckout,
  resetCart,
  updateCartItem
} from '../redux/slices/Orders/cartSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse, successResponse } from '../utils/messages'
import { useEffect } from 'react'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(()=>{
    dispatch(closeCheckout())
  })

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
    // Calculate total amount based on updated quantities
    let totalAmount = 0
    cartItems.forEach((item) => {
      totalAmount += Number(item.product.price) * Number(item.quantity)
    })
    return totalAmount
  }

  const handleSubmitOrder = () => {
    const totalAmount = cartTotalAmount().toFixed(2)
    // const userId = userData?._id

    // const newOrderData = {
    //   products: cartItems,
    //   payment: {
    //     method: 'credit-card',
    //     totalAmount: totalAmount
    //   },
    //   user: userId,
    //   status: 'pending'
    // }

    console.log('submitted cartItems: ', cartItems)

    dispatch(openCheckout())
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    // Dispatch an action to update the quantity for the specific item
    dispatch(updateCartItem({ id, quantity }))
  }

  return (
    <section className="cart">
      <h2 className="section-title">Purchases</h2>
      <div className="items">
        <h3 className="section-title">Cart</h3>
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <div key={item.product._id} className="item">
                <img
                  src={item.product.image as string}
                  alt={item.product.name}
                  className="item-image"
                />
                <p className="item-name">{item.product.name}</p>
                <p className="item-name">{item.product.sizes}</p>
                <div className="quantity-div">
                  {
                    <FaMinus
                      className="quantity-add"
                      onClick={() =>
                        handleQuantityChange(
                          String(item.product._id),
                          Math.max(item.quantity - 1, 1)
                        )
                      }
                    />
                  }

                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="quantity-input"
                    maxLength={2}
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(String(item.product._id), parseInt(e.target.value))
                    }
                  />

                  <FaPlus
                    className="quantity-subtract"
                    onClick={() =>
                      handleQuantityChange(
                        String(item.product._id),
                        Math.min(item.quantity + 1, 10)
                      )
                    }
                  />
                </div>

                <p className="item-price">{item.product.price}</p>
                <div className="controllers">
                  <MdDelete
                    className="deleteIcon"
                    onClick={() => handleDeleteCartItem(String(item.product._id))}
                  />
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
              <button className="checkout-btn" onClick={handleSubmitOrder}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Cart
