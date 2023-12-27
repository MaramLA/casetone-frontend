import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchUsers, signInUser } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

import { forgotPasswordPath, homePath, signUpPath } from '../pathLinks'
import { errorResponse } from '../utils/messages'

type LogInUserType = {
  email: string
  password: string
}

const SignIn = () => {
  const { error, isSignedIn } = useSelector((state: RootState) => state.usersReducer)

  const [logInUser, setLogInUser] = useState<LogInUserType>({
    email: '',
    password: ''
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    if (error) {
      errorResponse(error)
    }
  }, [error])

  useEffect(() => {
    if (isSignedIn) {
      setLogInUser({ email: '', password: '' })
      navigate(homePath)
    }
  }, [isSignedIn])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInUser((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(signInUser(logInUser))
    } catch (error: any) {
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
