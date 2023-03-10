import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartContextProvider } from "@/features/cart"
import './index.css'

import { AuthContextProvider } from '@/features/auth'
import { ModalsContextProvider } from './features/modals'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <ModalsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalsContextProvider>          
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
