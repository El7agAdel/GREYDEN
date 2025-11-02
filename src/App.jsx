import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Checkout from './pages/Checkout'
import './App.css'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname])

  useEffect(() => {
    if (location !== displayLocation) {
      // Prevent scrollbar flash during transition
      document.body.style.overflow = 'hidden'
      // Reset scroll before transition
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      setTransitionStage('fadeOut')
    }
  }, [location, displayLocation])

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('fadeIn')
        // Ensure scroll is at top after transition
        setTimeout(() => {
          window.scrollTo(0, 0)
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          // Re-enable scrolling after transition
          document.body.style.overflow = ''
        }, 50)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [transitionStage, location])

  return (
    <div className="App">
      <Navbar />
      <div className={`page-content page-content-${transitionStage}`}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

