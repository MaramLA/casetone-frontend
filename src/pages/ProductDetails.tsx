import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../layout/Footer'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts, findProductById } from '../redux/slices/products/productSlice'
import { homePath, purchasesPath, signInPath } from '../pathLinks'

const ProductDetails = () => {
  const { id } = useParams()
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  // useSelector((state: RootState) => console.log(state.productsReducer))

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const goBack = () => {
    navigate(homePath)
  }
  const handleCartBtn = () => {
    if (isSignedIn) {
      navigate(purchasesPath)
    } else navigate(signInPath)
  }

  return (
    <div>
      <main>
        <section className="productDetails ">
          <div className="container">
            <div className="left-side">
              <img src={singleProduct.image} alt={singleProduct.name} />
            </div>
            <div className="right-side">
              <p className="product-category">
                {singleProduct.categories && singleProduct.categories.join(', ')}
              </p>
              <h2>{singleProduct.name}</h2>
              <p className="discription">
                {singleProduct.description} Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Quod nisi facere dolores dignissimos explicabo non at fugit officiis dolor
                odio nulla dolorem, reiciendis cum, atque impedit. Facilis impedit doloribus neque!
              </p>
              <h3>Models: {singleProduct.variants && singleProduct.variants.join(', ')}</h3>
              <h3>Size: {singleProduct.sizes && singleProduct.sizes.join(', ')}</h3>
              <h3>Price: {singleProduct.price}$</h3>

              <div className="buttons">
                {userData?.role.toLowerCase() !== 'admin' && (
                  <button onClick={handleCartBtn} className="buy-btn">
                    Add to Cart
                  </button>
                )}
                <button onClick={goBack} className="back-btn">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetails
