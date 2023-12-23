// import './App.css'
import { useDispatch } from 'react-redux'

import { AppDispatch } from './redux/store'

import Index from './routes/Index'
import { useEffect } from 'react'
import { fetchCategories } from './redux/slices/Categories/categoriesSlice'
import { fetchUsers } from './redux/slices/Users/userSlice'
import { fetchProducts } from './redux/slices/products/productSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchCategories()).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(fetchProducts())
      }
    })
  }, [])
  return <Index />
}

export default App
