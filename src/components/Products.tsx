import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsCartPlusFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

import { NewCartItemType, addToCart } from '../redux/slices/Orders/cartSlice'
import {
  ProductType,
  deleteSingleProduct,
  fetchProducts,
  searchProducts
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import SortProducts from './SortProducts'

import { AxiosError } from 'axios'
import { addProductPath, signInPath } from '../pathLinks'
import { errorResponse, successResponse, warningResponse } from '../utils/messages'

const Products = () => {
  const { productsList, searchTerm, isLoading } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { userData, isSignedIn } = useSelector((state: RootState) => state.usersReducer)
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="loading-div">
        <h2 className="loading-div-content">Loading Products</h2>
      </div>
    )
  }

  const [currentPage, setCurrnetPage] = useState(1)
  const [itesmPerPage, setItemsPerPage] = useState(3)
  const [isShowMore, setIsShowMore] = useState(false)

  const handleCartBtn = (product: ProductType) => {
    if (isSignedIn) {
      try {
        const foundProduct = cartItems.find((item) => {
          if (item.product._id === product._id) {
            return true
          }
        })
        if (foundProduct) {
          warningResponse('Product add to the cart already')
          return
        } else {
          const newCartProduct: Partial<NewCartItemType> = {
            product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              categories: product.categories,
              description: product.description,
              sizes: product.sizes,
              variants: product.variants
            },
            quantity: 1
          }
          dispatch(addToCart(newCartProduct))
          successResponse('Product added to cart successfully')
        }
      } catch (error: AxiosError | any) {
        errorResponse(error.response.data.msg)
      }
    } else navigate(signInPath)
  }

  const handleDeleteProduct = (id: string) => {
    try {
      dispatch(deleteSingleProduct(id)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse('Product deleted successfully')
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
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
      {isShowMore || userData?.isAdmin === true ? (
        <>
          <div className="products-div">
            {searchedProducts.length > 0 &&
              searchedProducts.map((product: ProductType) => {
                return (
                  <div key={product._id} className="product">
                    <Link className="product-details-link" to={`/products/${product._id}`}>
                      <img src={product.image as string} alt={product.name} />
                    </Link>
                    <div className="product__details">
                      <p className="product__title">{product.name}</p>
                      <p className="product__description">{product.description}</p>
                      <p className="product__price">{product.price}$</p>
                      <div className="controllers">
                        {isSignedIn && userData?.isAdmin === true ? (
                          <>
                            <Link to={`/products/${product._id}`}>
                              <AiFillEye className="icon5" />
                            </Link>
                            <Link to={`/registerd/admin/edit-product/${product._id}`}>
                              <AiFillEdit className="icon2" />
                            </Link>
                            <MdDelete
                              className="icon3"
                              onClick={() => handleDeleteProduct(product._id)}
                            />
                          </>
                        ) : (
                          <>
                            <Link to={`/products/${product._id}`}>
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
          {isSignedIn && userData?.isAdmin === true ? (
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
              {productsList.length > 3 && (
                <div className="page-controller">
                  <i
                    className="fa-solid fa-chevron-left arrow-icon"
                    onClick={handlePreviousPage}></i>
                </div>
              )}
              <div className="products-div">
                {currentItems.length > 0 &&
                  currentItems.map((product: ProductType) => {
                    return (
                      <div key={product._id} className="product">
                        <Link className="product-details-link" to={`/products/${product._id}`}>
                          <img src={product.image as string} alt={product.name} />
                        </Link>
                        <div className="product__details">
                          <p className="product__title">{product.name}</p>
                          <p className="product__description">{product.description}</p>
                          <p className="product__price">{product.price}$</p>
                          <div className="controllers">
                            {isSignedIn && userData?.isAdmin === true ? (
                              <>
                                <Link to={`/products/${product._id}`}>
                                  <AiFillEye className="icon5" />
                                </Link>
                                <Link to={`/registerd/admin/edit-product/${product._id}`}>
                                  <AiFillEdit className="icon2" />
                                </Link>
                                <MdDelete
                                  className="icon3"
                                  onClick={() => handleDeleteProduct(product._id)}
                                />
                              </>
                            ) : (
                              <>
                                <Link to={`/products/${product._id}`}>
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
              {productsList.length > 3 && (
                <div className="page-controller">
                  <i className="fa-solid fa-chevron-right arrow-icon" onClick={handleNextPage}></i>
                </div>
              )}
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
