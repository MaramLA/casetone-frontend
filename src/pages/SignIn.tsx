import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchUsers, signInUser } from '../redux/slices/Users/userSlice'
import { AppDispatch } from '../redux/store'

import { forgotPasswordPath, homePath, signUpPath } from '../pathLinks'
import { errorResponse } from '../utils/messages'
import { AxiosError } from 'axios'

type LogInUserType = {
  email: string
  password: string
}

const SignIn = () => {
  const [logInUser, setLogInUser] = useState<LogInUserType>({
    email: '',
    password: ''
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInUser((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(signInUser(logInUser)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          setLogInUser({ email: '', password: '' })
          navigate(homePath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <section className="signIn" id="signIn">
        <div className="signIn-container">
          <h2 className="section-title">Sign In</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="entry">
              <label htmlFor="formEmail">Email</label>
              <input
                type="email"
                id="formEmail"
                className="formEmail"
                name="email"
                placeholder="example@gmail.com"
                value={logInUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="entry">
              <label htmlFor="formPassword">Password</label>
              <input
                type="password"
                id="formPassword"
                className="formPassword"
                name="password"
                placeholder="********"
                value={logInUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="signIn-btn">
              Sign In
            </button>
          </form>
          <div className="formSignUp">
            {/* <p>Do not have an account?</p> */}
            <Link to={forgotPasswordPath} className="formSignUp">
              Forgot Password
            </Link>
            <p> | </p>
            <Link to={signUpPath} className="formSignUp">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignIn
