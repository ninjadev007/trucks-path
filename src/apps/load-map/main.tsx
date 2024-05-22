import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

const root = document.createElement('div')
root.id = 'trucker-load-map-root'
document.body.append(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)