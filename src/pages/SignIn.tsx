import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { homePath, signUpPath } from '../pathLinks'

import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, signIn, UserType } from '../redux/slices/Users/userSlice'

type LogInUserType = {
  email: string
  password: string
}

const SignIn = () => {
  const { usersList } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  console.log(usersList)

  const [logInUser, setLogInUser] = useState<LogInUserType>({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogInUser((previousState) => {
      return { ...previousState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      usersList.find((user: UserType) => {
        const UserExist = user.email === logInUser.email
        console.log(UserExist)
        if (UserExist && user.password === logInUser.password) {
          dispatch(signIn(user))
          navigate(homePath)
        } else {
          console.log('Invalid email or password')
        }
      })
    } catch (error) {
      console.log(error)
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
                type="text"
                id="formEmail"
                className="formEmail"
                name="email"
                placeholder="Email"
                value={logInUser.email}
                onChange={handleInputChange}
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
