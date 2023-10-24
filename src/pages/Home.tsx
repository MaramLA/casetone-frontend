import Hero from '../components/Hero'
import Products from '../components/Products'
import Reviews from '../components/Reviews'
import Newsletter from '../components/Newsletter'
import About from '../components/About'
import Footer from '../layout/Footer'

const Home = () => {
  return (
    <div>
      <main>
        <Hero />
        <Products />
        <About />
        {/* <Reviews /> */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default Home
