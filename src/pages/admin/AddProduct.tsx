const AddProduct = () => {
  return (
    <main>
      <section className="signUp" id="signUp">
        <div className="signUp-container">
          <h2 className="section-title">Add Product</h2>
          <form className="form">
            <div className="top-side">
              <div className="left-side">
                <div className="entry">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    className="formEmail"
                    name="productName"
                    placeholder="name"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="formCategory">Category</label>
                  <input
                    type="text"
                    id="formCategory"
                    className="formPassword"
                    name="formCategory"
                    placeholder="Descirption"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    id="productDescription"
                    className="formPassword"
                    name="productDescription"
                    placeholder="Descirption"></textarea>
                </div>
              </div>
              <div className="right-side">
                <div className="entry">
                  <label htmlFor="productVariants">Variants</label>
                  <input
                    type="text"
                    id="productVariants"
                    className="formPassword"
                    name="productVariants"
                    placeholder="product Variants"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="productSizes">Sizes</label>
                  <input
                    type="text"
                    id="productSizes"
                    className="formPassword"
                    name="productSizes"
                    placeholder="product Sizes"
                  />
                </div>
                <div className="entry">
                  <label htmlFor="productImage">Product Image</label>
                  <input
                    type="text"
                    id="productImage"
                    className="formPassword"
                    name="productImage"
                    placeholder="product image"
                  />
                </div>
              </div>
            </div>
            <div className="bottom-side">
              <button className="signUp-btn">Add</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default AddProduct
