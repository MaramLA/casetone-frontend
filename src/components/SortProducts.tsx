import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { sortProducts } from '../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch = useDispatch()

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value
    dispatch(sortProducts(sortValue))
  }
  return (
    <div className="sort-section">
      <select className="sort-btn" onChange={handleSortChange} defaultValue="">
        <option value="" disabled>
          Sort by
        </option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}

export default SortProducts
