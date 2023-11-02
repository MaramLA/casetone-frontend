import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, ProductType } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { BsCartPlusFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { addToCart } from '../redux/slices/Orders/cartSlice'
import { signInPath } from '../pathLinks'

const Pagination = ({ searchedProducts }: { searchedProducts: ProductType[] }) => {
  const { userData, isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const [currentPage, setCurrnetPage] = useState(1)
  const [itesmPerPage, setItesmPerPage] = useState(3)

  const lastItemIndex = currentPage * itesmPerPage
  const firstItemIndex = lastItemIndex - itesmPerPage
  const currentItems = searchedProducts.slice(firstItemIndex, lastItemIndex)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handlePreviousPage = () => {
    setCurrnetPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrnetPage(currentPage + 1)
  }

  const handleCartBtn = (product: ProductType) => {
    if (isSignedIn) {
      try {
        dispatch(addToCart(product))
        toast.success('Product added to cart successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      } catch (error) {
        toast.error('Something went worng', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    } else navigate(signInPath)
  }

  const handleDeleteProduct = (id: number) => {
    try {
      dispatch(deleteProduct(id))
      toast.success('Product deleted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      toast.error('Something went worng', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }
  return (
    <>
      <div className="pagination-div">
        <div className="page-controller">
          <i className="fa-solid fa-chevron-left arrow-icon" onClick={handlePreviousPage}></i>
        </div>
        <div className="products-div">
          {currentItems.length > 0 &&
            currentItems.map((product: ProductType) => {
              return (
                <div key={product.id} className="product">
                  <Link className="product-details-link" to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="product__details">
                    <p className="product__title">{product.name}</p>
                    <p className="product__description">{product.description}</p>
                    <p className="product__price">{product.price}$</p>
                    <div className="controllers">
                      {isSignedIn && userData?.role === 'admin' ? (
                        <>
                          <Link to={`/products/${product.id}`}>
                            <AiFillEye className="icon5" />
                          </Link>
                          <Link to={`/registerd/admin/edit-product/${product.id}`}>
                            <AiFillEdit className="icon2" />
                          </Link>
                          <MdDelete
                            className="icon3"
                            onClick={() => handleDeleteProduct(product.id)}
                          />
                        </>
                      ) : (
                        <>
                          <Link to={`/products/${product.id}`}>
                            <AiFillEye className="icon4" />
                          </Link>
                          <BsCartPlusFill
                            onClick={() => handleCartBtn(product)}
                            className="icon1"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="page-controller">
          <i className="fa-solid fa-chevron-right arrow-icon" onClick={handleNextPage}></i>
        </div>
      </div>
      <button className="products-btn">Show More</button>
    </>
  )
}

export default Pagination
