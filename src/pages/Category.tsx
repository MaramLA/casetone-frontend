import React from 'react'
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

const Category = () => {
  return (
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
          <div className="single-category">
            <p className="category-name">name</p>
            <div className="controllers">
              <AiFillEdit className="editIcon" />
              <MdDelete className="deleteIcon" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Category
