import { ChangeEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { BsCartPlusFill } from 'react-icons/bs'

import SortProducts from './SortProducts'

import { purchasesPath, signInPath } from '../pathLinks'

import { AppDispatch, RootState } from '../redux/store'

import {
  deleteProduct,
  fetchProducts,
  ProductType,
  searchProducts
} from '../redux/slices/products/productSlice'

const Products = () => {
  const { productsList, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { userData, isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleCartBtn = () => {
    if (isSignedIn) {
      navigate(purchasesPath)
    } else navigate(signInPath)
  }

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id))
  }

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProducts(event.target.value))
  }

  const searchedProducts = searchTerm
    ? productsList.filter((product: ProductType) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsList

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
        value={searchTerm?.toString().toLowerCase()}
        onChange={handleSearchInput}
      />
      <SortProducts />
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
                    {isSignedIn && userData?.role.toLowerCase() === 'admin' ? (
                      <>
                        <Link to={`/products/${product.id}`}>
                          <AiFillEye className="icon5" />
                        </Link>
                        <AiFillEdit className="icon2" />
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
                        <BsCartPlusFill onClick={handleCartBtn} className="icon1" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      {isSignedIn && userData?.role.toLowerCase() === 'admin' && (
        <button className="products-btn">Add Product</button>
      )}
    </section>
  )
}

export default Products
