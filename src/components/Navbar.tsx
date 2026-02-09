import { Link } from 'react-router-dom';
import Home from './Home';
import CartIcon from './CartIcon';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hook';
import { productApi } from '../features/product/productApi';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.token);

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
                <Link to="/categories" className="hover:text-blue-600 transition">
                  Categories
                </Link>
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
