import React from 'react'
import { MdDelete } from 'react-icons/md'

const Oreders = () => {
  return (
    <section className="orders" id="orders">
      <div className="orders-container">
        <h3 className="section-title">Orders List</h3>
        <div className="order">
          <p className="order-id">Order# 1</p>
          <div className="oreder-images">
            <img
              src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
              alt=""
              className="order-image"
            />
          </div>
          <p className="order-date">2023-09-18T10:00:00</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>
        <div className="order">
          <p className="order-id">Order# 1</p>
          <div className="oreder-images">
            <img
              src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
              alt=""
              className="order-image"
            />
          </div>
          <p className="order-date">2023-09-18T10:00:00</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>
        <div className="order">
          <p className="order-id">Order# 1</p>
          <div className="oreder-images">
            <img
              src="https://ae01.alicdn.com/kf/S46e739ce47d64943a44caeaa91678a806/Simple-Stripe-Magnetic-Skin-Scrub-Phone-Case-For-iPhone-15-14plus-Pro-Max-Stripe-Case-For.jpg_80x80.jpg_.webp"
              alt=""
              className="order-image"
            />
          </div>
          <p className="order-date">2023-09-18T10:00:00</p>
          <div className="controllers">
            <MdDelete className="deleteIcon" />
          </div>
        </div>

        <div className="purchase-summary">
          <p className="total-price">Total Orders: 3</p>
        </div>
      </div>
    </section>
  )
}

export default Oreders
