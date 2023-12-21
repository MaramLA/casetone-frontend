import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, signInUser } from '../redux/slices/Users/userSlice'

import { forgotPasswordPath, homePath, signUpPath } from '../pathLinks'

import { AxiosError } from 'axios'
import { response } from 'express'

type LogInUserType = {
  email: string
  password: string
}

const SignIn = () => {
  const { error, userData, isSignedIn } = useSelector((state: RootState) => state.usersReducer)

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
      toast.error(error, {
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
    } catch (error) {
      console.log(error)
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
