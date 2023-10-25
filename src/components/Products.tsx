import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { BsCartPlusFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

const Products = () => {
  const { productsList, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  // console.log(products)

  return (
    <section className="products" id="productsSection">
      <label htmlFor="search-product" className="section-title">
        Products
      </label>
      <input type="text" className="search-product" id="search-product" placeholder="search" />

      {/* Products */}
      <div className="products-div">
        {productsList.length > 0 &&
          productsList.map((product) => {
            return (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <div className="product__details">
                  <p className="product__title">{product.name}</p>
                  <p className="product__description">{product.description}</p>
                  <p className="product__price">{product.price}$</p>
                  <div className="controllers">
                    <BsCartPlusFill className="icon1" />
                    {/* <AiFillEdit className="icon2" />
                    <MdDelete className="icon3" /> */}
                  </div>
                </div>
              </div>
            )
          })}

        {/* <div className="product">
          <img
            src="https://ae01.alicdn.com/kf/S1c603484c98c467faaa86a2f2b0dee4f2/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt="Product"
          />
          <div className="product__details">
            <p className="product__title">Yellow Waves</p>
            <p className="product__description">iPhone 13 Pro Yellow Waves case</p>
            <p className="product__price">7.99$</p>
            <i className="fa-solid fa-cart-plus fa-sm icon"></i>
          </div>
        </div> */}
      </div>
      <button className="products-btn">Add Product</button>
    </section>
  )
}

export default Products
