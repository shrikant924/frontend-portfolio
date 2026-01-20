import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import RegistrationFrom from './pages/RegistrationForm'
import Login from './pages/Login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ShowStudent/> */}
    {/* <RegistrationFrom/> */}
    <Login />
  </StrictMode>,
)
