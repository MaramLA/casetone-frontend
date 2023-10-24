import React from 'react'

const Products = () => {
  return (
    <section className="products">
      <h2 className="section-title" id="productsSection">
        Products
      </h2>
      {/* Products */}
      <div className="products-div">
        <div className="product">
          <img src="./assets/images/products/pic1.webp" alt="Product" />
          <div className="product__details">
            <p className="product__title">Hello Kitty</p>
            <p className="product__description">iPhone 13 Hello Kitty case</p>
            <p className="product__price">7.99$</p>
            <i className="fa-solid fa-cart-plus fa-sm icon"></i>
          </div>
        </div>
        <div className="product">
          <img src="./assets/images/products/pic2.webp" alt="Product" />
          <div className="product__details">
            <p className="product__title">Trans Wallet</p>
            <p className="product__description">iPhone 13 Pro Trans Wallet case</p>
            <p className="product__price">8.99$</p>
            <i className="fa-solid fa-cart-plus fa-sm icon"></i>
          </div>
        </div>
        <div className="product">
          <img src="./assets/images/products/pic4.webp" alt="Product" />
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
