import { Route, Routes } from 'react-router-dom';
import RegistrationFrom from './pages/RegistrationForm';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AddProductForm } from './components/AddProductForm';
import { Cart } from './components/Cart';
import Contact from './pages/Contact';
import { Dropdown } from './components/Dropdown';
import { Popup } from './components/Popup';

const App: React.FC = () => {
  return (
    <>
      <Popup />
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/register" element={<RegistrationFrom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/editProduct/:id" element={<AddProductForm />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/contact_us" element={<Contact />}></Route>
        <Route path="/categories" element={<Dropdown />} />
      </Routes>
    </>
  );
};

export default App;
