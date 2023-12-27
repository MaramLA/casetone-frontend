import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AxiosError } from 'axios'
import { productsPath } from '../../pathLinks'
import { fetchCategories } from '../../redux/slices/Categories/categoriesSlice'
import {
  editSingleProduct,
  fetchSingleProduct
} from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { errorResponse, successResponse } from '../../utils/messages'

type EditProductType = {
  _id: string
  name: string
  image: File | undefined | string
  description: string
  categories: string[]
  variants: string
  sizes: string
  price: number
  quantity: number
}

const initialProductData = {
  _id: '',
  name: '',
  image: '',
  description: '',
  categories: [],
  variants: '',
  sizes: '',
  price: 0,
  quantity: 0
}
const EditProduct = () => {
  const { id } = useParams()

  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)
  const { singleProduct, error } = useSelector((state: RootState) => state.productsReducer)

  const [newProduct, setNewProduct] = useState<EditProductType>({ ...initialProductData })
  // const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSingleProduct(String(id)))
  }, [dispatch])

  useEffect(() => {
    if (singleProduct) {
      setNewProduct({
        _id: singleProduct._id,
        name: singleProduct.name,
        image: singleProduct.image,
        description: singleProduct.description,
        categories: singleProduct.categories,
        variants: singleProduct.variants,
        sizes: singleProduct.sizes,
        price: Number(singleProduct.price),
        quantity: Number(singleProduct.quantity)
      })
    }
  }, [id, singleProduct])

  // useEffect(() => {
  //   // Update newProduct only when categoriesList is available and not empty
  //   if (categoriesList && categoriesList.length > 0 && newProduct.categories.length === 0) {
  //     setNewProduct((prevProduct) => ({
  //       ...prevProduct,
  //       categories: [newProduct.categories[0]] // Update categories as an array with the first category ID
  //     }))
  //   }
  // }, [categoriesList, newProduct.categories])

  // useEffect(() => {
  //   if (error) {
  //     errorResponse(error)
  //   }
  // }, [error])

  const handelInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target
    if (type === 'file') {
      const fileInput = event.target as HTMLInputElement
      setNewProduct((prevProduct) => {
        return { ...prevProduct, [name]: fileInput.files?.[0] }
      })
    } else {
      setNewProduct((prevProduct) => {
        return { ...prevProduct, [name]: value }
      })
    }
  }

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] // Access the selected file

  //   if (file) {
  //     setSelectedFile(file) // Set the selected file in state
  //   }
  // }

  const handleProductSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log('newProduct: ', newProduct)
    console.log('categoreies1: ', newProduct.categories)
    if (
      newProduct.name.length < 2 ||
      newProduct.description.length < 2 ||
      newProduct.variants.length < 2 ||
      newProduct.sizes.length < 2
    ) {
      errorResponse('Provide valid data please')
      return
    }
    if (newProduct.price <= 0) {
      errorResponse('Price should be more than 0')
      return
    }
    if (newProduct.quantity <= 0) {
      errorResponse('Quantity should be more than 0')
      return
    }

    try {
      console.log('newProduct: ', newProduct)
      const newProductData: Partial<EditProductType> = {
        name: newProduct.name,
        image: newProduct.image,
        description: newProduct.description,
        categories: [],
        variants: newProduct.variants,
        sizes: newProduct.sizes,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity)
      }
      // selectedFile === null
      //   ? (newProductData.image = singleProduct.image)
      //   : (newProductData.image = String(selectedFile))
      // console.log('selectedFile-a: ', selectedFile)

      newProductData.categories?.push(String(newProduct.categories))

      console.log('newProductData: ', newProductData)

      const formData = new FormData()
      formData.append('name', String(newProductData.name))
      formData.append('image', newProductData.image as Blob)
      formData.append('description', String(newProductData.description))
      // formData.append('categories', String(newProductData.categories))
      newProductData.categories?.forEach((value, index) => {
        formData.append(`categories[${index}]`, value)
      })
      formData.append('variants', String(newProductData.variants))
      formData.append('sizes', String(newProductData.sizes))
      formData.append('quantity', String(newProductData.quantity))
      formData.append('price', String(newProductData.price))

      console.log('edit form data ')
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
      }

      console.log('singleProduct.image: ', singleProduct.image)

      dispatch(
        editSingleProduct({
          formData: formData,
          id: String(id)
        })
      ).then((data) => {
        console.log('data: ', data)
        if (data.meta.requestStatus === 'fulfilled') {
          successResponse('Product updated successffully')
          setNewProduct(initialProductData)
          navigate(productsPath)
        }
      })
    } catch (error: AxiosError | any) {
      errorResponse(error.response.data.msg)
    }
  }

  return (
    <main>
      <section className="add-edit-product" id="addEditProduct">
        <h2 className="section-title">Edit Product</h2>
        <form className="form" onSubmit={handleProductSubmit}>
          <div className="entry">
            <label htmlFor="productName">Product Name</label>
            <div className="input-btn">
              <input
                type="text"
                id="productName"
                className="formEmail"
                placeholder="name"
                name="name"
                value={newProduct.name}
                onChange={handelInputChange}
                required
              />
            </div>
          </div>
          <div className="entry">
            <label htmlFor="productDescription">Description</label>
            <textarea
              id="productDescription"
              className="formPassword"
              name="description"
              value={newProduct.description}
              onChange={handelInputChange}
              placeholder="Descirption"
              required></textarea>
          </div>
          <div className="entry">
            <label htmlFor="productVariants">Variants</label>
            <div className="input-btn">
              <input
                type="text"
                id="productVariants"
                className="formPassword"
                name="variants"
                placeholder="product Variants"
                value={newProduct.variants}
                onChange={handelInputChange}
                required
              />
            </div>
          </div>
          <div className="entry">
            <label htmlFor="productSizes">Sizes</label>
            <div className="input-btn">
              <input
                type="text"
                id="productSizes"
                className="formPassword"
                name="sizes"
                placeholder="product Sizes"
                value={newProduct.sizes}
                onChange={handelInputChange}
                required
              />
            </div>
          </div>
          <div className="entry">
            <label htmlFor="productQuantity">Quantity</label>
            <div className="input-btn">
              <input
                type="text"
                id="productQuantity"
                className="formPassword"
                name="quantity"
                placeholder="product Quantity"
                value={newProduct.quantity}
                onChange={handelInputChange}
                required
              />
            </div>
          </div>

          <div className="entry">
            <label htmlFor="formCategory">Category</label>
            <div className="input-btn">
              <select
                id="formCategory"
                name="categories"
                onChange={handelInputChange}
                className="selectCategory"
                required>
                {categoriesList.length > 0 &&
                  categoriesList.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>

          <div className="entry">
            <label htmlFor="productSizes">Price</label>
            <div className="input-btn">
              <input
                type="text"
                id="productSizes"
                className="formPassword"
                name="price"
                placeholder="product price"
                onChange={handelInputChange}
                value={newProduct.price}
                required
              />
              <p className="currency">$</p>
            </div>
          </div>
          <div className="entry">
            <label htmlFor="productImage">Image</label>
            <div className="input-btn">
              <input
                type="file"
                id="productImage"
                className="formPassword"
                name="image"
                onChange={handelInputChange}
                accept="image/*"
                placeholder="product image"
              />
            </div>
          </div>
          {newProduct.image && (
            <div>
              {newProduct.image instanceof File ? (
                <img
                  className="image-preview"
                  src={URL.createObjectURL(newProduct.image)}
                  alt="preview"
                />
              ) : (
                <img className="image-preview" src={newProduct.image as string} alt="preview" />
              )}
            </div>
          )}
          <button type="submit" className="add-btn">
            Save
          </button>
        </form>
      </section>
    </main>
  )
}

export default EditProduct
