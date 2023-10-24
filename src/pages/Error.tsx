import React from 'react'
import { Link } from 'react-router-dom'
import { homePath } from '../pathLinks'

const Error = () => {
  return (
    <main>
      <div className="error-container">
        <h2>Oops, Something went wrong!</h2>
        <p>
          Something went wrong, this page does not exist. Click the button if you want to be
          redirected to the home page
        </p>
        <Link to={homePath}>
          <button>Home</button>
        </Link>
      </div>
    </main>
  )
}

export default Error
