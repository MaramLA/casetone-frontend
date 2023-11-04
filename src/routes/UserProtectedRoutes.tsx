import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import SignIn from '../pages/SignIn'

const UserProtectedRoutes = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  return isSignedIn ? <Outlet /> : <SignIn />
}

export default UserProtectedRoutes
