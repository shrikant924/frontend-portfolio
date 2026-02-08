import { FaShoppingCart } from 'react-icons/fa';
import './css/CartIcon.css';
import { useAppSelector } from '../app/hook';

const CartIcon = () => {
  const cartItems = useAppSelector((state) => state.productCart.items);
  return (
    <div className="cart-icon">
      <FaShoppingCart size={22} />
      {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
    </div>
  );
};

export default CartIcon;
