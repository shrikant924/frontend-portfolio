import { FaShoppingCart } from "react-icons/fa";
import './css/CartIcon.css'

const CartIcon = ({ count }: { count: number }) => {
  return (
    <div className="cart-icon">
      <FaShoppingCart size={22} />
      {count > 0 && <span className="cart-badge">{count}</span>}
    </div>
  );
};

export default CartIcon;
