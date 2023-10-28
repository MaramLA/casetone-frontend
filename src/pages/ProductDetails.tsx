import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../layout/Footer'
import { AppDispatch, RootState } from '../redux/store'
import { findProductById } from '../redux/slices/products/productSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  // useSelector((state: RootState) => console.log(state.productsReducer))

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(findProductById(Number(id)))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
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
              <p className="product-category">{singleProduct.categories}</p>
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
                <button className="buy-btn">Add to Cart</button>
                <button className="back-btn">Go Back</button>
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
