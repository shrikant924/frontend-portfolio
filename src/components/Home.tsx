import { useState } from 'react';
import { useFetchProductsQuery } from '../features/product/productApi';
import { ProductCard } from './ProductCard';

const Home = () => {
  const [page, setPage] = useState(0);
  const { data: products, isLoading, error } = useFetchProductsQuery(page);

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

  // ✅ THIS RETURN WAS MISSING
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 box-border">
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
        {products?.content?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {products?.page! + 1} of {products?.totalPages}
        </span>

        <button
          disabled={page === products?.totalPages! - 1}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}
      <div className="flex gap-4 flex-row items-center justify-center mt-5 ">
        {Array.from({ length: products?.totalPages || 0 }).map((_, i) => (
          <button
            className=" px-4 bg-blue-400 rounded-sm text-shadow-blue-400 text-shadow-xs hover:bg-cyan-50"
            key={i}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Empty state */}
      {products?.content?.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-10">No products available</div>
      )}
    </div>
  );
};

export default Home;
