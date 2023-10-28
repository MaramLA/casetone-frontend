import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
  usersPath,
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
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Users from '../pages/admin/Users'
import Category from '../pages/admin/Category'
import UserProfile from '../pages/UserProfile'
import Purchases from '../pages/user/Purchases'
import AddProduct from '../pages/admin/AddProduct'
import ProductDetails from '../pages/ProductDetails'
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
        <Route path={'/products/:id'} element={<ProductDetails />} />

        <Route path="/registerd" element={<AdminProtectedRoutes />}>
          <Route path={usersPath} element={<Users />} />
          <Route path={categoryPath} element={<Category />} />
          <Route path={addProductPath} element={<AddProduct />} />
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
