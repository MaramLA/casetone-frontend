import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import { AppDispatch, RootState } from '../redux/store'

import {
  aboutPath,
  categoryPath,
  homePath,
  instagram,
  linkedin,
  productsPath,
  profilePath,
  purchasesPath,
  signInPath,
  signUpPath,
  twitter,
  usersPath
} from '../pathLinks'

import { AxiosError } from 'axios'
import { signOutUser } from '../redux/slices/Users/userSlice'
import { errorResponse } from '../utils/messages'

const Footer = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const handleLogout = async () => {
    try {
      dispatch(signOutUser()).then((data) => {
        navigate(signInPath)
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <footer>
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
            {userData?.isAdmin === false && (
              <li>
                <InnerLink smooth className="footerPagesLinks" to={aboutPath}>
                  About us
                </InnerLink>
              </li>
            )}
            {isSignedIn ? (
              <>
                <li>
                  <a className="footerPagesLinks" onClick={handleLogout}>
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
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
            {isSignedIn && userData?.isAdmin === false && (
              <li>
                <Link className="footerPagesLinks" to={purchasesPath}>
                  Purchases
                </Link>
              </li>
            )}
            {isSignedIn && (
              <li>
                <Link className="footerPagesLinks" to={profilePath}>
                  Profile
                </Link>
              </li>
            )}
            {userData?.isAdmin === true && (
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
          <div className="contact-info">
            <h2 className="section-title">Contact Information</h2>
            <a href="mailto:support@casetone.com">support@casetone.com</a>
          </div>
          <div className="social-media-icons">
            <h2 className="section-title">Visit us</h2>
            <div className="icons">
              <Link className="footer-social-links" to={instagram}>
                <i className="fa-brands fa-instagram icon"></i>
              </Link>

              <Link className="footer-social-links" to={twitter}>
                <i className="fa-brands fa-twitter icon"></i>
              </Link>

              <Link className="footer-social-links" to={linkedin}>
                <i className="fa-brands fa-linkedin-in icon"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="top-right-section">
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="bottom-section">
        <p>Casetone © 2023</p>
      </div>
    </footer>
  )
}

export default Footer
