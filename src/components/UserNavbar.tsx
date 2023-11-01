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

import { RootState } from '../redux/store'
import { signOut } from '../redux/slices/Users/userSlice'

const UserNavbar = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(signOut())
    navigate(homePath)
  }

  return (
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
        {/* Cart icon  */}
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
            {/* burger icon  */}
            <i className="fa-solid fa-bars icon2"></i>
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
            <i className="fa-solid fa-bars icon2"></i>
          </>
        )}
      </div>
    </nav>
  )
}

export default UserNavbar
