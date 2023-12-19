import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { addToCart } from '../redux/slices/Orders/cartSlice'
import { fetchProducts, findProductById, ProductType } from '../redux/slices/products/productSlice'

import Footer from '../layout/Footer'

import { homePath, signInPath } from '../pathLinks'
import { fetchCategories } from '../redux/slices/Categories/categoriesSlice'

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
    dispatch(fetchCategories())
    dispatch(fetchProducts())
    dispatch(findProductById(id))
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

  const getCategoryNameById = (categoryId: string) => {
    const category = categoriesList.find((category) => category._id === categoryId)
    return category ? category.name + ' ' : 'Category not found'
  }

  return (
    <div>
      <main>
        <section className="productDetails">
          <div className="container">
            <div className="left-side">
              <img src={`http://localhost:5050/${singleProduct.image}`} alt={singleProduct.name} />
            </div>
            <div className="right-side">
              <p className="product-category">
                {singleProduct.categories &&
                  singleProduct.categories.map((categoryId: string) =>
                    getCategoryNameById(categoryId)
                  )}
              </p>
              <h2>{singleProduct.name}</h2>
              <p className="discription">
                {singleProduct.description} Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Quod nisi facere dolores dignissimos explicabo non at fugit officiis dolor
                odio nulla dolorem, reiciendis cum, atque impedit. Facilis impedit doloribus neque!
              </p>
              <h3>Models: {singleProduct.variants}</h3>
              <h3>Size: {singleProduct.sizes}</h3>
              <h3>Price: {singleProduct.price}$</h3>

              <div className="buttons">
                {userData?.isAdmin === false && (
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
