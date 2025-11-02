import { useState, useEffect } from 'react'
import menuData from '../../data/menu.json'
import './Menu.css'

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    // Set first category as default
    if (menuData.categories.length > 0) {
      setSelectedCategory(menuData.categories[0].id)
    }
  }, [])

  const filteredDrinks = selectedCategory
    ? menuData.drinks.filter(drink => drink.category === selectedCategory)
    : menuData.drinks

  return (
    <div className="menu-page">
      <div className="menu-header">
        {/* <h1>Our Menu</h1>
        <p>Discover our carefully crafted selection of beverages and treats</p> */}
      </div>

      <div className="menu-container">
        <div className="category-sidebar">
          <h2>Categories</h2>
          <ul className="category-list">
            {menuData.categories.map(category => (
              <li key={category.id}>
                <button
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-content">
          {selectedCategory && (
            <div className="category-info">
              <h2>{menuData.categories.find(c => c.id === selectedCategory)?.name}</h2>
              <p>{menuData.categories.find(c => c.id === selectedCategory)?.description}</p>
            </div>
          )}
          
          <div className="drinks-grid">
            {filteredDrinks.map(drink => (
              <div key={drink.id} className="drink-card">
                <div className="drink-info">
                  <h3>{drink.name}</h3>
                  <p className="drink-description">{drink.description}</p>
                  {drink.sizes && drink.sizes.length > 0 ? (
                    <div className="drink-sizes">
                      {drink.sizes.map((sizeOption, idx) => (
                        <div key={idx} className="size-option">
                          <span className="size-label">{sizeOption.size} oz</span>
                          <span className="size-price">EGP {sizeOption.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="drink-price">EGP {drink.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu

