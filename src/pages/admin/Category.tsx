import { useEffect } from 'react'

import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'

import Footer from '../../layout/Footer'

import { AppDispatch, RootState } from '../../redux/store'
import {
  CategoryType,
  deleteCategory,
  fetchCategories
} from '../../redux/slices/Categories/categoriesSlice'

const Category = () => {
  const { categoriesList, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleDeleteCategory = (categoryId: number) => {
    dispatch(deleteCategory(categoryId))
  }

  return (
    <div>
      <main>
        <section className="category">
          <form className="form">
            <div className="entry">
              <label htmlFor="category-input">Categories</label>
              <input type="text" name="category-input" id="category-input" placeholder="Category" />
            </div>
            <button className="add-btn">Add</button>
          </form>
          <div className="category-container">
            <h3 className="section-title">Categories List</h3>
            {categoriesList.length > 0 &&
              categoriesList.map((category: CategoryType) => {
                return (
                  <div key={category.id} className="single-category">
                    <p className="category-name">{category.name}</p>
                    <div className="controllers">
                      <AiFillEdit className="editIcon" />
                      <MdDelete
                        className="deleteIcon"
                        onClick={() => {
                          handleDeleteCategory(category.id)
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Category
