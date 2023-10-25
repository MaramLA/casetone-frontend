import Hero from '../components/Hero'
import Products from '../components/Products'
import About from '../components/About'
import Footer from '../layout/Footer'

const Home = () => {
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
