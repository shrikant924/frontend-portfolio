import axios from "axios";
import { useEffect, useState } from "react";
import './css/Home.css';
import { ProductCard } from "./ProductCard";

const Home = () => {
    type Product = {
        id: number,
        brand: string,
        category: string,
        description: string,
        discount: number,
        name: string,
        originalPrice: number,
        price: number,
        rating: number,
        reviews: number,
        stock: number
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [addToCartProducts, setSAddToCartProducts] = useState({
        id:"",
        qty:""
    })
    useEffect(() => {
        const showData = async () => {
            const res = await axios.get("http://localhost:8080/product/getProducts"
                ,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            )
            setProducts(res.data)
        }
        showData()

    }, [])

    return (
        <>
            <div className="main-container">
                {products.map(product => (
                    <ProductCard product={product} />
                ))
                }
            </div>
        </>
    )
}

export default Home;