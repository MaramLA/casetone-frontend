import { ChangeEvent, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../../layout/Footer'

import { AppDispatch, RootState } from '../../redux/store'
import {
  banUser,
  deleteUser,
  fetchUsers,
  searchUser,
  UserType
} from '../../redux/slices/Users/userSlice'
import {
  deleteAllUserOrders,
  deleteSingleUserOrder,
  fetchOrders,
  OrderType
} from '../../redux/slices/Orders/ordersSlice'
import { fetchProducts, ProductType } from '../../redux/slices/products/productSlice'

const Users = () => {
  const users = useSelector((state: RootState) => state.usersReducer)
  const orders = useSelector((state: RootState) => state.ordersReducer)
  const products = useSelector((state: RootState) => state.productsReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => dispatch(fetchOrders()))
      .then(() => dispatch(fetchProducts()))
  }, [])
  if (users.isLoading || orders.isLoading || products.isLoading) {
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

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }

  const searchedUsers = users.searchTerm
    ? users.usersList.filter((user) =>
        user.firstName.toLowerCase().includes(users.searchTerm?.toLowerCase())
      )
    : users.usersList

  const handleRemoveUser = (userId: number) => {
    dispatch(deleteAllUserOrders(userId))
    dispatch(deleteUser(userId))
  }

  const handleBanUser = (userId: number) => {
    dispatch(banUser(userId))
  }

  // const handleDeleteOrder = (orderId: number) => {
  //   deleteSingleUserOrder(orderId)
  // }

  return (
    <div>
      <main>
        <section className="users">
          <h2 className="section-title">Users</h2>
          <input
            type="text"
            className="search-product"
            name="searchTerm"
            id="search-product"
            placeholder="search"
            value={users.searchTerm?.toString().toLowerCase()}
            onChange={handleSearchInput}
          />
          {searchedUsers.length > 0 &&
            searchedUsers.map((user: UserType) => {
              if (user.role !== 'admin') {
                return (
                  <div key={user.id} className="orders" id="orders">
                    <div className="orders-container">
                      <div className="info">
                        <h3 className="username">{user.firstName + ' ' + user.lastName}</h3>
                        <p className="email">{user.email}</p>
                      </div>
                      {orders.ordersList.length > 0 &&
                        user.ban === false &&
                        orders.ordersList.map((order: OrderType) => {
                          if (order.userId === user.id) {
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
                                <div className="controllers">
                                  <MdDelete
                                    className="deleteIcon"
                                    onClick={() => deleteSingleUserOrder(order.id)}
                                  />
                                </div>
                              </div>
                            )
                          }
                        })}
                      <div className="buttons">
                        <button className="remove-btn" onClick={() => handleRemoveUser(user.id)}>
                          Remove
                        </button>
                        <button className="block-btn" onClick={() => handleBanUser(user.id)}>
                          {user.ban ? 'Unban' : 'Ban'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Users
