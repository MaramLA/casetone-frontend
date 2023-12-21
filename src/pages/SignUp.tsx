import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, signUpUser } from '../redux/slices/Users/userSlice'

import { signInPath } from '../pathLinks'
import { errorResponse, successResponse } from '../utils/messages'

const SignUp = () => {
  const passwordValidation = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )

  const { usersList, data } = useSelector((state: RootState) => state.usersReducer)

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: ''
  })
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      successResponse('Check your email to activate the account')
      navigate(signInPath)
    }
  }, [data])

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
  const handleSubmitUser = async (event: FormEvent) => {
    event.preventDefault()

    // ***** this way should be used in the porducts because it has an image *****
    // const formData = new FormData()
    // formData.append('firstName', newUser.firstName)
    // formData.append('lastName', newUser.lastName)
    // formData.append('email', newUser.email)
    // formData.append('password', newUser.password)
    // formData.append('address', newUser.address)
    // formData.append('confirmPassword', confirmPassword)
    // try {
    // console.log('form data')
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1])
    // }
    //   const response = await createUser(formData)
    // } catch (error: any) {
    //   console.log(error.response.data.errors)
    // }

    try {
      if (
        newUser.firstName.length < 2 ||
        newUser.lastName.length < 2 ||
        newUser.email.length < 2 ||
        newUser.password.length < 2 ||
        newUser.address.length < 2 ||
        confirmPassword.length < 2
      ) {
        errorResponse('Provide valid data please')
        return
      } else {
        const foundEmail = usersList.find((user) => user.email === newUser.email)
        if (foundEmail) {
          errorResponse('This email already exists')
          return
        }
        if (newUser.password !== confirmPassword) {
          errorResponse('Passwords do not match')
          return
        }

        if (!passwordValidation.test(newUser.password)) {
          errorResponse('Password should contain at least 1 lowercase character')
          errorResponse('Password should contain at least 1 uppercase character ')
          errorResponse('Password should contain at least 1 numeric character ')
          errorResponse('Password should contain at least 1 special character ')
          errorResponse('Password should contain at least 5 characters ')
          return
        }
      }

      dispatch(signUpUser(newUser))
    } catch (error: any) {
      errorResponse(error.response.data.msg)
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
                    placeholder="example@gmail.com"
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
                <div className="entry">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="formEmail"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    value={newUser.address}
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
