import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { NewCartItemType, addToCart } from '../redux/slices/Orders/cartSlice'
import {
  ProductType,
  deleteSingleProduct,
  fetchSingleProduct
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import Footer from '../layout/Footer'

import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { homePath, signInPath } from '../pathLinks'
import { fetchCategories } from '../redux/slices/Categories/categoriesSlice'
import { errorResponse, successResponse, warningResponse } from '../utils/messages'

const ProductDetails = () => {
  const { id } = useParams()

  const { singleProduct } = useSelector((state: RootState) => state.productsReducer)
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSingleProduct(String(id)))
  }, [id])

  const goBack = () => {
    navigate(homePath)
  }
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
          navigate(homePath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
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
              <img src={singleProduct.image} alt={singleProduct.name} />
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
                {userData?.isAdmin === true && (
                  <>
                    <button onClick={() => handleDeleteProduct(String(id))} className="delete-btn">
                      Delete
                    </button>
                    <Link className="btn-link" to={`/registerd/admin/edit-product/${id}`}>
                      <button className="back-btn">Edit</button>
                    </Link>
                  </>
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
