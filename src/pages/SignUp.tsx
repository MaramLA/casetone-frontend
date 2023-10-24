import React from 'react'
import { Link } from 'react-router-dom'
import { signInPath } from '../pathLinks'

const SignUp = () => {
  return (
    <main>
      <section className="signUp" id="signUp">
        <div className="signUp-container">
          <h2 className="section-title">Sign Up</h2>
          <form className="form">
            <div className="top-side">
              <div className="left-side">
                <div className="entry">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="text"
                    id="formEmail"
                    className="formEmail"
                    name="formEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="formPassword">Password</label>
                  <input
                    type="password"
                    id="formPassword"
                    className="formPassword"
                    name="formPassword"
                    placeholder="********"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="formConfirmtPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="formConfirmtPassword"
                    className="formPassword"
                    name="formConfirmtPassword"
                    placeholder="********"
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
                  />
                </div>
              </div>
            </div>
            <div className="bottom-side">
              <button className="signUp-btn">Sign Up</button>
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
