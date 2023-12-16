import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import { AppDispatch, RootState } from '../redux/store'

import {
  twitter,
  linkedin,
  homePath,
  usersPath,
  aboutPath,
  instagram,
  signInPath,
  signUpPath,
  profilePath,
  productsPath,
  categoryPath,
  purchasesPath
} from '../pathLinks'

import { toast } from 'react-toastify'
import { signOut } from '../services/authenticationServices'
import { AxiosError } from 'axios'
import { resetLoginCookie } from '../redux/slices/Users/userSlice'

const Footer = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const response = await signOut()
      if (response.status === 200) {
        dispatch(resetLoginCookie())
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        navigate(homePath)
      }
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

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
