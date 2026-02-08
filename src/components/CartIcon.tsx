import { FaShoppingCart } from 'react-icons/fa';
import './css/CartIcon.css';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const count = useSelector((state: any) => state.cart.count);
  return (
    <div className="cart-icon">
      <FaShoppingCart size={22} />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </div>
  );
};

export default CartIcon;
