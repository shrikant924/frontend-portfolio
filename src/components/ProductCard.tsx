import { useNavigate } from 'react-router-dom';
import {
  useAddProductToCartByIdAndQtyMutation,
  useDeleteProductByIdMutation,
  useGetProductImageQuery,
} from '../features/product/productApi';
import { useAppDispatch } from '../app/hook';
import { addToCart } from '../features/product/productSlice';
import { useState } from 'react';
import { increaseCount } from '../features/cart/cartSlice';

export const ProductCard = ({ product }: any) => {
  const [deleteProductById] = useDeleteProductByIdMutation();
  const [addProductToCart] = useAddProductToCartByIdAndQtyMutation();

  const [productPurchaseQty, setProductPurchaseQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: imageUrl, isLoading } = useGetProductImageQuery(product.id);

  const handleDelete = async () => {
    try {
      await deleteProductById(product.id).unwrap();
      alert('Product deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const addToCartProduct = async () => {
    try {
      const qty = productPurchaseQty || 1;

      await addProductToCart({
        id: product.id,
        qty,
      }).unwrap();

      dispatch(
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl,
          qty,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = () => {
    addToCartProduct();
    dispatch(increaseCount());
  };

  const handleEdit = () => {
    navigate(`/editProduct/${product.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300 flex flex-col">
      {/* Edit/Delete */}
      <div className="flex justify-between mb-2">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 text-xl"
          title="Edit"
        >
          ✏️
        </button>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-xl"
          title="Delete"
        >
          🗑️
        </button>
      </div>

      {/* Image */}
      <div className="flex justify-center items-center h-40 mb-3">
        {isLoading ? (
          <span className="text-gray-400 animate-pulse">Loading...</span>
        ) : (
          <img src={imageUrl} alt={product.name} className="max-h-40 object-contain" />
        )}
      </div>

      {/* Brand */}
      <h3 className="text-lg font-semibold text-gray-800">{product.brand}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>

      {/* Price */}
      <div className="text-lg font-bold text-blue-600 mb-1">₹{product.price}</div>

      {/* Stock */}
      <div className="text-sm text-gray-500 mb-3">
        Stock: {product.stock > 0 ? product.stock - productPurchaseQty : 0}
      </div>

      {/* Quantity Controls */}
      <div className="flex justify-center items-center gap-3 mb-3">
        <button
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={productPurchaseQty <= 1}
          onClick={() => setProductPurchaseQty(productPurchaseQty - 1)}
        >
          −
        </button>

        <span className="font-semibold">{productPurchaseQty}</span>

        <button
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={product.stock === 0 || productPurchaseQty >= product.stock}
          onClick={() => setProductPurchaseQty(productPurchaseQty + 1)}
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        disabled={product.stock <= 0}
        onClick={handleCart}
      >
        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};
