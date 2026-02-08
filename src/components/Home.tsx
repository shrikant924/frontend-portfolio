import { useFetchProductsQuery } from '../features/product/productApi';
import { ProductCard } from './ProductCard';
import './css/Home.css';

const Home = () => {
  const { data: products, isLoading, error } = useFetchProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="main-container">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
