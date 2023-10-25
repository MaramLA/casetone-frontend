import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import { RootState } from '../redux/store'

const UserProtectedRoutes = () => {
  const { isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  return isSignedIn ? <Outlet /> : <SignIn />
}

export default UserProtectedRoutes
