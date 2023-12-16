import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

import UserNavbar from '../components/UserNavbar'
import AdminNavbar from '../components/AdminNavbar'

const Header = () => {
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  return (
    <header className="header">
      {userData?.isAdmin === true ? <AdminNavbar /> : <UserNavbar />}
    </header>
  )
}

export default Header
