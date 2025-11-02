import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState({})

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('greydenCart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart:', e)
        navigate('/order')
      }
    } else {
      // If no cart, redirect to order page
      navigate('/order')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^[0-9\s]{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid card number'
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required'
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the order to your backend
      console.log('Order submitted:', { cart, formData })
      
      // Clear cart after successful order
      localStorage.removeItem('greydenCart')
      
      // Show success message (you could create a success page or modal)
      alert('Order placed successfully! Thank you for your order.')
      
      // Redirect to home page
      navigate('/')
    }
  }

  const getTotalPrice = () => {
    // Prices include 16% tax
    return cart.reduce((total, item) => total + item.price, 0)
  }
  
  const getSubtotal = () => {
    // Prices include tax, so subtotal = total / 1.16
    const total = getTotalPrice()
    return total / 1.16
  }
  
  const getTax = () => {
    // Tax = total - subtotal = total - (total / 1.16) = total * (16/116)
    const total = getTotalPrice()
    return total * (16 / 116)
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || v
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData({
      ...formData,
      cardNumber: formatted
    })
  }

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setFormData({
      ...formData,
      expiryDate: value
    })
  }

  if (cart.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-main">
          <h1>Checkout</h1>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <section className="form-section">
              <h2>Contact Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+20 123 456 7890"
                  autoComplete="tel"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john@example.com"
                  autoComplete="email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </section>

            <section className="form-section">
              <h2>Delivery Address</h2>
              
              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="123 Main Street"
                  autoComplete="street-address"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  placeholder="Cairo"
                  autoComplete="address-level2"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Information</h2>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  autoComplete="cc-number"
                  inputMode="numeric"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={errors.cardName ? 'error' : ''}
                  placeholder="John Doe"
                  autoComplete="cc-name"
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/YY"
                    maxLength="5"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength="4"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
            </section>

            <div className="form-actions">
              <button type="button" className="back-btn" onClick={() => navigate('/order')}>
                Back to Order
              </button>
              <button type="submit" className="submit-btn">
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p>EGP {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>EGP {getSubtotal().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax (16%):</span>
              <span>EGP {getTax().toFixed(2)}</span>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <span>EGP {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

