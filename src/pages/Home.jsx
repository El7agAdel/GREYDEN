import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Greyden</h1>
          <p className="hero-subtitle">Specialty Coffee Crafted with Passion</p>
          <p className="hero-description">
            Experience the finest coffee beans sourced from around the world, 
            roasted to perfection, and brewed with care. Every cup tells a story.
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">Explore Our Menu</Link>
            <Link to="/order" className="btn btn-secondary">Order Now</Link>
            <a 
              href="https://maps.app.goo.gl/VBeFnjNY2e7GFeqQ9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              📍 Find Us
            </a>
            <a 
              href="https://www.instagram.com/greyden.eg/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              📷 Instagram
            </a>
          </div>
        </div>
      </section>

      {/* <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Greyden?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">☕</div>
              <h3>Premium Quality</h3>
              <p>Carefully selected beans from the world's best coffee regions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔥</div>
              <h3>Expert Roasting</h3>
              <p>Master roasters bring out the perfect flavor profile in every batch</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Sustainable Sourcing</h3>
              <p>Ethically sourced coffee that supports local farming communities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Handcrafted Brews</h3>
              <p>Each cup is crafted with precision and passion by our skilled baristas</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home

