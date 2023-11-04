import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'

import Footer from '../layout/Footer'
import userProfile from '../assets/userProfile.png'

import { AppDispatch, RootState } from '../redux/store'

import { updateUser } from '../redux/slices/Users/userSlice'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {
  const { userData, isLoading, error } = useSelector((state: RootState) => state.usersReducer)
  const [profileUpdate, setProfileUpdate] = useState({
    id: userData?.id,
    firstName: userData?.firstName.toString(),
    lastName: userData?.lastName.toString(),
    email: userData?.email.toString(),
    password: userData?.password.toString(),
    role: userData?.role.toString(),
    ban: userData?.ban
  })
  const [isInfoEdited, setIsInfoEdited] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileUpdate((previousProfile) => {
      const { value, name } = event.target
      return { ...previousProfile, [name]: value }
    })
    setIsInfoEdited(true)
  }

  const handleProfileUpdate = (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(updateUser(profileUpdate))

      toast.success('Profile updated successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  return (
    <div>
      <main>
        <section className="profile" id="profile">
          <div className="profile-container">
            <img src={userProfile} alt="user" />

            <form className="form" onSubmit={handleProfileUpdate}>
              <div className="top-side">
                <div className="entry">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="name"
                    name="firstName"
                    placeholder="First Name"
                    value={profileUpdate?.firstName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="entry">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="name"
                    name="lastName"
                    placeholder="Last Name"
                    value={profileUpdate?.lastName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="entry">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="formEmail"
                    className="formEmail"
                    name="email"
                    placeholder="Email"
                    value={profileUpdate?.email}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              {isInfoEdited && (
                <div className="bottom-side">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
