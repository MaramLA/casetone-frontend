import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Footer from '../layout/Footer'
import userProfile from '../assets/userProfile.png'

import { AppDispatch, RootState } from '../redux/store'
import { fetchSingleUser, updateUserData } from '../redux/slices/Users/userSlice'
import { AxiosError } from 'axios'
import { errorResponse, successResponse } from '../utils/messages'

const Profile = () => {
  const { userData, data } = useSelector((state: RootState) => state.usersReducer)

  const [profileUpdate, setProfileUpdate] = useState({
    _id: userData?._id,
    firstName: String(userData?.firstName),
    lastName: String(userData?.lastName),
    email: String(userData?.email),
    balance: userData?.balance,
    isAdmin: userData?.isAdmin,
    isBanned: userData?.isBanned,
    address: String(userData?.address)
  })
  const [isInfoEdited, setIsInfoEdited] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSingleUser())
  }, [dispatch])

  // useEffect(() => {
  //   if (data) {
  //     successResponse('Profile updated successfully')
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (error) {
  //     errorResponse(error)
  //   }
  // }, [error])

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileUpdate((previousProfile) => {
      const { value, name } = event.target
      return { ...previousProfile, [name]: value }
    })
    setIsInfoEdited(true)
  }

  const handleProfileUpdate = async (event: FormEvent) => {
    event.preventDefault()
    if (
      profileUpdate?.firstName.length < 2 ||
      profileUpdate?.lastName.length < 2 ||
      profileUpdate?.address.length < 2
    ) {
      errorResponse('Provide valid data')
      return
    }
    try {
      dispatch(updateUserData(profileUpdate))
      setIsInfoEdited(false)
      successResponse('Profile updated successfully')
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
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
                    readOnly
                  />
                </div>
                <div className="entry">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="formEmail"
                    name="address"
                    placeholder="Address"
                    value={profileUpdate?.address}
                    onChange={handleProfileChange}
                  />
                </div>
                {!profileUpdate.isAdmin && (
                  <div className="entry">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="text"
                      id="balance"
                      className="formEmail"
                      name="balance"
                      placeholder="Balance"
                      value={profileUpdate?.balance}
                      readOnly
                    />
                  </div>
                )}
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
