import { productsPath } from '../pathLinks'
import { HashLink as InnerLink } from 'react-router-hash-link'

import bannerImage from '../assets/banner.png'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Hero = () => {
  const { isSignedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  return (
    <section className="hero" id="home">
      <img src={bannerImage} alt="Banner Image" />
      <div className="circle-background"></div>
      <div className="hero__content">
        {isSignedIn && userData?.role === 'admin' ? (
          <>
            <h1 className="heading-title">Welcome to Casetone</h1>
            <p>Admin Dashboard</p>
          </>
        ) : (
          <>
            <h1 className="heading-title">Welcome to Casetone</h1>
            <p>
              Your place to stand out with elegant <br />
              iPhone cases
            </p>
            <InnerLink smooth to={productsPath}>
              <button className="hero__button">Get Started</button>
            </InnerLink>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
