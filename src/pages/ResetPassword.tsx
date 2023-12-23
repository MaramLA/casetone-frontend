import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchUsers, resetUserPassword } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

import { AxiosError } from 'axios'
import { signInPath } from '../pathLinks'
import { errorResponse, successResponse } from '../utils/messages'

const ResetPassword = () => {
  const passwordValidation = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )

  const { data, error } = useSelector((state: RootState) => state.usersReducer)

  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const { token } = useParams()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  // useEffect(() => {
  //   if (data) {
  //     successResponse('Password reseted successfully')
  //     setNewPassword('')
  //     setConfirmPassword('')
  //     navigate(signInPath)
  //   }
  // }, [data])

  useEffect(() => {
    if (error) {
      errorResponse(error)
    }
  }, [error])

  const handleNewPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = event.target.value
    setNewPassword(newPasswordValue)
  }

  const handleConfirmPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = event.target.value
    setConfirmPassword(confirmPasswordValue)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (newPassword !== confirmPassword) {
        errorResponse('Passwords do not match')
        return
      }
      if (!passwordValidation.test(newPassword)) {
        errorResponse('Password should contain at least 1 lowercase character')
        errorResponse('Password should contain at least 1 uppercase character ')
        errorResponse('Password should contain at least 1 numeric character ')
        errorResponse('Password should contain at least 1 special character ')
        errorResponse('Password should contain at least 5 characters ')
        return
      }
      dispatch(resetUserPassword({ token: String(token), password: newPassword })).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse('Password reseted successfully')
          setNewPassword('')
          setConfirmPassword('')
          navigate(signInPath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <section className="forgotPassword" id="forgotPassword">
        <div className="forgotPassword-container">
          <h2 className="section-title">Reset Password</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="entry">
              <label htmlFor="formPassword">Password</label>
              <input
                type="password"
                id="formPassword"
                className="formPassword"
                name="password"
                placeholder="********"
                onChange={handleNewPassChange}
                value={newPassword}
                required
              />
            </div>
            <div className="entry">
              <label htmlFor="formConfirmtPassword">Confirm Password</label>
              <input
                type="password"
                id="formConfirmtPassword"
                className="Password2"
                name="confirmPassword"
                placeholder="********"
                onChange={handleConfirmPassChange}
                value={confirmPassword}
                required
              />
            </div>

            <button type="submit" className="forgotPassword-btn">
              Reset
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ResetPassword
