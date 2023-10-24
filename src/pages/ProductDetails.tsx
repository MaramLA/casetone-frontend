import React from 'react'
import Footer from '../layout/Footer'

const ProductDetails = () => {
  return (
    <div>
      <main>
        <section className="productDetails ">
          <div className="container">
            <div className="left-side">
              <img
                src="https://ae01.alicdn.com/kf/Hc4977bb9928746cd9856f7e08d90ab05e/3D-happy-rabbit-bear-silicone-cartoon-cover-for-iphone-11-12-14-15-pro-max-mini.jpg_80x80.jpg_.webp"
                alt="product"
              />
            </div>
            <div className="right-side">
              <p className="product-category">Category</p>
              <h2>Product name</h2>
              <p className="discription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore beatae, cupiditate
                porro voluptatibus dolorum quis et deleniti? Numquam consequatur mollitia ducimus
                laborum. Tempore in quos dolorem. Illum accusantium ut cum perferendis in!
                Exercitationem, quaerat? Fuga, sapiente repellat? Quod alias veritatis voluptas
                earum in eligendi labore illo atque cum, autem.
              </p>
              <h3>Variants</h3>
              <div className="Variants"></div>
              <h3>Sizes</h3>
              <div className="sizes"></div>
              <div className="buttons">
                <button className="buy-btn">Add to Cart</button>
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
