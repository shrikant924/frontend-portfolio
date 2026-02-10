import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../app/hook';

const CartIcon = () => {
  const cartItems = useAppSelector((state) => state.productCart.items);
  return (
    <div className="relative cart-icon">
      <FaShoppingCart size={22} />
      {cartItems.length > 0 && (
        <span className="flex items-center justify-center cart-badge absolute -right-3 -top-4 text-white  bg-red-500 rounded-full w-5 h-5 ">
          {cartItems.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
