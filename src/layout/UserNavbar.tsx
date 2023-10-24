import { Link } from 'react-router-dom'
import { HashLink as InnerLink } from 'react-router-hash-link'

import logo from '../assets/logo.png'

const UserNavbar = () => {
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
              <Link className="navLinks" to="/">
                Home
              </Link>
            </li>
            <li>
              <InnerLink className="navLinks" smooth to="/#productsSection">
                Products
              </InnerLink>
            </li>
            {/* <li>
            <Link to="/">About us</Link>
          </li> */}
            <li>
              <Link className="navLinks" to="/contact">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-section">
          {/* Cart icon  */}
          <Link to="/user/cart">
            <i className="fa fa-shopping-cart icon1" aria-hidden="true"></i>
          </Link>
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

export default UserNavbar
