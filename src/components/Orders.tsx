import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { fetchOrders, OrderType } from '../redux/slices/Orders/ordersSlice'
import { fetchProducts, ProductType } from '../redux/slices/products/productSlice'

const Orders = () => {
  const orders = useSelector((state: RootState) => state.ordersReducer)
  const products = useSelector((state: RootState) => state.productsReducer)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders()), dispatch(fetchProducts())
  }, [])

  if (orders.isLoading || products.isLoading) {
    return <p>Loading...</p>
  }
  if (orders.error) {
    return <p>{orders.error}</p>
  }
  if (products.error) {
    return <p>{orders.error}</p>
  }

  return (
    <section className="orders" id="orders">
      <div className="orders-container">
        <div className="info">
          <h3 className="section-title">Orders List</h3>
        </div>
        {orders.ordersList.length > 0 &&
          orders.ordersList.map((order: OrderType) => {
            return (
              <div key={order.id} className="order">
                <p className="order-id">Order# {order.id}</p>
                <div className="order-images">
                  {products.productsList.length > 0 &&
                    products.productsList.map((product: ProductType) => {
                      if (order.productId === product.id) {
                        return (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="order-image"
                            key={product.id}
                            height="100px"
                          />
                        )
                      }
                    })}
                </div>
                <p className="order-date">{order.purchasedAt}</p>
                <div className="controllers">{/* <MdDelete className="deleteIcon" /> */}</div>
              </div>
            )
          })}

        <div className="purchase-summary">
          <p className="total-price">Total Orders: {orders.ordersList.length}</p>
        </div>
      </div>
    </section>
  )
}

export default Orders
