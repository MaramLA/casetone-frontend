import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  homePath,
  errorPath,
  usersPath,
  signInPath,
  signUpPath,
  profilePath,
  categoryPath,
  purchasesPath,
  addProductPath,
  editProductPath
} from '../pathLinks'

import Header from '../layout/Header'

import Home from '../pages/Home'
import Error from '../pages/Error'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import Users from '../pages/admin/Users'
import Category from '../pages/admin/Category'
import Purchases from '../pages/user/Purchases'
import AddProduct from '../pages/admin/AddProduct'
import ProductDetails from '../pages/ProductDetails'
import UserProtectedRoutes from './UserProtectedRoutes'
import AdminProtectedRoutes from './AdminProtectedRoutes'
import EditProduct from '../pages/admin/EditProduct'

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
        <Route path={'/products/:id'} element={<ProductDetails />} />

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
    </BrowserRouter>
  )
}

export default Index
