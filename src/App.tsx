import { Route, Routes } from 'react-router-dom';
import RegistrationFrom from './pages/RegistrationForm';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { AddProductForm } from './components/AddProductForm';
import { Cart } from './components/Cart';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/register" element={<RegistrationFrom />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<AddProductForm />} />
      <Route path="/editProduct/:id" element={<AddProductForm />} />
      <Route path="/cart" element={<Cart />}></Route>
      {/* <Route path='/edit' element={<EditUserFrom />} />
      <Route path='/student' element={<Student/>}/>
      <Route path='/test' element={<Test />} /> */}
    </Routes>
  );
};

export default App;
