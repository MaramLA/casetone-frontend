import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const AdminNavbar = () => {
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
            <li className="navLinks">
              <Link to="/" className="navLinks">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/products" className="navLinks">
                Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/category" className="navLinks">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/dashboard/admin/users" className="navLinks">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-section">
          {/* Profile icon */}
          <Link to="/profile">
            <i className="fa-solid fa-user icon1" aria-hidden="true"></i>
          </Link>
          {/* burger icon  */}
          <i className="fa-solid fa-bars icon2"></i>

          {/* Navigation buttons  */}
          <div className="nav-buttons">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button type="button" className="btn-1">
                Sign Out
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AdminNavbar
