import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

import { homePath, usersPath, categoryPath, productsPath, profilePath } from '../pathLinks'

import { signOut } from '../redux/slices/Users/userSlice'

const AdminNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(signOut())
    navigate(homePath)
  }

  return (
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
        <i className="fa-solid fa-bars icon2"></i>
      </div>
    </nav>
  )
}

export default AdminNavbar
