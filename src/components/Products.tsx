import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { BsCartPlusFill } from 'react-icons/bs'

import SortProducts from './SortProducts'

import { addProductPath, signInPath } from '../pathLinks'

import { AppDispatch, RootState } from '../redux/store'

import { deleteProduct, ProductType, searchProducts } from '../redux/slices/products/productSlice'
import { toast } from 'react-toastify'
import { addToCart } from '../redux/slices/Orders/cartSlice'

const Products = () => {
  const { productsList, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { userData, isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const [currentPage, setCurrnetPage] = useState(1)
  const [itesmPerPage, setItesmPerPage] = useState(3)
  const [isShowMore, setIsShowMore] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
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

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchProducts(searchValue))
  }

  const searchedProducts = searchTerm
    ? productsList.filter((product: ProductType) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsList

  const lastItemIndex = currentPage * itesmPerPage
  const firstItemIndex = lastItemIndex - itesmPerPage
  const currentItems = searchedProducts.slice(firstItemIndex, lastItemIndex)

  const totalPages = Math.ceil(searchedProducts.length / itesmPerPage)
  const handlePreviousPage = () => {
    if (currentPage === 1) {
      setCurrnetPage(totalPages)
    } else setCurrnetPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      setCurrnetPage(1)
    } else setCurrnetPage(currentPage + 1)
  }

  return (
    <section className="products" id="productsSection">
      <label htmlFor="search-product" className="section-title">
        Products
      </label>
      <input
        type="text"
        className="search-product"
        name="searchTerm"
        id="search-product"
        placeholder="search"
        value={searchTerm?.toString()}
        onChange={handleSearchInput}
      />
      <SortProducts />
      {isShowMore || userData?.role === 'admin' ? (
        <>
          <div className="products-div">
            {searchedProducts.length > 0 &&
              searchedProducts.map((product: ProductType) => {
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
          {isSignedIn && userData?.role === 'admin' ? (
            <Link to={addProductPath}>
              <button className="products-btn">Add Product</button>
            </Link>
          ) : (
            <button className="products-btn" onClick={() => setIsShowMore(!isShowMore)}>
              Show Less
            </button>
          )}
        </>
      ) : (
        <>
          <div className="pagination-div">
            <div className="top-section">
              <div className="page-controller">
                {/* {currentPage !== 1 && ( */}
                <i className="fa-solid fa-chevron-left arrow-icon" onClick={handlePreviousPage}></i>
                {/* )} */}
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
                {/* {currentPage !== totalPages && ( */}
                <i className="fa-solid fa-chevron-right arrow-icon" onClick={handleNextPage}></i>
                {/* )} */}
              </div>
            </div>
            <div className="bottm-section">
              <button className="products-btn" onClick={() => setIsShowMore(!isShowMore)}>
                Show More
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default Products
