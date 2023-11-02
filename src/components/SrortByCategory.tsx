import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const SrortByCategory = () => {
  const dispatch = useDispatch()
  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)

  const handleCategorySortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value
    // dispatch(sortProductsByCategory(sortValue))
  }
  return (
    <div className="sort-section">
      <select className="sort-btn" onChange={handleCategorySortChange}>
        <option value="Categories" defaultValue="Categories">
          Sort
        </option>
        {categoriesList.length > 0 &&
          categoriesList.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            )
          })}

        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}

export default SrortByCategory
