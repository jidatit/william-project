import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from '../AuthContext.jsx'
import { ListingProvider } from '../listingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ListingProvider>
        <App />
      </ListingProvider>
    </AuthProvider>
  </React.StrictMode>,
)