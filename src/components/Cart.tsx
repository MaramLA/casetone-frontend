import React from 'react'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
  return (
    <section className="cart">
      <h2 className="section-title">Purchases</h2>
      <div className="items">
        <h3 className="section-title">Cart</h3>
        <div className="item">
          <img
            src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt=""
            className="item-image"
          />
          <p className="item-name">item1</p>
          <p className="item-price">8.99$</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>
        <div className="item">
          <img
            src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt=""
            className="item-image"
          />
          <p className="item-name">item1</p>
          <p className="item-price">8.99$</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>
        <div className="item">
          <img
            src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
            alt=""
            className="item-image"
          />
          <p className="item-name">item1</p>
          <p className="item-price">8.99$</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>
        <div className="purchase-summary">
          <p className="total-price">Total Price: 8.99$</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </section>
  )
}

export default Cart
