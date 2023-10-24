import React, { useState } from "react"

import './global.css'
import categoriesList from "./categories"

const BFCategoryList = () => {
  const [categories] = useState(categoriesList)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  return (
    <div className="categories-container">
      <div className="categories-list">
        {categories.map((category) => (
          <div className={`outer-category ${category.name === selectedCategory.name ? 'active' : ''}`}>
            <div className="category-name" onClick={() => setSelectedCategory(category)}>
              {category.name}
            </div>
          </div>
        ))}
      </div>
      <div className="category-display">
        <div className="details">
          <p className="description">{selectedCategory.description}</p>
          <a href={selectedCategory.ctaUrl} className="cta">
            <span>Confira agora</span>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <g id="material-symbols:arrow-forward-rounded">
                  <path id="Vector" d="M14.4053 23.8297C14.1816 23.5998 14.0645 23.3071 14.054 22.9518C14.0442 22.5965 14.1511 22.3038 14.3748 22.0739L20.3523 15.9287H6.7199C6.37426 15.9287 6.08433 15.8083 5.85011 15.5675C5.6167 15.3275 5.5 15.0299 5.5 14.6746C5.5 14.3192 5.6167 14.0212 5.85011 13.7804C6.08433 13.5404 6.37426 13.4204 6.7199 13.4204H20.3523L14.3748 7.27522C14.1511 7.0453 14.0442 6.75267 14.054 6.39733C14.0645 6.042 14.1816 5.74937 14.4053 5.51944C14.6289 5.28952 14.9136 5.17456 15.2592 5.17456C15.6049 5.17456 15.8895 5.28952 16.1132 5.51944L24.1645 13.7967C24.2865 13.9012 24.3731 14.0316 24.4244 14.188C24.4748 14.3451 24.5 14.5073 24.5 14.6746C24.5 14.8418 24.4748 14.9985 24.4244 15.1449C24.3731 15.2912 24.2865 15.427 24.1645 15.5524L16.1132 23.8297C15.8895 24.0596 15.6049 24.1746 15.2592 24.1746C14.9136 24.1746 14.6289 24.0596 14.4053 23.8297Z" fill="white"/>
                </g>
              </svg>
            </i>
          </a>
        </div>
        <img src={selectedCategory.imgUrl} alt="" />

      </div>
    </div>
  )
}

export default BFCategoryList
