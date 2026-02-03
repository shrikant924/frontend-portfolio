import './css/Home.css';
import { ProductCard } from "./ProductCard";
import { useFetchProductsQuery } from "../services/product";

const Home = () => {

    const {data:products} = useFetchProductsQuery();

    return (
        <>
            <div className="main-container">
                {Array.isArray(products) && products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))
                }
            </div>
        </>
    )
}

export default Home;