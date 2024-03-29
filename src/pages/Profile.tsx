import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userProfile from '../assets/userProfile.png'

import { AxiosError } from 'axios'
import { fetchSingleUser, updateUserData } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'
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
      dispatch(updateUserData(profileUpdate)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          setIsInfoEdited(false)
          successResponse('Profile updated successfully')
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <section className="profile" id="profile">
        <div className="profile-container">
          <form className="form" onSubmit={handleProfileUpdate}>
            <img src={userProfile} alt="user" />
            <div className="top-side">
              <div className="left-side">
                <div className="entry">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="upper-case-input"
                    name="firstName"
                    placeholder="First Name"
                    value={profileUpdate?.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="entry">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="lower-case-input"
                    name="email"
                    placeholder="Email"
                    value={profileUpdate?.email}
                    onChange={handleProfileChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="right-side">
                <div className="entry">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="upper-case-input"
                    name="lastName"
                    placeholder="Last Name"
                    value={profileUpdate?.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="entry">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="regular-case-input"
                    name="address"
                    placeholder="Address"
                    value={profileUpdate?.address}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bottom-side">
              {!profileUpdate.isAdmin && (
                <div className="entry">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    id="balance"
                    className="regular-case-input"
                    name="balance"
                    placeholder="Balance"
                    value={profileUpdate?.balance}
                    readOnly
                  />
                </div>
              )}
              {isInfoEdited && (
                <div className="button-div">
                  <button type="submit" className="profile-btn">
                    Save
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Profile
