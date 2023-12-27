import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import {
  addProductPath,
  categoryPath,
  errorPath,
  forgotPasswordPath,
  homePath,
  profilePath,
  purchasesPath,
  signInPath,
  signUpPath,
  usersPath
} from '../pathLinks'

import Header from '../layout/Header'

import ActivateNewUser from '../pages/ActivateNewUser'
import Error from '../pages/Error'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Profile from '../pages/Profile'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AddProduct from '../pages/admin/AddProduct'
import Category from '../pages/admin/Category'
import EditProduct from '../pages/admin/EditProduct'
import Users from '../pages/admin/Users'

import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Purchases from '../pages/user/Purchases'
import AdminProtectedRoutes from './AdminProtectedRoutes'
import UserProtectedRoutes from './UserProtectedRoutes'

const Index = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          marginTop: '12rem',
          fontSize: '2em',
          width: '30rem',
          padding: '3rem, 6rem'
        }}
      />
      <Routes>
        <Route path={homePath} element={<Home />} />
        <Route path={errorPath} element={<Error />} />
        <Route path={signInPath} element={<SignIn />} />
        <Route path={signUpPath} element={<SignUp />} />
        <Route path={forgotPasswordPath} element={<ForgotPassword />} />
        <Route path={'/reset-password/:token'} element={<ResetPassword />} />
        <Route path={'/products/:id'} element={<ProductDetails />} />
        <Route path={'/activate/:token'} element={<ActivateNewUser />} />

        <Route path="/registerd" element={<AdminProtectedRoutes />}>
          <Route path={usersPath} element={<Users />} />
          <Route path={categoryPath} element={<Category />} />
          <Route path={addProductPath} element={<AddProduct />} />
          <Route path={'/registerd/admin/edit-product/:id'} element={<EditProduct />} />
        </Route>

        <Route path="/registerd" element={<UserProtectedRoutes />}>
          <Route path={profilePath} element={<Profile />} />
          <Route path={purchasesPath} element={<Purchases />} />
        </Route>
      </Routes>

      {/* -------------- */}

      {/* <Routes>
        <Route path={homePath} element={<Home />} />
        <Route path={errorPath} element={<Error />} />
        <Route path={signInPath} element={<SignIn />} />
        <Route path={signUpPath} element={<SignUp />} />
        <Route path={forgotPasswordPath} element={<ForgotPassword />} />
        <Route path={'/reset-password/:token'} element={<ResetPassword />} />
        <Route path={'/products/:id'} element={<ProductDetails />} />
        <Route path={'/activate/:token'} element={<ActivateNewUser />} />

        <Route path={usersPath} element={<Users />} />
        <Route path={categoryPath} element={<Category />} />
        <Route path={addProductPath} element={<AddProduct />} />
        <Route path={'/registerd/admin/edit-product/:id'} element={<EditProduct />} />

        <Route path={profilePath} element={<Profile />} />
        <Route path={purchasesPath} element={<Purchases />} />
      </Routes> */}
    </BrowserRouter>
  )
}

export default Index
