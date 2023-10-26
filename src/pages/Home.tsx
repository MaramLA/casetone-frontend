import Footer from '../layout/Footer'

import Hero from '../components/Hero'
import About from '../components/About'
import Products from '../components/Products'

const Home = () => {
  //
  return (
    <div>
      <main>
        <Hero />
        <Products />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default Home
