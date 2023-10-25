import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import { RootState } from '../redux/store'

const AdminProtectedRoutes = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)

  return isSignedIn && userData?.role === 'admin' ? <Outlet /> : <SignIn />
}

export default AdminProtectedRoutes
