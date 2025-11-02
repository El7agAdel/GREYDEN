import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import menuData from '../../data/menu.json'
import './Order.css'

function Order() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedSizes, setSelectedSizes] = useState({})
  const [notification, setNotification] = useState(null)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('greydenCart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart:', e)
      }
    }
    
    if (menuData.categories.length > 0) {
      setSelectedCategory(menuData.categories[0].id)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('greydenCart', JSON.stringify(cart))
  }, [cart])

  // Auto-hide notification: fade in (0.5s) + show (2s) + fade out (0.5s) = 3s total
  useEffect(() => {
    if (notification) {
      // Start fade out after 2.5 seconds (0.5s fade in + 2s visible)
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true)
      }, 2500)
      
      // Remove notification after fade out completes (0.5s after fade out starts)
      const removeTimer = setTimeout(() => {
        setNotification(null)
        setIsFadingOut(false)
      }, 3000)
      
      return () => {
        clearTimeout(fadeOutTimer)
        clearTimeout(removeTimer)
      }
    }
  }, [notification])

  const filteredDrinks = selectedCategory
    ? menuData.drinks.filter(drink => drink.category === selectedCategory)
    : []

  const handleSizeSelect = (drinkId, size) => {
    setSelectedSizes({
      ...selectedSizes,
      [drinkId]: size
    })
  }

  const addToCart = (drink) => {
    // Check if drink has sizes
    if (drink.sizes && drink.sizes.length > 0) {
      let sizeToUse = selectedSizes[drink.id]
      
      // For Hot Coffee and Hot Non-Coffee, default to 12oz if not selected
      if (!sizeToUse && (drink.category === 'Hot Coffee' || drink.category === 'Hot Non-Coffee')) {
        const twelveOzSize = drink.sizes.find(s => s.size === 12)
        if (twelveOzSize) {
          sizeToUse = 12
        }
      }
      
      // If still no size selected, use first available
      if (!sizeToUse) {
        sizeToUse = drink.sizes[0].size
      }
      
      const sizeOption = drink.sizes.find(s => s.size === sizeToUse)
      if (sizeOption) {
        const cartItem = {
          ...drink,
          id: `${drink.id}-${Date.now()}`,
          selectedSize: sizeOption.size,
          price: sizeOption.price,
          name: `${drink.name} (${sizeOption.size} oz)`
        }
        setCart([...cart, cartItem])
        // Show notification
        setIsFadingOut(false)
        setNotification({ message: `${drink.name} added to cart!`, itemName: drink.name })
      }
    } else {
      // No sizes, add as is
      setCart([...cart, { ...drink, id: `${drink.id}-${Date.now()}` }])
      // Show notification
      setIsFadingOut(false)
      setNotification({ message: `${drink.name} added to cart!`, itemName: drink.name })
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const getTotalPrice = () => {
    // Prices include 14% tax, so calculate subtotal and tax
    return cart.reduce((total, item) => total + item.price, 0)
  }
  
  const getSubtotal = () => {
    // Prices include tax, so subtotal = total / 1.14
    const total = getTotalPrice()
    return total / 1.14
  }
  
  const getTax = () => {
    // Tax = total - subtotal = total - (total / 1.14) = total * (14/114)
    const total = getTotalPrice()
    return total * (14 / 114)
  }

  return (
    <div className="order-page">
      <div className="order-header">
        {/* <h1>Place Your Order</h1>
        <p>Select from our delicious menu and build your order</p> */}
      </div>

      <div className="order-container">
        <div className="order-main">
          <div className="category-tabs">
            {menuData.categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="selected-category-info">
            {selectedCategory && (
              <>
                <h2>{menuData.categories.find(c => c.id === selectedCategory)?.name}</h2>
                <p>{menuData.categories.find(c => c.id === selectedCategory)?.description}</p>
              </>
            )}
          </div>

          <div className="drinks-selection">
            {filteredDrinks.map(drink => (
              <div key={drink.id} className="drink-item">
                <div className="drink-details">
                  <h3>{drink.name}</h3>
                  <p className="drink-desc">{drink.description}</p>
                  {drink.sizes && drink.sizes.length > 0 ? (
                    <div className="size-selection">
                      <div className="size-buttons">
                        {drink.sizes.map((sizeOption, idx) => {
                          // Check if this size is explicitly selected by user
                          const isExplicitlySelected = selectedSizes[drink.id] === sizeOption.size
                          return (
                            <button
                              key={idx}
                              className={`size-btn ${isExplicitlySelected ? 'selected' : ''}`}
                              onClick={() => handleSizeSelect(drink.id, sizeOption.size)}
                            >
                              {sizeOption.size} oz - EGP {sizeOption.price.toFixed(2)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="drink-price">EGP {drink.price.toFixed(2)}</p>
                  )}
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(drink)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="order-cart">
          <div className="cart-header">
            <h2>Your Order</h2>
            <span className="cart-count">{cart.length} items</span>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>EGP {item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="cart-total">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>EGP {getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (14%):</span>
                    <span>EGP {getTax().toFixed(2)}</span>
                  </div>
                  <div className="total-row total">
                    <span>Total:</span>
                    <span>EGP {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="checkout-btn" 
                  disabled={cart.length === 0}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {notification && (
        <div className={`cart-notification ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <div className="cart-notification-content">
            <svg className="cart-notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="cart-notification-text">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order

