import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'
import {
  homePath,
  signInPath,
  signUpPath,
  purchasesPath,
  usersPath,
  categoryPath,
  productsPath,
  userProfilePath,
  adminDashboardPath
} from '../pathLinks'

const GuestNavbar = () => {
  return (
    <header className="header">
      <nav aria-label="navigation-bar" className="nav-bar">
        {/* Logo  */}
        <div className="left-section">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          {/* Navigation links  */}
          <ul className="nav-links">
            <li>
              <Link className="navLinks" to={homePath}>
                Home
              </Link>
            </li>
            <li>
              <InnerLink className="navLinks" smooth to="/#productsSection">
                Products
              </InnerLink>
            </li>
            {/* <li>
            <Link to="/">About us</Link>
          </li> */}
            <li>
              <InnerLink className="navLinks" smooth to="/#aboutUsSection">
                About us
              </InnerLink>
            </li>
            <li>
              <InnerLink className="navLinks" smooth to="/user/purchases/#orders">
                Orders
              </InnerLink>
            </li>
          </ul>
        </div>
        <div className="right-section">
          {/* Cart icon  */}
          <Link to={purchasesPath}>
            <i className="fa fa-shopping-cart icon1" aria-hidden="true"></i>
          </Link>
          {/* burger icon  */}
          <i className="fa-solid fa-bars icon2"></i>
          {/* Navigation buttons  */}
          <div className="nav-buttons">
            <Link className="button-link" to={signInPath}>
              <button type="button" className="btn-1">
                Sign In
              </button>
            </Link>
            <Link className="button-link" to={signUpPath}>
              <button type="button" className="btn-2">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default GuestNavbar
