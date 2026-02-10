import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import CartIcon from './CartIcon';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { productApi } from '../features/product/productApi';
import { Dropdown } from './Dropdown';
import { showPopUp } from '../features/popup/popUpSlice';
import { Popup } from './Popup';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            ShopNow
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-6 text-gray-700 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>

              <li>
                <Dropdown />
              </li>

              <li>
                <Link to="/cart" className="hover:text-blue-600 transition">
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/addProduct" className="hover:text-blue-600 transition">
                  Add Product
                </Link>
              </li>

              <li>
                <Link to="/contact_us" className="hover:text-blue-600 transition">
                  Contact Us
                </Link>
              </li>

              {/* Cart Icon */}
              <li>
                <Link to="/cart" className="hover:text-blue-600">
                  <CartIcon />
                </Link>
              </li>

              {/* Auth */}
              <li>
                {token ? (
                  <button
                    onClick={() => {
                      dispatch(logout());
                      dispatch(productApi.util.resetApiState());
                      dispatch(
                        showPopUp({
                          message: 'Logged out successfully...',
                          type: 'success',
                        }),
                      );
                      navigate('/');
                    }}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>

            {/* Search */}
            <form className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Home />
    </>
  );
};

export default Navbar;
