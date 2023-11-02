import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { homePath } from '../../pathLinks'
import { addProduct, fetchProducts } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

const AddProduct = () => {
  const { categoriesList } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })

  const handelInputChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setNewProduct((prevProduct) => {
      const { value, name } = event.target
      return { ...prevProduct, [name]: value }
    })
  }

  const handleProductSubmit = (event: FormEvent) => {
    event.preventDefault()
    try {
      const newProductData = { id: new Date().getMilliseconds(), ...newProduct }
      dispatch(fetchProducts()).then(() => dispatch(addProduct(newProductData)))
      navigate(homePath)
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
    } catch (error) {
      toast.error('Something went wrong', {
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
              placeholder="Descirption"></textarea>
            required
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
                className="selectCategory">
                <option value="default" defaultChecked defaultValue="Product Category">
                  Product Category
                </option>
                {categoriesList.length > 0 &&
                  categoriesList.map((category) => {
                    return (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>

          <div className="entry">
            <label htmlFor="productImage">Product Image</label>
            <div className="input-btn">
              <input
                type="text"
                id="productImage"
                className="formPassword"
                name="image"
                value={newProduct.image}
                onChange={handelInputChange}
                placeholder="product image"
                required
              />
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
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </section>
    </main>
  )
}

export default AddProduct
