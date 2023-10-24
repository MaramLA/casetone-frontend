import React from 'react'

const Products = () => {
  return (
    <section className="products" id="productsSection">
      <label htmlFor="search-product" className="section-title">
        Products
      </label>
      <input type="text" className="search-product" id="search-product" placeholder="search" />

      {/* Products */}
      <div className="products-div">
        <div className="product">
          <img
            src="https://ae01.alicdn.com/kf/S1c603484c98c467faaa86a2f2b0dee4f2/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt="Product"
          />
          <div className="product__details">
            <p className="product__title">Hello Kitty</p>
            <p className="product__description">iPhone 13 Hello Kitty case</p>
            <p className="product__price">7.99$</p>
            <i className="fa-solid fa-cart-plus fa-sm icon"></i>
          </div>
        </div>
        <div className="product">
          <img
            src="https://ae01.alicdn.com/kf/S1c603484c98c467faaa86a2f2b0dee4f2/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt="Product"
          />
          <div className="product__details">
            <p className="product__title">Trans Wallet</p>
            <p className="product__description">iPhone 13 Pro Trans Wallet case</p>
            <p className="product__price">8.99$</p>
            <i className="fa-solid fa-cart-plus fa-sm icon"></i>
          </div>
        </div>
        <div className="product">
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
        </div>
      </div>
      <button className="products-btn">Show More</button>
    </section>
  )
}

export default Products
