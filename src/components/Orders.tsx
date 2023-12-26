import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { OrderType, fetchUserOrders } from '../redux/slices/Orders/ordersSlice'
import { fetchProducts, ProductType } from '../redux/slices/products/productSlice'
import { MdDelete } from 'react-icons/md'

const Orders = () => {
  const { ordersList } = useSelector((state: RootState) => state.ordersReducer)
  const { productsList } = useSelector((state: RootState) => state.productsReducer)
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts()), dispatch(fetchUserOrders())
  }, [])

  console.log('ordersList: ', ordersList)

  // return (
  //   <section className="orders" id="orders">
  //     <div className="orders-container">
  //       <div className="info">
  //         <h3 className="section-title">Orders List</h3>
  //       </div>
  //       {ordersList.length > 0 &&
  //         ordersList.map((order: any) => {
  //           return (
  //             <div key={order._id} className="order">
  //               <p className="order-id">{order._id}</p>
  //               <div className="order-images">
  //                 {order.products.map((singleItem: any) => {
  //                   return (
  //                     <img
  //                       className="order-image"
  //                       src={singleItem.product.image}
  //                       alt={singleItem.product.name}
  //                     />
  //                   )
  //                 })}
  //               </div>
  //               <p className="order-date">{order.createdAt}</p>
  //               <p className="order-amount">{order.payment.transaction.amount}</p>
  //               <div className="controllers">
  //                 {' '}
  //                 <MdDelete className="deleteIcon" />
  //               </div>
  //             </div>
  //           )
  //         })}

  //       <div className="purchase-summary">
  //         <p className="total-price">Total Orders: {ordersList.length}</p>
  //       </div>
  //     </div>
  //   </section>
  // )
  return (
    <section className="orders" id="orders">
      <div className="orders-container">
        <div className="info">
          <h3 className="section-title" id="ordersSection">
            Orders List
          </h3>
        </div>
        {Array.isArray(ordersList) && ordersList.length > 0 ? (
          ordersList.map((order: any) => {
            return (
              <>
                <div key={order._id} className="order">
                  <div className="meta-info">
                    <p className="order-id">
                      <b>ID:</b> {order._id}
                    </p>
                    <p className="order-id">
                      <b>Date:</b> {order.createdAt}
                    </p>
                  </div>
                  {/* <p className="order-date">{order.createdAt}</p> */}
                  <div className="order-images">
                    {order.products.map((singleItem: any) => {
                      return (
                        <img
                          className="order-image"
                          src={singleItem.product.image}
                          alt={singleItem.product.name}
                          key={singleItem.product._id} // Use a unique key for each image
                        />
                      )
                    })}
                  </div>
                  <p className="order-status">
                    <b>{order.status}</b>
                  </p>
                  <p className="order-amount">{order.payment.transaction.amount}$</p>
                  {/* <div className="controllers">
                    <MdDelete className="deleteIcon" />
                  </div> */}
                </div>
              </>
            )
          })
        ) : (
          <div></div>
        )}
        <div className="purchase-summary">
          <p className="total-price">
            Total Orders: {Array.isArray(ordersList) ? ordersList.length : 0}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Orders
