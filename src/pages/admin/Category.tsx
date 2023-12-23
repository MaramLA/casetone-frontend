import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

import { AppDispatch, RootState } from '../../redux/store'

import Footer from '../../layout/Footer'

import { AxiosError } from 'axios'
import {
  CategoryType,
  createNewCategory,
  deleteSingleCategory,
  fetchCategories,
  updateSingleCategory
} from '../../redux/slices/Categories/categoriesSlice'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import { errorResponse, successResponse } from '../../utils/messages'

const Category = () => {
  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)

  const [newCategory, setNewCategory] = useState('')
  const [isEditCategory, setIsEditCategory] = useState(false)
  const [categoryId, setCategoryId] = useState<string>('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch, categoriesList, isEditCategory])

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      dispatch(deleteSingleCategory(categoryId)).then((data) => {
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse(`Category deleted successufully`)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
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
        dispatch(createNewCategory(newcategoryObject)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            setNewCategory('')
            successResponse('Category created successfully')
          }
        })
      } catch (error: AxiosError | any) {
        errorResponse(error.response.data.msg)
      }
    } else {
      try {
        const newcategoryObject = { id: categoryId, name: newCategory }
        dispatch(updateSingleCategory(newcategoryObject)).then((data) => {
          if (data.meta.requestStatus === 'fulfilled') {
            setNewCategory('')
            setIsEditCategory(false)
            successResponse(`Category updated successufully`)
          }
        })
      } catch (error: AxiosError | any) {
        errorResponse(error.response.data.msg)
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
