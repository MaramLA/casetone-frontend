// import './App.css'
import { useDispatch } from 'react-redux'

import { AppDispatch } from './redux/store'

import Index from './routes/Index'

function App() {
  // const dispatch: AppDispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchCategories())
  //   dispatch(fetchUsers())
  //   dispatch(fetchProducts())s
  //   dispatch(fetchOrders())
  // }, [])
  return <Index />
}

export default App
