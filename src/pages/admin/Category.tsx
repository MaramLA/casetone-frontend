import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'

import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

import Footer from '../../layout/Footer'

import { AppDispatch, RootState } from '../../redux/store'

import {
  addCategory,
  CategoryType,
  deleteCategory,
  editCategory
} from '../../redux/slices/Categories/categoriesSlice'
import { toast } from 'react-toastify'

const Category = () => {
  const { categoriesList, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const [newCategory, setNewCategoryName] = useState<string>('')
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [categoryId, setCategoryId] = useState<number>(0)

  const dispatch: AppDispatch = useDispatch()

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleDeleteCategory = (categoryId: number) => {
    try {
      dispatch(deleteCategory(categoryId))
      toast.success('Category deleted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      toast.error('Something went worng', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  const handleEditCategory = (id: number, name: string) => {
    setNewCategoryName(name)
    setCategoryId(id)
    setIsEditCategory(true)
  }

  const handlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryNameValue = event.target.value
    setNewCategoryName(categoryNameValue)
  }

  const handleSubmitCategory = (event: FormEvent) => {
    event.preventDefault()
    if (!isEditCategory) {
      const temCategory = { id: new Date().getTime(), name: newCategory }
      try {
        dispatch(addCategory(temCategory))
        setNewCategoryName('')
        toast.success('Category added successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      } catch (error) {
        toast.error('Something went worng', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    } else {
      const updateCategory = { id: categoryId, name: newCategory }
      try {
        dispatch(editCategory(updateCategory))
        setNewCategoryName('')
        setIsEditCategory(false)
        toast.success('Category updated successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      } catch (error) {
        toast.error('Something went worng', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    }
  }

  return (
    <div>
      <main>
        <section className="category">
          <form className="form" onSubmit={handleSubmitCategory}>
            <div className="entry">
              <label htmlFor="category-input">Categories</label>
              <input
                type="text"
                name="category"
                id="category-input"
                placeholder="Category"
                value={newCategory}
                onChange={handlChange}
                required
              />
            </div>
            <button type="submit" className="add-btn">
              {isEditCategory ? 'Edit' : 'Add'}
            </button>
          </form>
          <div className="category-container">
            <h3 className="section-title">Categories List</h3>
            {categoriesList.length > 0 &&
              categoriesList.map((category: CategoryType) => {
                return (
                  <div key={category.id} className="single-category">
                    <p className="category-name">{category.name}</p>
                    <div className="controllers">
                      <AiFillEdit
                        className="editIcon"
                        onClick={() => handleEditCategory(category.id, category.name)}
                      />
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
