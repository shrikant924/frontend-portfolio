import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>

  </BrowserRouter>
)
