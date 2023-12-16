import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

import { AppDispatch, RootState } from '../../redux/store'

import Footer from '../../layout/Footer'

import { CategoryType, fetchCategories } from '../../redux/slices/Categories/categoriesSlice'
import { createCategory, deleteCategory, editCategory } from '../../services/categoriesServices'

const Category = () => {
  const { categoriesList, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const [newCategory, setNewCategory] = useState('')
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [categoryId, setCategoryId] = useState<string>('')

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

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const response = await deleteCategory(categoryId)
      dispatch(fetchCategories())
      toast.success(response.message, {
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

  const handleEditCategory = (id: string, name: string) => {
    setNewCategory(name)
    setCategoryId(id)
    setIsEditCategory(true)
  }

  const handlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryNameValue = event.target.value
    setNewCategory(categoryNameValue)
  }

  const handleSubmitCategory = async (event: FormEvent) => {
    event.preventDefault()
    if (!isEditCategory) {
      try {
        const newcategoryObject = { name: newCategory }
        const response = await createCategory(newcategoryObject)
        dispatch(fetchCategories())
        console.log(response)
        setNewCategory('')
        toast.success(response.message, {
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
      try {
        const newcategoryObject = { id: categoryId, name: newCategory }
        const response = await editCategory(newcategoryObject)
        dispatch(fetchCategories())
        setNewCategory('')
        setIsEditCategory(false)
        toast.success(response.message, {
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
                  <div key={category._id} className="single-category">
                    <p className="category-name">{category.name}</p>
                    <div className="controllers">
                      <AiFillEdit
                        className="editIcon"
                        onClick={() => handleEditCategory(category._id, category.name)}
                      />
                      <MdDelete
                        className="deleteIcon"
                        onClick={() => {
                          handleDeleteCategory(category._id)
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
