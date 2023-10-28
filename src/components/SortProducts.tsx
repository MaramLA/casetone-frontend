import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { sortProducts } from '../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch = useDispatch()
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div>
      <label>Sort by:</label>
      <select onChange={handleSortChange}>
        <option value="price" defaultValue="price">
          Price
        </option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}

export default SortProducts
