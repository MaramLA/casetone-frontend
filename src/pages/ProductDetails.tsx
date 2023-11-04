import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import Footer from '../layout/Footer'

import { AppDispatch, RootState } from '../redux/store'

import { homePath, signInPath } from '../pathLinks'

import { findProductById, ProductType } from '../redux/slices/products/productSlice'
import { toast } from 'react-toastify'
import { addToCart } from '../redux/slices/Orders/cartSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
    dispatch(findProductById(Number(id)))
  }, [id])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const goBack = () => {
    navigate(homePath)
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

  const getCategoryNameById = (categoryId: number) => {
    const category = categoriesList.find((category) => category.id === categoryId)
    return category ? category.name + ' ' : 'Category not found'
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
                {singleProduct.categories &&
                  singleProduct.categories.map((categoryId: number) =>
                    getCategoryNameById(categoryId)
                  )}
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
                {userData?.role !== 'admin' && (
                  <button onClick={() => handleCartBtn(singleProduct)} className="buy-btn">
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
