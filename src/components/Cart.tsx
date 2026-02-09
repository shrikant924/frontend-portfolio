import { useAppSelector } from '../app/hook';

export const Cart = () => {
  const items = useAppSelector((state) => state.productCart.items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-xl font-semibold">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              {/* Product Info */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  <span className="text-gray-500">Product:</span> {item.name}
                </h2>

                <h2 className="text-lg font-semibold text-gray-800">
                  <span className="text-gray-500">Price:</span> ₹{item.price}
                </h2>

                <h2 className="text-lg font-semibold text-gray-800">
                  <span className="text-gray-500">Quantity:</span> {item.qty}
                </h2>
              </div>

              {/* Total */}
              <div className="text-xl font-bold text-blue-600">₹{item.price * item.qty}</div>
              <div className="flex flex-column">
                <button className="mx-1 my-2 animate-none rounded border-2 border-solid border-black bg-red-600 pt-1 pr-3 pb-1 pl-3 font-bold text-white shadow-indigo-950 hover:shadow-2xs">
                  Remove
                </button>

                <button className="mx-1 my-2 animate-none rounded border-2 border-solid border-black bg-green-600 pt-1 pr-3 pb-1 pl-3 font-bold text-white shadow-indigo-950 hover:shadow-2xs">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
