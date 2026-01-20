import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegistrationFrom from './pages/RegistrationForm'
import EditUserDetailsFrom from './pages/EditUserForm'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ShowStudent/> */}
    <EditUserDetailsFrom />
    {/* <RegistrationFrom /> */}
    {/* <Login /> */}
  </StrictMode>,
)
