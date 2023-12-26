import React, { useEffect, useState } from 'react'
import DropIn from 'braintree-web-drop-in-react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { PaywithBraintree, fetchBraintreeToken } from '../redux/slices/products/productSlice'
import { closeCheckout, resetCart } from '../redux/slices/Orders/cartSlice'
import { errorResponse, successResponse } from '../utils/messages'
import { useNavigate } from 'react-router-dom'
import { ordersPath, purchasesPath } from '../pathLinks'
import { AxiosError } from 'axios'

const Checkout = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const [braintreeClientToken, setBraintreeClientToken] = useState()
  const [instance, setInstance] = useState<any>(null)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const getBraintreeToken = async () => {
    try {
      const response = await dispatch(fetchBraintreeToken())
      setBraintreeClientToken(response.payload.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBraintreeToken()
  }, [])

  const cartTotalAmount = () => {
    // Calculate total amount based on updated quantities
    let totalAmount = 0
    cartItems.forEach((item) => {
      totalAmount += Number(item.product.price) * Number(item.quantity)
    })
    return totalAmount
  }

  const handlePayment = async () => {
    const totalAmount = cartTotalAmount()
    const { nonce } = await instance.requestPaymentMethod()
    console.log(nonce)
    try {
      dispatch(PaywithBraintree({ nonce, cartItems, totalAmount })).then((data) => {
        if (data.meta.requestStatus) {
          successResponse('Order placef successfully')
          dispatch(resetCart())
          dispatch(closeCheckout())
          navigate(ordersPath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
      dispatch(closeCheckout())
    }
  }

  const handleCancelPayment = () => {
    dispatch(closeCheckout())
  }

  return (
    <section className="orders" id="orders">
      <div className="orders-container">
        <div className="info">
          <h3 className="section-title">Checkout</h3>
        </div>
        <div>
          {braintreeClientToken && (
            <DropIn
              options={{ authorization: braintreeClientToken }}
              onInstance={(instance) => setInstance(instance)}
            />
          )}
        </div>
        <div className="buttons">
          <button className="remove-btn" onClick={handleCancelPayment}>
            Cancel
          </button>
          <button className="ok-btn" onClick={handlePayment}>
            Place Order
          </button>
        </div>
      </div>
    </section>
  )
}

export default Checkout
