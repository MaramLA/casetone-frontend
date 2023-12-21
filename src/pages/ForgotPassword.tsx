import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserType, fetchUsers, forgotUserPassword } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

import { errorResponse, successResponse } from '../utils/messages'

const ForgotPassword = () => {
  const { usersList, data, error } = useSelector((state: RootState) => state.usersReducer)

  const [userEmail, setUserEmail] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    if (data) {
      successResponse('Check your email to reset the password')
      setUserEmail('')
    }
  }, [data])

  useEffect(() => {
    if (error) {
      errorResponse(error)
    }
  }, [error])

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value
    setUserEmail(inputEmail)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = usersList.find((user: UserType) => userEmail === user.email)
      if (!foundUser) {
        errorResponse('No account exist with this email')
        return
      }
      dispatch(forgotUserPassword(userEmail))
    } catch (error: any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <section className="forgotPassword" id="forgotPassword">
        <div className="forgotPassword-container">
          <h2 className="section-title">Forgot Password</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="entry">
              <label htmlFor="formEmail">Enter your email</label>
              <input
                type="email"
                id="formEmail"
                className="formEmail"
                name="email"
                placeholder="example@gmail.com"
                value={userEmail}
                onChange={handleEmailChange}
                required
              />
            </div>

            <button type="submit" className="forgotPassword-btn">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ForgotPassword
