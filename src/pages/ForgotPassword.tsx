import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { UserType, fetchUsers, forgotUserPassword } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const { usersList, data } = useSelector((state: RootState) => state.usersReducer)

  const [userEmail, setUserEmail] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value
    setUserEmail(inputEmail)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      //   console.log(usersList)
      const foundUser = usersList.find((user: UserType) => userEmail === user.email)
      if (!foundUser) {
        toast.error('No account exist with this email', {
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
      console.log(foundUser?.email)
      dispatch(forgotUserPassword(userEmail))
      console.log(data)
      toast.success('Check your email', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })

      setUserEmail('')
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
