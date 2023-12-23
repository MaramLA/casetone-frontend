import { ChangeEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { ProductType } from '../../redux/slices/products/productSlice'
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

import Footer from '../../layout/Footer'

import {
  deleteAllUserOrders,
  deleteSingleUserOrder,
  OrderType
} from '../../redux/slices/Orders/ordersSlice'
import { errorResponse, successResponse } from '../../utils/messages'

const Users = () => {
  const users = useSelector((state: RootState) => state.usersReducer)
  const orders = useSelector((state: RootState) => state.ordersReducer)
  const products = useSelector((state: RootState) => state.productsReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, users.usersList])

  useEffect(() => {
    if (users.error) {
      errorResponse(users.error)
    }
  }, [users.error])

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchUser(searchValue))
  }

  const searchedUsers = users.searchTerm
    ? users.usersList.filter((user) =>
        user.firstName.toLowerCase().includes(users.searchTerm?.toLowerCase())
      )
    : users.usersList

  const handleRemoveUser = async (userId: string, firstName: string, lastName: string) => {
    try {
      // dispatch(deleteAllUserOrders(userId))
      dispatch(deleteUser(userId)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse(`${firstName + ' ' + lastName + ' '} deleted successfully`)
        }
      })
    } catch (error: any) {
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
    } catch (error: any) {
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
            successResponse(`${firstName + ' ' + lastName + ' '}upgraded to admin successfully`)
          }
        })
      } else {
        dispatch(degradeUser(userId)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            successResponse(
              `${firstName + ' ' + lastName + ' '}degraded to regular user successfully`
            )
          }
        })
      }
    } catch (error: any) {
      errorResponse(error.response.data.msg)
    }
  }

  const handleDeleteOrder = (orderId: number) => {
    try {
      dispatch(deleteSingleUserOrder(orderId))
      successResponse(`Order with id# ${orderId} deleted successfully`)
    } catch (error: any) {
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
            value={users.searchTerm?.toString()}
            onChange={handleSearchInput}
          />
          {searchedUsers.length > 0 &&
            searchedUsers.map((user: UserType) => {
              if (user._id !== users.userData?._id) {
                return (
                  <div key={user._id} className="orders" id="orders">
                    <div className="orders-container">
                      <div className="info">
                        <h3 className="username">{user.firstName + ' ' + user.lastName}</h3>
                        <p className="email">{user.email}</p>
                      </div>
                      {/* the below code will display the orders for each user but currently it has problem with the datatype of the id and will be fixed soon */}
                      {/* {orders.ordersList.length > 0 &&
                        user.isBanned === false &&
                        orders.ordersList.map((order: OrderType) => {
                          if (order.userId === user._id) {
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
                                    onClick={() => handleDeleteOrder(order.id)}
                                  />
                                </div>
                              </div>
                            )
                          }
                        })} */}
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
