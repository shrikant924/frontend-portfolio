import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  useAddProductMutation,
  useUpdateProductByIdMutation,
  useFetchProductByIdQuery,
} from '../features/product/productApi';

export const AddProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const { data: product, isLoading } = useFetchProductByIdQuery(Number(id), {
    skip: !isEdit,
  });

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductByIdMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formState, setFormState] = useState({
    brand: '',
    category: '',
    description: '',
    discount: '',
    name: '',
    originalPrice: '',
    price: '',
    rating: '',
    reviews: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormState({
        brand: product.brand,
        category: product.category,
        description: product.description,
        discount: product.discount.toString(),
        name: product.name,
        originalPrice: product.originalPrice.toString(),
        price: product.price.toString(),
        rating: product.rating.toString(),
        reviews: product.reviews.toString(),
        stock: product.stock.toString(),
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append(
        'product',
        new Blob(
          [
            JSON.stringify({
              ...formState,
              price: Number(formState.price),
              discount: Number(formState.discount),
              originalPrice: Number(formState.originalPrice),
              rating: Number(formState.rating),
              reviews: Number(formState.reviews),
              stock: Number(formState.stock),
            }),
          ],
          { type: 'application/json' },
        ),
      );

      if (selectedFile) {
        formData.append('imageFile', selectedFile);
      }

      if (isEdit) {
        await updateProduct({ id, formData }).unwrap();
        alert('Product updated');
      } else {
        await addProduct(formData).unwrap();
        alert('Product added');
      }

      navigate('/');
    } catch {
      alert('Operation failed');
    }
  };

  if (isEdit && isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Brand */}
          <input
            name="brand"
            value={formState.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Name */}
          <input
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded px-3 py-2  focus:outline-none  focus:ring-2 focus:ring-blue-500"
          />

          {/* Price */}
          <input
            name="price"
            value={formState.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Original Price */}
          <input
            name="originalPrice"
            value={formState.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Stock */}
          <input
            name="stock"
            value={formState.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* File Upload */}
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none"
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={isAdding || isUpdating}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 focus:outline-none"
          >
            {isAdding || isUpdating ? 'Processing...' : isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};
