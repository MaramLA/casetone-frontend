import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { BsCartPlusFill } from 'react-icons/bs'
import { GrFormView } from 'react-icons/gr'

import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts, ProductType } from '../redux/slices/products/productSlice'
import { Link, useNavigate } from 'react-router-dom'
import { purchasesPath, signInPath } from '../pathLinks'

const Products = () => {
  const { productsList, isLoading, error } = useSelector(
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

  return (
    <section className="products" id="productsSection">
      <label htmlFor="search-product" className="section-title">
        Products
      </label>
      <input type="text" className="search-product" id="search-product" placeholder="search" />

      {/* Products */}
      <div className="products-div">
        {productsList.length > 0 &&
          productsList.map((product: ProductType) => {
            return (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <div className="product__details">
                  <p className="product__title">{product.name}</p>
                  <p className="product__description">{product.description}</p>
                  <p className="product__price">{product.price}$</p>
                  <div className="controllers">
                    {isSignedIn && userData?.role.toLowerCase() === 'admin' ? (
                      <>
                        <Link to={`/products/${product.id}`}>
                          <GrFormView className="icon5" />
                        </Link>
                        <AiFillEdit className="icon2" />
                        <MdDelete className="icon3" />
                      </>
                    ) : (
                      <>
                        <Link to={`/products/${product.id}`}>
                          <GrFormView className="icon4" />
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
