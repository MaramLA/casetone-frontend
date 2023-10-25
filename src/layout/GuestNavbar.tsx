import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
import { signOut } from '../redux/slices/Users/userSlice'
import { RootState } from '../redux/store'

const GuestNavbar = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(signOut())
    navigate(signInPath)
  }

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
            {userData?.role !== 'admin' && (
              <li>
                <InnerLink className="navLinks" smooth to="/#aboutUsSection">
                  About us
                </InnerLink>
              </li>
            )}
            {isSignedIn && userData?.role === 'admin' && (
              <li>
                <Link to={categoryPath} className="navLinks">
                  Categories
                </Link>
              </li>
            )}
            {isSignedIn && userData?.role === 'admin' && (
              <li>
                <Link to={usersPath} className="navLinks">
                  Users
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="right-section">
          {/* Cart icon  */}
          {userData?.role !== 'admin' && (
            <Link to={purchasesPath}>
              <i className="fa fa-shopping-cart icon1" aria-hidden="true"></i>
            </Link>
          )}
          {/* Profile icon */}
          {isSignedIn && (
            <Link to={userProfilePath}>
              <i className="fa-solid fa-user icon1" aria-hidden="true"></i>
            </Link>
          )}
          {/* burger icon  */}
          <i className="fa-solid fa-bars icon2"></i>
          {/* Navigation buttons  */}
          {isSignedIn ? (
            <div className="nav-buttons">
              <button className="btn-1" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="nav-buttons">
              <Link className="link-btn" to={signInPath}>
                <button className="btn-1">Sign In</button>
              </Link>
              <Link className="link-btn" to={signUpPath}>
                <button className="btn-2">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default GuestNavbar
