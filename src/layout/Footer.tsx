import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'
import {
  productsPath,
  usersPath,
  adminDashboardPath,
  productDetailsPath,
  userProfilePath,
  purchasesPath,
  categoryPath,
  errorPath,
  homePath,
  signInPath,
  signUpPath,
  instagram,
  twitter,
  linkedin,
  aboutPath
} from '../pathLinks'
import { RootState } from '../redux/store'
const Footer = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

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
              <InnerLink smooth className="footerPagesLinks" to={productsPath}>
                Products
              </InnerLink>
            </li>
            {userData?.role.toLowerCase() !== 'admin' && (
              <li>
                <InnerLink smooth className="footerPagesLinks" to={aboutPath}>
                  About us
                </InnerLink>
              </li>
            )}
            {!isSignedIn && (
              <>
                <li>
                  <Link className="footerPagesLinks" to={signInPath}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="footerPagesLinks" to={signUpPath}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isSignedIn && userData?.role.toLowerCase() === 'visitor' && (
              <li>
                <Link className="footerPagesLinks" to={purchasesPath}>
                  Purchases
                </Link>
              </li>
            )}
            {isSignedIn && (
              <li>
                <Link className="footerPagesLinks" to={userProfilePath}>
                  Profile
                </Link>
              </li>
            )}
            {userData?.role.toLowerCase() === 'admin' && (
              <>
                <li>
                  <Link className="footerPagesLinks" to={categoryPath}>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="footerPagesLinks" to={usersPath}>
                    Users
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="top-mid-section">
          {/* Contact section */}
          <div className="contact-info">
            <h2 className="section-title">Contact Information</h2>
            <a href="mailto:support@casetone.com">support@casetone.com</a>
          </div>
          {/* Social media section */}
          <div className="social-media-icons">
            <h2 className="section-title">Visit us</h2>
            <div className="icons">
              {/* Instagram */}
              <Link className="footer-social-links" to={instagram}>
                <i className="fa-brands fa-instagram icon"></i>
              </Link>
              {/* Twitter */}
              <Link className="footer-social-links" to={twitter}>
                <i className="fa-brands fa-twitter icon"></i>
              </Link>
              {/* LinkedIn */}
              <Link className="footer-social-links" to={linkedin}>
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
