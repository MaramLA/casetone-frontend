import React from 'react'
import { MdDelete } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

const Category = () => {
  return (
    <main className="category">
      <form className="">
        <input type="text" name="category" id="" />
        <button>Add Category</button>
      </form>
      <div className="categories-list">
        <h2>Categories</h2>
        <div className="category-card">
          <p>Name</p>
          <button>Edit</button>
          <div className="controlers">
            <AiFillEdit />
            <MdDelete />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Category
