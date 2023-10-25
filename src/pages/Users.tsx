import React from 'react'
import { MdDelete } from 'react-icons/md'
import Footer from '../layout/Footer'

const Users = () => {
  return (
    <div>
      <main>
        <section className="users">
          <h2 className="section-title">Users</h2>
          <div className="orders" id="orders">
            <div className="orders-container">
              <div className="info">
                <h3 className="username">Username</h3>
                <p className="email">example@gmail.com</p>
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
              <div className="buttons">
                <button className="remove-btn">Remove</button>
                <button className="block-btn">Block</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Users
