import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
  usersPath,
  adminDashboardPath,
  productDetailsPath,
  userProfilePath,
  purchasesPath,
  categoryPath,
  errorPath,
  homePath,
  signInPath,
  signUpPath,
  addProductPath
} from '../pathLinks'

import Header from '../layout/Header'

import Home from '../pages/Home'
import Error from '../pages/Error'
import Users from '../pages/Users'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Category from '../pages/Category'
import Purchases from '../pages/Purchases'
import AddProduct from '../pages/AddProduct'
import UserProfile from '../pages/UserProfile'
import ProductDetails from '../pages/ProductDetails'
import AdminDashboard from '../pages/AdminDashboard'
import UserProtectedRoutes from './UserProtectedRoutes'
import AdminProtectedRoutes from './AdminProtectedRoutes'

const Index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={homePath} element={<Home />} />
        <Route path={errorPath} element={<Error />} />
        <Route path={signInPath} element={<SignIn />} />
        <Route path={signUpPath} element={<SignUp />} />
        <Route path={productDetailsPath} element={<ProductDetails />} />

        <Route path="/registerd" element={<AdminProtectedRoutes />}>
          <Route path={usersPath} element={<Users />} />
          <Route path={categoryPath} element={<Category />} />
          <Route path={addProductPath} element={<AddProduct />} />
          <Route path={adminDashboardPath} element={<AdminDashboard />} />
        </Route>

        <Route path="/registerd" element={<UserProtectedRoutes />}>
          <Route path={purchasesPath} element={<Purchases />} />
          <Route path={userProfilePath} element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Index
