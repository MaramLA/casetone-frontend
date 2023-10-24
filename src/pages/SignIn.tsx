import React from 'react'
import { Link } from 'react-router-dom'

import { signUpPath } from '../pathLinks'
const SignIn = () => {
  return (
    <main>
      <section className="signIn" id="signIn">
        <div className="signIn-container">
          <h2 className="section-title">Sign In</h2>
          <form className="form">
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
            <button className="signIn-btn">Sign In</button>
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
