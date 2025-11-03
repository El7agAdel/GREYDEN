import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/GREYDEN" className="navbar-brand">
          <img  src={`${import.meta.env.BASE_URL}logo2.png`}  alt="Greyden Coffee Logo"  className="navbar-logo" />
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/GREYDEN" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="navbar-link">Menu</Link>
          </li>
          <li>
            <Link to="/order" className="navbar-link">Order</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

