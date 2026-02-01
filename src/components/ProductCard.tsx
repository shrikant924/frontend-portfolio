import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CartContext, CartProvider } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export const ProductCard = ({ product }: any) => {

    const [imageUrl, setImageUrl] = useState<string>("")
    const [productPurchaseQty, setProductPurchaseQty] = useState(1);
    const [balancedStock, setBalancedStock] = useState();

    const navigate = useNavigate();

    const cart = useContext(CartContext);
    useEffect(() => {
        loadImageFromDB()
    }, [product.id])

    const handleDelete = async () => {
        const res= await axios.delete(`http://localhost:8080/product/delete/${product.id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        alert(res.data);
    }

    const addToCartProduct = async () => {
        const response = await axios.post(`http://localhost:8080/product/addToCart/${product.id}/${productPurchaseQty}`, null,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }
        )

        setBalancedStock(response.data)
        console.log(balancedStock)
    }

    const handleCart = () => {
        cart?.increaseCount();
        addToCartProduct();
    }

    const handleEdit = () => {
        navigate(`/editProduct/${product.id}`)
    }

    const loadImageFromDB = async () => {
        const response = await axios.get(
            `http://localhost:8080/product/image/${product.id}`,
            {
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }
        )
        const blob = new Blob([response.data], { type: "image/jpeg" })
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
    }

    return (
        <CartProvider>
            <div className="card-wrapper" >
                <div className="d-flex align-items-center justify-content-evenly w-100">
                    <div onClick={handleEdit}>
                        <i className="bi bi-pencil-square fs-1" ></i>
                    </div>
                    <div onClick={handleDelete}>
                        <i className="bi bi-trash fs-1"></i>
                    </div>
                </div>
                <div className="image-logo">
                    <img src={imageUrl} alt="not found" />
                </div>
                <div className="brand">{product.brand}</div>
                <div className="description">{product.description}</div>
                <div className="price">
                    <label>Price :</label> {product.price} Rupees
                </div>
                <div className="stock">
                    <label>Stock :</label> {product.stock - productPurchaseQty} Qty
                </div>
                <div className="product-qty align-items-center d-flex gap-md-2 justify-content-center product-qty"><button className="btn btn-sm btn-outline-primary" disabled={product.stock === 0 || productPurchaseQty >= product.stock} onClick={() => setProductPurchaseQty(productPurchaseQty + 1)}>+</button>

                    <span>{productPurchaseQty}</span>

                    <button className="btn btn-sm btn-outline-danger" disabled={productPurchaseQty <= 1} onClick={() => setProductPurchaseQty(productPurchaseQty - 1)}>-</button>

                </div>
                <div>
                    <button className="btn btn-outline-danger" onClick={handleCart} >Add to cart</button>
                </div>
            </div>
        </CartProvider>
    )
}
