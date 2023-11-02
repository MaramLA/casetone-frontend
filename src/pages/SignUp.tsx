import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signInPath } from '../pathLinks'
import { addUser, fetchUsers } from '../redux/slices/Users/userSlice'
import { AppDispatch } from '../redux/store'

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
      const { value, name } = event.target
      return { ...prevUser, [name]: value }
    })
  }

  const handleConfirmPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = event.target.value
    setConfirmPassword(confirmPasswordValue)
  }
  const handleSubmitUser = (event: FormEvent) => {
    event.preventDefault()
    try {
      const newUserData = { id: new Date().getTime(), ...newUser }
      dispatch(fetchUsers()).then(() => dispatch(addUser(newUserData)))
      toast.success('Account created successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      navigate(signInPath)
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
    }
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
                    type="email"
                    id="formEmail"
                    className="formEmail"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={newUser.email}
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
                    onChange={handleChange}
                    value={newUser.password}
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
                    required
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
                    required
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
