import { useDispatch } from 'react-redux'

import { AppDispatch } from './redux/store'

import { useEffect } from 'react'
import { fetchCategories } from './redux/slices/Categories/categoriesSlice'
import { fetchUsers } from './redux/slices/Users/userSlice'
import { fetchProducts } from './redux/slices/products/productSlice'
import Index from './routes/Index'

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
