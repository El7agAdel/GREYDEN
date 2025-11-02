import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const ensureViewport = () => {
  const content =
    'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover'
  const existing = document.querySelector('meta[name="viewport"]')

  if (existing) {
    existing.setAttribute('content', content)
  } else {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = content
    document.head.appendChild(meta)
  }
}

ensureViewport()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
