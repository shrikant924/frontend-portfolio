import { useFetchProductsQuery } from '../features/product/productApi';
import { ProductCard } from './ProductCard';

const Home = () => {
  const { data: products, isLoading, error } = useFetchProductsQuery();

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-red-500">Something went wrong</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>

      {/* Product Grid */}
      <div
        className="max-w-7xl mx-auto grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4"
      >
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty state */}
      {products?.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-10">No products available</div>
      )}
    </div>
  );
};

export default Home;
