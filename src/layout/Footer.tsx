import { Link } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'
import {
  productsPath,
  usersPath,
  adminDashboardPath,
  productDetailsPath,
  userProfilePath,
  cartPath,
  categoryPath,
  errorPath,
  homePath,
  signInPath,
  signUpPath
} from '../pathLinks'
const Footer = () => {
  return (
    <footer>
      {/* Pages section */}
      <div className="top-sections">
        <div className="top-left-section">
          <ul aria-label="navigations">
            <li>
              <Link className="footerPagesLinks" to={homePath}>
                Home
              </Link>
            </li>
            <li>
              <InnerLink className="footerPagesLinks" to="/#productsSection">
                Products
              </InnerLink>
            </li>
            <li>
              <Link className="footerPagesLinks" to={cartPath}>
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link className="footerPagesLinks" to={userProfilePath}>
                Profile
              </Link>
            </li>
            <li>
              <Link className="footerPagesLinks" to="/#aboutUsSection">
                About us
              </Link>
            </li>
          </ul>
        </div>

        <div className="top-mid-section">
          {/* Contact section */}
          <div className="contact-info">
            <h2 className="section-title">Contact Information</h2>
            <a href="mailto:support@casetone.com">support@casetone.com</a>
            <p>0131234567</p>
          </div>
          {/* Social media section */}
          <div className="social-media-icons">
            <h2 className="section-title">Visit us</h2>
            <div className="icons">
              {/* Instagram */}
              <Link className="footer-social-links" to="https://www.instagram.com">
                <i className="fa-brands fa-instagram icon"></i>
              </Link>
              {/* Twitter */}
              <Link className="footer-social-links" to="https://twitter.com">
                <i className="fa-brands fa-twitter icon"></i>
              </Link>
              {/* LinkedIn */}
              <Link className="footer-social-links" to="https://www.linkedin.com">
                <i className="fa-brands fa-linkedin-in icon"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Logo section */}
        <div className="top-right-section">
          <img src={logo} alt="logo" />
        </div>
      </div>
      {/* Copyright statement */}
      <div className="bottom-section">
        <p>Casetone © 2023</p>
      </div>
    </footer>
  )
}

export default Footer
