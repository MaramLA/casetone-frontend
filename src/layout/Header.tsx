import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import AdminNavbar from '../components/AdminNavbar'
import UserNavbar from '../components/UserNavbar'

const Header = () => {
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  return (
    <header className="header">
      {userData?.role.toLowerCase() === 'admin' ? <AdminNavbar /> : <UserNavbar />}
    </header>
  )
}

export default Header
