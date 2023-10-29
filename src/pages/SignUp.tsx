import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInPath } from '../pathLinks'
import { addUser, fetchUsers } from '../redux/slices/Users/userSlice'
import { AppDispatch } from '../redux/store'
// import { v4 as uuidv4 } from 'uuid'

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    ban: false
  })
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }

  const handleConfirmPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }
  const handleSubmitUser = (event: FormEvent) => {
    event.preventDefault()
    const newUserData = { id: new Date().getTime(), ...newUser }

    dispatch(fetchUsers()).then(() => dispatch(addUser(newUserData)))
    navigate(signInPath)
  }
  return (
    <main>
      <section className="signUp" id="signUp">
        <div className="signUp-container">
          <h2 className="section-title">Sign Up</h2>
          <form className="form" onSubmit={handleSubmitUser}>
            <div className="top-side">
              <div className="left-side">
                <div className="entry">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="text"
                    id="formEmail"
                    className="formEmail"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={newUser.email}
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
                    onChange={handleChange}
                    value={newUser.password}
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
                  />
                </div>
              </div>
              <div className="right-side">
                <div className="entry">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="formEmail"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={newUser.firstName}
                  />
                </div>
                <div className="entry">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="formEmail"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={newUser.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="bottom-side">
              <button type="submit" className="signUp-btn">
                Sign Up
              </button>
            </div>
          </form>
          <div className="formSignUp">
            <p>Do you have an account?</p>
            <Link to={signInPath} className="formSignIn">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignUp
