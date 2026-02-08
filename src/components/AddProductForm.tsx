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

  // Fetch single product only in edit mode
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

  // ✅ Populate form in edit mode
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
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
        await updateProduct({
          id: id,
          formData,
        }).unwrap();

        alert('Product updated');
      } else {
        await addProduct(formData).unwrap();

        alert('Product added');
      }

      navigate('/');
    } catch (error) {
      alert('Operation failed');
    }
  };

  if (isEdit && isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>

      <input name="brand" value={formState.brand} onChange={handleChange} placeholder="Brand" />

      <input name="name" value={formState.name} onChange={handleChange} placeholder="Name" />

      <input name="price" value={formState.price} onChange={handleChange} placeholder="Price" />

      <input name="stock" value={formState.stock} onChange={handleChange} placeholder="stock" />

      <input
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="description"
      />

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleSubmit} disabled={isAdding || isUpdating}>
        {isEdit ? 'Update' : 'Add'}
      </button>
    </div>
  );
};
