import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signInPath } from '../pathLinks'
import { addUser, fetchUsers } from '../redux/slices/Users/userSlice'
import { AppDispatch, RootState } from '../redux/store'

type StrengthChecks = {
  length: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasDigit: boolean
  hasSpecialChar: boolean
}

const SignUp = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [lasttName, setLasttName] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [cofPassword, setCofPassword] = useState('')

  const passwordValidation = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )

  const { usersList } = useSelector((state: RootState) => state.usersReducer)

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
      if (
        newUserData.firstName.length < 2 ||
        newUserData.lastName.length < 2 ||
        newUserData.email.length < 2 ||
        newUserData.password.length < 2 ||
        confirmPassword.length < 2
      ) {
        toast.warning('Provide valid data please', {
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
      } else {
        const foundEmail = usersList.find((user) => user.email === newUserData.email)
        if (foundEmail) {
          toast.warning('This email already exists', {
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
        if (newUserData.password !== confirmPassword) {
          toast.warning('Passwords do not match', {
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
        // if (newUserData.password.length < 8) {
        //   toast.warning('Passwords should be greater then or equal 8 characters', {
        //     position: 'top-right',
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'colored'
        //   })
        //   return
        // }
        if (!passwordValidation.test(newUserData.password)) {
          toast.warning('Password should contain at least 1 lowercase character', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          toast.warning('Password should contain at least 1 uppercase character ', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          toast.warning('Password should contain at least 1 numeric character ', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          toast.warning('Password should contain at least 1 special character ', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          toast.warning('Password should contain at least 8 characters ', {
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
