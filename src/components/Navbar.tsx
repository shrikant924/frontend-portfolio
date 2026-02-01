import { Link } from 'react-router-dom';
import './css/Navbar.css'
import Home from './Home';
import { useAuth } from '../context/AuthContext';
import CartIcon from './CartIcon';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar: React.FC = () => {

    const { isLoggedIn, logout } = useAuth();
    const cart = useContext(CartContext);

    return (
        <>
            <nav className="nav-container navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>ShopNow</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cart</a>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={"/addProduct"}>Add Product</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact US</a>
                            </li>
                            <Link to="/cart" className="nav-link position-relative">
                                <CartIcon count={cart?.count || 0} />
                            </Link>
                            <li className="nav-item">
                                {isLoggedIn ? (
                                    <Link
                                        className="nav-link"
                                        to="/"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Link>
                                ) : (
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <Home />

        </>
    )
}

export default Navbar;