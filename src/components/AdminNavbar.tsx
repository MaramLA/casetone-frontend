import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import {
  categoryPath,
  homePath,
  productsPath,
  profilePath,
  signInPath,
  usersPath
} from '../pathLinks'

import { AxiosError } from 'axios'
import { signOutUser } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
import { errorResponse } from '../utils/messages'

const AdminNavbar = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const [isMenueClicked, setIsMenueClicked] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsMenueClicked(false)
    try {
      dispatch(signOutUser()).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          navigate(signInPath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <>
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
              <InnerLink className="navLinks" smooth to={productsPath}>
                Products
              </InnerLink>
            </li>
            <li>
              <Link className="navLinks" to={categoryPath}>
                Categories
              </Link>
            </li>
            <li>
              <Link className="navLinks" to={usersPath}>
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-section">
          {/* Profile icon */}
          <Link to={profilePath}>
            <i className="fa-solid fa-user icon1" aria-hidden="true"></i>
          </Link>
          {/* Navigation buttons  */}
          <div className="nav-buttons">
            <button className="btn-1" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
          <i
            className="fa-solid fa-bars icon2"
            onClick={() => setIsMenueClicked(!isMenueClicked)}></i>
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
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  smooth
                  to={productsPath}>
                  Products
                </InnerLink>
              </li>
              <li>
                <Link
                  className="mini-navLinks"
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={categoryPath}>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="mini-navLinks"
                  onClick={() => setIsMenueClicked(!isMenueClicked)}
                  to={usersPath}>
                  Users
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-section">
            <ul className="nav-links">
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

export default AdminNavbar
