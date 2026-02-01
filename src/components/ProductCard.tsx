import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CartContext, CartProvider } from "../context/CartContext"

export const ProductCard = ({ product }: any) => {

    const [imageUrl, setImageUrl] = useState<string>("")
    const [productPurchaseQty, setProductPurchaseQty] = useState(1);


    const cart = useContext(CartContext);
    useEffect(() => {
        loadImageFromDB()
    }, [product.id])

    const addToCartProduct = () =>{

        
    }

    const handleCart = () =>{
        cart?.increaseCount();
        addToCartProduct();
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
            <div className="card-wrapper">
                <div className="image-logo">
                    <img src={imageUrl} alt="not found" />
                </div>
                <div className="brand">{product.brand}</div>
                <div className="description">{product.description}</div>
                <div className="price">
                    <label>Price :</label> {product.price} Rupees
                </div>
                <div className="stock">
                    <label>Stock :</label> {product.stock} Qty
                </div>
                <div className="product-qty align-items-center d-flex gap-md-2 justify-content-center product-qty"><button className="btn btn-sm btn-outline-primary" onClick={() => setProductPurchaseQty(productPurchaseQty + 1)}>+</button>

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
