import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'

import { AppDispatch, RootState } from '../redux/store'
import { signIn } from '../redux/slices/Users/userSlice'

import { homePath, signUpPath } from '../pathLinks'

type LogInUserType = {
  email: string
  password: string
}

const SignIn = () => {
  const { usersList } = useSelector((state: RootState) => state.usersReducer)

  const [logInUser, setLogInUser] = useState<LogInUserType>({
    email: '',
    password: ''
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInUser((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = usersList.find((user) => user.email === logInUser.email)
      if (foundUser && foundUser.ban === false && foundUser.password === logInUser.password) {
        dispatch(signIn(foundUser))
        navigate(homePath)
      } else {
        if (!foundUser) {
          toast.error('This account does not exist', {
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
        if (foundUser.ban === true) {
          toast.error('This account is banned', {
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
        if (foundUser.password !== logInUser.password) {
          toast.error('Incorrect email or password', {
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
      return
    }

    setLogInUser({ email: '', password: '' })
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
                placeholder="Email"
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
            <p>Do not have an account?</p>
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
