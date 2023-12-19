import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AxiosError } from 'axios'
import { fetchCategories } from '../../redux/slices/Categories/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { createProduct } from '../../services/productsServices'

type NewProductType = {
  name: string
  image: string
  description: string
  categories: string[]
  variants: string
  sizes: string
  price: number
  quantity: number
}

const AddProduct = () => {
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [newProduct, setNewProduct] = useState<NewProductType>({
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: '',
    sizes: '',
    price: 0,
    quantity: 0
  })

  const handelInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      // console.log(fileInput.files?.[0].name)
      setNewProduct((prevProduct) => {
        const { name } = event.target
        return { ...prevProduct, [name]: fileInput.files?.[0].name }
      })
    } else {
      setNewProduct((prevProduct) => {
        const { value, name } = event.target
        return { ...prevProduct, [name]: value }
      })
    }
  }

  const handleProductSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log(newProduct.categories)
    if (
      newProduct.name.length < 2 ||
      newProduct.description.length < 2 ||
      newProduct.variants.length < 2 ||
      newProduct.sizes.length < 2
    ) {
      toast.error('Fill all the fields please', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }
    if (newProduct.price <= 0) {
      toast.error('Price should be more than 0', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }
    if (newProduct.quantity <= 0) {
      toast.error('Quantity should be more than 0', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }
    if (!newProduct.image) {
      toast.error('Product image is required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }
    try {
      const newProductData: NewProductType = {
        name: newProduct.name,
        image: newProduct.image,
        description: newProduct.description,
        categories: [],
        variants: newProduct.variants,
        sizes: newProduct.sizes,
        price: Number(newProduct.price),
        quantity: newProduct.quantity
      }
      newProductData.categories.push(String(newProduct.categories))

      const formData = new FormData()
      formData.append('name', newProductData.name)
      formData.append('image', newProductData.image)
      formData.append('description', newProductData.description)
      formData.append('categories', newProductData.categories.toString())
      formData.append('variants', newProductData.variants)
      formData.append('sizes', newProductData.sizes)
      formData.append('quantity', newProductData.quantity.toString())
      formData.append('price', newProductData.price.toString())

      console.log('form data')
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
      }
      // newProductData.variants.push(newProduct.variants)
      // newProductData.sizes.push(newProduct.sizes)
      // dispatch(fetchProducts()).then(() => dispatch(addProduct(newProductData)))
      // navigate(homePath)

      try {
        const response = await createProduct(formData)
        console.log('response: ' + response)
      } catch (error) {
        console.log(error)
        return
      }

      toast.success('Product added successffully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.errors, {
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

  return (
    <main>
      <section className="add-edit-product" id="addEditProduct">
        <h2 className="section-title">Add Product</h2>
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
                required
              />
              <p className="currency">$</p>
            </div>
          </div>
          <div className="entry">
            <label htmlFor="productImage">Product Image</label>
            <div className="input-btn">
              <input
                type="file"
                id="productImage"
                className="formPassword"
                name="image"
                onChange={handelInputChange}
                accept="image/*"
                placeholder="product image"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </section>
    </main>
  )
}

export default AddProduct
