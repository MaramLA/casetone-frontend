import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
  productsPath,
  usersPath,
  adminDashboardPath,
  productDetailsPath,
  userProfilePath,
  cartPath,
  categoryPath,
  errorPath,
  homePath,
  signInPath,
  signUpPath,
  addProductPath
} from './pathLinks'

import Products from './components/Products'
import Users from './pages/Users'

import GuestNavbar from './layout/GuestNavbar'
import AdminNavbar from './layout/AdminNavbar'
import UserNavbar from './layout/UserNavbar'

import AdminDashboard from './pages/AdminDashboard'
import ProductDetails from './pages/ProductDetails'
import UserProfile from './pages/UserProfile'
import Cart from './pages/Cart'
import Category from './pages/Category'
import Error from './pages/Error'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AddProduct from './pages/AddProduct'

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <BrowserRouter>
      {isSignedIn ? isAdmin ? <AdminNavbar /> : <UserNavbar /> : <GuestNavbar />}
      {/* <UsersNavbar /> */}
      <Routes>
        <Route path={homePath} element={<Home />} />
        <Route path={errorPath} element={<Error />} />
        <Route path={signInPath} element={<SignIn />} />
        <Route path={signUpPath} element={<SignUp />} />
        <Route path={productDetailsPath} element={<ProductDetails />} />

        <Route path={cartPath} element={<Cart />} />
        <Route path={userProfilePath} element={<UserProfile />} />

        <Route path={usersPath} element={<Users />} />
        <Route path={categoryPath} element={<Category />} />
        <Route path={productsPath} element={<Products />} />
        <Route path={adminDashboardPath} element={<AdminDashboard />} />
        <Route path={addProductPath} element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
