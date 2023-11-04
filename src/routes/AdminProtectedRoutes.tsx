import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import SignIn from '../pages/SignIn'

const AdminProtectedRoutes = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  return isSignedIn && userData?.role === 'admin' ? <Outlet /> : <SignIn />
}

export default AdminProtectedRoutes
