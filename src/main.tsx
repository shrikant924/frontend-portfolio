import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Provider } from 'react-redux';
import { store } from './app/store';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Provider>

  </BrowserRouter>
)
