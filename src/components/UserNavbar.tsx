import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import {
  homePath,
  aboutPath,
  signInPath,
  signUpPath,
  profilePath,
  productsPath,
  purchasesPath
} from '../pathLinks'

import { AppDispatch, RootState } from '../redux/store'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { signOutUser } from '../redux/slices/Users/userSlice'

const UserNavbar = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const [isMenueClicked, setIsMenueClicked] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsMenueClicked(false)
    try {
      dispatch(signOutUser())
      // if (response.status === 200) {
      //   dispatch(resetLoginCookie())
      //   toast.success(response.data.message, {
      //     position: 'top-right',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored'
      //   })
      //   navigate(homePath)
      // }
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
    <>
      <nav aria-label="navigation-bar" className="nav-bar">
        <div className="left-section">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link className="navLinks" to={homePath}>
                Home
              </Link>
            </li>
            <li>
              <InnerLink className="navLinks" smooth to={productsPath}>
                Products
              </InnerLink>
            </li>
            <li>
              <InnerLink className="navLinks" smooth to={aboutPath}>
                About Us
              </InnerLink>
            </li>
          </ul>
        </div>
        <div className="right-section">
          <Link to={purchasesPath}>
            <i className="fa fa-shopping-cart icon1" aria-hidden="true"></i>
          </Link>

          {isSignedIn ? (
            <>
              <Link to={profilePath}>
                <i className="fa-solid fa-user icon1" aria-hidden="true"></i>
              </Link>

              <div className="nav-buttons">
                <button className="btn-1" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
              <i
                className="fa-solid fa-bars icon2"
                onClick={() => setIsMenueClicked(!isMenueClicked)}></i>
            </>
          ) : (
            <>
              <div className="nav-buttons">
                <Link className="link-btn" to={signInPath}>
                  <button className="btn-1">Sign In</button>
                </Link>
                <Link className="link-btn" to={signUpPath}>
                  <button className="btn-2">Sign Up</button>
                </Link>
              </div>
              <i
                className="fa-solid fa-bars icon2"
                onClick={() => setIsMenueClicked(!isMenueClicked)}></i>
            </>
          )}
        </div>
      </nav>
      {isMenueClicked && (
        <div className="mini-nav" id="miniNav">
          <div className="top-section">
            <ul className="mini-nav-links">
              <li>
                <Link
                  className="mini-navLinks"
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={homePath}>
                  Ho
                </Link>
              </li>
              <li>
                <InnerLink
                  className="mini-navLinks"
                  smooth
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={productsPath}>
                  Products
                </InnerLink>
              </li>
              <li>
                <InnerLink
                  className="mini-navLinks"
                  smooth
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={aboutPath}>
                  About Us
                </InnerLink>
              </li>
            </ul>
          </div>
          <div className="bottom-section">
            <ul className="nav-links">
              <li>
                <Link
                  className="mini-navLinks"
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={purchasesPath}>
                  <i className="fa fa-shopping-cart icon1" aria-hidden="true"></i>
                </Link>
              </li>
              {isSignedIn && (
                <li>
                  <Link
                    className="mini-navLinks"
                    onClick={() => setIsMenueClicked(!isMenueClicked)}
                    to={profilePath}>
                    <i className="fa-solid fa-user icon1" aria-hidden="true"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default UserNavbar
