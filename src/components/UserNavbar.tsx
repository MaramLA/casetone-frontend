import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import {
  aboutPath,
  homePath,
  productsPath,
  profilePath,
  purchasesPath,
  signInPath,
  signUpPath
} from '../pathLinks'

import { AxiosError } from 'axios'
import { signOutUser } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse } from '../utils/messages'

const UserNavbar = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)
  const [isMenueClicked, setIsMenueClicked] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsMenueClicked(false)
    try {
      dispatch(signOutUser()).then((data) => {
        navigate(signInPath)
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
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
                  Home
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
