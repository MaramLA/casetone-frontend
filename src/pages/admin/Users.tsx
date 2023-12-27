import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiSaveArrow } from 'react-icons/gi'

import {
  banUser,
  degradeUser,
  deleteUser,
  fetchUsers,
  searchUser,
  unbanUser,
  upgradeUser,
  UserType
} from '../../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../../redux/store'

import Footer from '../../layout/Footer'

import { AxiosError } from 'axios'
import {
  deleteSingleUserOrder,
  fetchOrdersForAdmin,
  OrderType,
  updateOrderStatus
} from '../../redux/slices/Orders/ordersSlice'
import { errorResponse, successResponse } from '../../utils/messages'
import { MdDelete, MdSaveAlt } from 'react-icons/md'
import { fetchProducts } from '../../redux/slices/products/productSlice'

const Users = () => {
  const { usersList, searchTerm, userData } = useSelector((state: RootState) => state.usersReducer)
  const { ordersList } = useSelector((state: RootState) => state.ordersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchOrdersForAdmin())
  }, [dispatch])

  const handleStatusChange = async (event: ChangeEvent<HTMLSelectElement>, id: string) => {
    const status = event.target.value
    try {
      const data = await dispatch(updateOrderStatus({ status, id }))
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(fetchOrdersForAdmin())
        successResponse(`Status updated to ${status}`)
      }
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchUser(searchValue))
  }

  const searchedUsers = searchTerm
    ? usersList.filter((user) => user.firstName.toLowerCase().includes(searchTerm?.toLowerCase()))
    : usersList

  const handleRemoveUser = async (userId: string, firstName: string, lastName: string) => {
    try {
      // dispatch(deleteAllUserOrders(userId))
      dispatch(deleteUser(userId)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse(`${firstName + ' ' + lastName + ' '} deleted successfully`)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  const handleBanUnbanUser = async (
    userId: string,
    isBanned: boolean,
    firstName: string,
    lastName: string
  ) => {
    try {
      if (!isBanned) {
        dispatch(banUser(userId)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            successResponse(`${firstName + ' ' + lastName + ' '}banned successfully`)
          }
        })
      } else {
        dispatch(unbanUser(userId)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            successResponse(`${firstName + ' ' + lastName + ' '}unbanned successfully`)
          }
        })
      }
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  const handleUserRole = async (
    userId: string,
    isAdmin: boolean,
    firstName: string,
    lastName: string
  ) => {
    try {
      if (!isAdmin) {
        dispatch(upgradeUser(userId)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            dispatch(fetchUsers())
            successResponse(`${firstName + ' ' + lastName + ' '}upgraded to admin successfully`)
          }
        })
      } else {
        dispatch(degradeUser(userId)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            dispatch(fetchUsers())

            successResponse(
              `${firstName + ' ' + lastName + ' '}degraded to regular user successfully`
            )
          }
        })
      }
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  const handleDeleteOrder = (orderId: string) => {
    try {
      dispatch(deleteSingleUserOrder(orderId)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          dispatch(fetchOrdersForAdmin())
          successResponse(`Order deleted successfully`)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

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
            value={searchTerm?.toString()}
            onChange={handleSearchInput}
          />
          {searchedUsers.length > 0 &&
            searchedUsers.map((user: UserType) => {
              if (user._id !== userData?._id) {
                return (
                  <div key={user._id} className="orders" id="orders">
                    <div className="orders-container">
                      <div className="info">
                        <h3 className="username">{user.firstName + ' ' + user.lastName}</h3>
                        <p className="email">{user.email}</p>
                      </div>
                      {Array.isArray(ordersList) && ordersList.length > 0 ? (
                        ordersList.map((order: any) => {
                          if (order.user._id === user._id) {
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

                                  <div className="entry">
                                    <div className="input-btn">
                                      <select
                                        id="orderStatus"
                                        name="orderStatus"
                                        onChange={(e) => {
                                          handleStatusChange(e, order._id)
                                        }}
                                        className="selectStatus"
                                        required
                                        value={order.status} // Set the value to the current order status
                                      >
                                        <option disabled>Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="canceled">Canceled</option>
                                      </select>
                                    </div>
                                  </div>

                                  <p className="order-price">{order.payment.transaction.amount}$</p>
                                  <div className="controllers">
                                    <MdDelete
                                      className="deleteIcon"
                                      onClick={() => {
                                        handleDeleteOrder(order._id)
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        })
                      ) : (
                        <div>no orders</div>
                      )}
                      <div className="buttons">
                        {user.isAdmin === false && (
                          <>
                            <button
                              className="remove-btn"
                              onClick={() =>
                                handleRemoveUser(user._id, user.firstName, user.lastName)
                              }>
                              Remove
                            </button>
                            <button
                              className="block-btn"
                              onClick={() =>
                                handleBanUnbanUser(
                                  user._id,
                                  user.isBanned,
                                  user.firstName,
                                  user.lastName
                                )
                              }>
                              {user.isBanned ? 'Unban' : 'Ban'}
                            </button>
                          </>
                        )}
                        <button
                          className="block-btn"
                          onClick={() => {
                            handleUserRole(user._id, user.isAdmin, user.firstName, user.lastName)
                          }}>
                          {user.isAdmin ? 'Degrade' : 'Upgrade'}
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

//////////////
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../../redux/store'
// import { fetchOrdersForAdmin, fetchUserOrders } from '../../redux/slices/Orders/ordersSlice'
// import { fetchProducts } from '../../redux/slices/products/productSlice'

// const Users = () => {
//   const { ordersList } = useSelector((state: RootState) => state.ordersReducer)
//   const dispatch: AppDispatch = useDispatch()
//   useEffect(() => {
//     dispatch(fetchProducts()), dispatch(fetchOrdersForAdmin())
//   }, [])

//   return (
//     <div className="test-class">
//       {Array.isArray(ordersList) && ordersList.length > 0 ? (
//         ordersList.map((order) => (
//           <div>
//             <div>order id: {order._id}</div>
//             <div>order user: {order.user._id}</div>
//             <div>order total amount: {order.payment.transaction.amount}</div>
//           </div>

//         ))
//       ) : (
//         <div>none</div>
//       )}
//     </div>
//   )
// }

// export default Users
