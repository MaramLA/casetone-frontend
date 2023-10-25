import { is } from 'immer/dist/internal'
import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../layout/Footer'
import { fetchOrders } from '../redux/slices/Orders/ordersSlice'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchUsers } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

const Users = () => {
  const users = useSelector((state: RootState) => state.usersReducer)
  const orders = useSelector((state: RootState) => state.ordersReducer)
  const products = useSelector((state: RootState) => state.productsReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers()), dispatch(fetchOrders()), dispatch(fetchProducts())
  }, [])
  if (users.isLoading || orders.isLoading || users.isLoading) {
    return <p>Loading...</p>
  }
  if (users.error) {
    return <p>{users.error}</p>
  }
  if (orders.error) {
    return <p>{orders.error}</p>
  }
  if (products.error) {
    return <p>{products.error}</p>
  }

  console.log(products.productsList)

  return (
    <div>
      <main>
        <section className="users">
          <h2 className="section-title">Users</h2>
          {users.usersList.length > 0 &&
            users.usersList.map((user) => {
              return (
                <div key={user.id} className="orders" id="orders">
                  <div className="orders-container">
                    <div className="info">
                      <h3 className="username">{user.firstName + ' ' + user.lastName}</h3>
                      <p className="email">{user.email}</p>
                    </div>
                    {orders.ordersList.length > 0 &&
                      orders.ordersList.map((order) => {
                        if (order.userId === user.id) {
                          return (
                            <div key={order.id} className="order">
                              <p className="order-id">Order# {order.id}</p>
                              <div className="order-images">
                                {products.productsList.length > 0 &&
                                  products.productsList.map((product) => {
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
                              <div className="controllers">
                                <MdDelete className="deleteIcon" />
                              </div>
                            </div>
                          )
                        }
                      })}

                    {/* <div className="order">
                      <p className="order-id">Order# 1</p>
                      <div className="order-images">
                        <img
                          src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
                          alt=""
                          className="order-image"
                        />
                      </div>
                      <p className="order-date">2023-09-18T10:00:00</p>
                      <div className="controllers">
                        <MdDelete className="deleteIcon" />
                      </div>
                    </div> */}
                    <div className="buttons">
                      <button className="remove-btn">Remove</button>
                      <button className="block-btn">Block</button>
                    </div>
                  </div>
                </div>
              )
            })}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Users
