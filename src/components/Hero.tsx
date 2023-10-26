import { productsPath } from '../pathLinks'
import { HashLink as InnerLink } from 'react-router-hash-link'

import bannerImage from '../assets/banner.png'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <img src={bannerImage} alt="Banner Image" />
      <div className="circle-background"></div>
      <div className="hero__content">
        <h1 className="heading-title">Welcome to Casetone</h1>
        <p>
          Your place to stand out with elegant <br />
          iPhone cases
        </p>
        <InnerLink smooth to={productsPath}>
          <button className="hero__button">Get Started</button>
        </InnerLink>
      </div>
    </section>
  )
}

export default Hero
