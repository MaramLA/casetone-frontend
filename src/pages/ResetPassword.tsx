import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchUsers } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

import { AxiosError } from 'axios'
import { resetUserPassword } from '../services/usersServices'

const ResetPassword = () => {
  const passwordValidation = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )

  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const { token } = useParams()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

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
        toast.error('Passwords do not match', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        return
      }
      if (!passwordValidation.test(newPassword)) {
        toast.error('Password should contain at least 1 lowercase character', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        toast.error('Password should contain at least 1 uppercase character ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        toast.error('Password should contain at least 1 numeric character ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        toast.error('Password should contain at least 1 special character ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        toast.error('Password should contain at least 8 characters ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        return
      }
      const response = await resetUserPassword(String(token), newPassword)
      console.log(response)
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
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
