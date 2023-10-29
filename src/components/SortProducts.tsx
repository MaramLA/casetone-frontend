import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { sortProducts } from '../redux/slices/products/productSlice'

const SortProducts = () => {
  const dispatch = useDispatch()
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div className="sort-section">
      {/* <label>Sort by:</label> */}
      <select className="sort-btn" onChange={handleSortChange}>
        <option value="sort" defaultValue="sort">
          Sort
        </option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}

export default SortProducts
