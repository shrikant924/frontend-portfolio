import { useNavigate } from "react-router-dom";
import {
  useAddProductToCartByIdAndQtyMutation,
  useDeleteProductByIdMutation,
  useGetProductImageQuery,
} from "../features/product/productApi";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../features/product/productSlice";
import "./css/AddProductForm.css";

export const ProductCard = ({ product }: any) => {
  const [deleteProductById] = useDeleteProductByIdMutation();
  const [addProductToCart] = useAddProductToCartByIdAndQtyMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: imageUrl, isLoading } = useGetProductImageQuery(product.id);

  // FIX: get qty for THIS product only
  const purchaseQty = useAppSelector(
    (state) =>
      state.productCart.items.find((item) => item.productId === product.id)
        ?.qty || 0,
  );

  const handleDelete = async () => {
    try {
      await deleteProductById(product.id).unwrap();
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const addToCartProduct = async () => {
    try {
      const qty = purchaseQty || 1;

      const response = await addProductToCart({
        id: product.id,
        qty,
      }).unwrap();

      // update redux cart state
      dispatch(
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl,
          qty,
        }),
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = () => {
    addToCartProduct();
  };

  const handleEdit = () => {
    navigate(`/editProduct/${product.id}`);
  };

  return (
    <div className="card-wrapper">
      <div className="d-flex align-items-center justify-content-evenly w-100">
        <div onClick={handleEdit}>
          <i className="bi bi-pencil-square fs-1"></i>
        </div>

        <div onClick={handleDelete}>
          <i className="bi bi-trash fs-1"></i>
        </div>
      </div>

      <div className="image-logo">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <img src={imageUrl} alt="not found" />
        )}
      </div>

      <div className="brand">{product.brand}</div>

      <div className="description">{product.description}</div>

      <div className="price">
        <label>Price :</label> {product.price} Rupees
      </div>

      <div className="stock">
        <label>Stock :</label> {product.stock - purchaseQty} Qty
      </div>

      <div className="product-qty align-items-center d-flex gap-md-2 justify-content-center product-qty">
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={product.stock === 0 || purchaseQty >= product.stock}
          onClick={() => dispatch(increaseQty(product.id))}
        >
          +
        </button>

        <span>{purchaseQty}</span>

        <button
          className="btn btn-sm btn-outline-danger"
          disabled={purchaseQty <= 1}
          onClick={() => dispatch(decreaseQty(product.id))}
        >
          -
        </button>
      </div>

      <div>
        <button className="btn btn-outline-danger" onClick={handleCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};
