// import { FaMinus } from 'react-icons/fa'
// import { FaPlus } from 'react-icons/fa6'
// import { useDispatch, useSelector } from 'react-redux'

// import { AxiosError } from 'axios'
// import { useEffect, useState } from 'react'
// import { MdDelete } from 'react-icons/md'
// import { deleteFromCart, resetCart } from '../redux/slices/Orders/cartSlice'
// import { AppDispatch, RootState } from '../redux/store'
// import { errorResponse, successResponse } from '../utils/messages'

// const Cart = () => {
//   const { cartItems } = useSelector((state: RootState) => state.cartReducer)
//   const dispatch: AppDispatch = useDispatch()

//   // Create a state to manage quantities for each item
//   const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

//   useEffect(() => {
//     // Initialize quantities state based on cartItems
//     const quantitiesMap: { [key: string]: number } = {}
//     cartItems.forEach((item) => {
//       quantitiesMap[item._id] = item.quantity || 1 // Set default quantity to 1 if not available
//     })
//     setQuantities(quantitiesMap)
//   }, [cartItems])

//   const handleDeleteCartItem = (id: string) => {
//     try {
//       dispatch(deleteFromCart(id))
//       successResponse('Product deleted from cart successfully')
//     } catch (error: AxiosError | any) {
//       errorResponse(error.response.data.msg)
//     }
//   }

//   const handleResetCart = () => {
//     dispatch(resetCart())
//   }

//   const cartTotalAmount = () => {
//     // Calculate total amount based on updated quantities
//     let totalAmount = 0
//     cartItems.forEach((item) => {
//       totalAmount += (item.price || 0) * (quantities[item._id] || 1)
//     })
//     return totalAmount
//   }

//   const handleQuantityChange = (id: string, quantity: number) => {
//     // Update quantity for the specific item
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [id]: Math.max(Math.min(quantity, 10), 1) // Ensure quantity is between 1 and 10
//     }))
//   }

//   const handleSubmitOrder = () => {
//     const updatedCartItems = cartItems.map((item) => {
//       return {
//         ...item,
//         quantity: quantities[item._id] || 1 // Update the quantity for each item
//       }
//     })

//     // Now updatedCartItems contains the cart data with the new quantities
//     console.log('Updated Cart Items: ', updatedCartItems)
//   }

//   return (
//     <section className="cart">
//       <h2 className="section-title">Purchases</h2>
//       <div className="items">
//         <h3 className="section-title">Cart</h3>
//         {cartItems.length > 0 &&
//           cartItems.map((item) => {
//             return (
//               <div key={item._id} className="item">
//                 <img src={item.image as string} alt={item.name} className="item-image" />
//                 <p className="item-name">{item.name}</p>
//                 <p className="item-name">{item.sizes}</p>
//                 <div className="quantity-div">
//                   <FaMinus
//                     className="quantity-add"
//                     onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)}
//                   />

//                   <input
//                     type="number"
//                     name="quantity"
//                     id="quantity"
//                     className="quantity-input"
//                     maxLength={2}
//                     min={1}
//                     max={10}
//                     value={quantities[item._id] || 1}
//                     onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
//                   />

//                   <FaPlus
//                     className="quantity-subtract"
//                     onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) + 1)}
//                   />
//                 </div>

//                 <p className="item-price">{item.price}</p>
//                 <div className="controllers">
//                   <MdDelete className="deleteIcon" onClick={() => handleDeleteCartItem(item._id)} />
//                 </div>
//               </div>
//             )
//           })}

//         <div className="purchase-summary">
//           <p className="total-items">Total Items: {cartItems.length}</p>
//           <p className="total-price">Total Price: {cartTotalAmount().toFixed(2)}$</p>
//           {cartItems.length > 0 && (
//             <div className="btns">
//               <button className="reset-btn" onClick={handleResetCart}>
//                 Reset
//               </button>
//               <button className="checkout-btn" onClick={handleSubmitOrder}>
//                 Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Cart

import { FaMinus } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteFromCart, resetCart, updateCartItem } from '../redux/slices/Orders/cartSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse, successResponse } from '../utils/messages'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()

  // // Create a state to manage quantities for each item
  // const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  // useEffect(() => {
  //   // Initialize quantities state based on cartItems
  //   const quantitiesMap: { [key: string]: number } = {}
  //   cartItems.forEach((item) => {
  //     quantitiesMap[item._id] = item.quantity || 1 // Set default quantity to 1 if not available
  //   })
  //   setQuantities(quantitiesMap)
  // }, [cartItems])

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
      totalAmount += Number(item.product.price) * item.quantity
    })
    return totalAmount
  }

  // const handleQuantityChange = (id: string, quantity: number) => {
  //   // Update quantity for the specific item
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [id]: Math.max(Math.min(quantity, 10), 1) // Ensure quantity is between 1 and 10
  //   }))
  // }

  const handleSubmitOrder = () => {
    // const updatedCartItems = cartItems.map((item) => {
    //   return {
    //     ...item,
    //     quantity: quantities[item._id] || 1 // Update the quantity for each item
    //   }
    // })

    const totalAmount = cartTotalAmount().toFixed(2)
    const userId = userData?._id

    const newOrderData = {
      products: cartItems,
      payment: {
        method: 'credit-card',
        totalAmount: totalAmount
      },
      user: userId,
      status: 'pending'
    }

    // Now updatedCartItems contains the cart data with the new quantities
    // console.log('Updated Cart Items: ', updatedCartItems)
    console.log('Updated Cart Items: ', newOrderData)
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
                    /* <FaMinus
                    className="quantity-add"
                    onClick={() => handleQuantityChange(item._id, (quantities[item._id] || 1) - 1)}
                  /> */
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
