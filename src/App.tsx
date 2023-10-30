// import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchUsers } from './redux/slices/Users/userSlice'
import { fetchOrders } from './redux/slices/Orders/ordersSlice'
import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchCategories } from './redux/slices/Categories/categoriesSlice'

import { AppDispatch } from './redux/store'

import Index from './routes/Index'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchOrders())
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])
  return <Index />
}

export default App
