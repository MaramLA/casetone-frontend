import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserOrders } from '../redux/slices/Orders/ordersSlice'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

const Orders = () => {
  const { ordersList } = useSelector((state: RootState) => state.ordersReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts()), dispatch(fetchUserOrders())
  }, [])

  console.log('ordersList: ', ordersList)

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
              <div key={order._id}>
                <div className="order">
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
                  <p className="order-price">{order.payment.transaction.amount}$</p>
                  {/* <div className="controllers">
                    <MdDelete className="deleteIcon" />
                  </div> */}
                </div>
              </div>
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
