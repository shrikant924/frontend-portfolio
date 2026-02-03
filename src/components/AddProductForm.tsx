import { useEffect, useState } from 'react'
import './css/AddProductForm.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const AddProductForm = () => {

    const { id } = useParams();

    const [productData, setProductData] = useState({
        brand: "",
        category: "",
        description: "",
        discount: "",
        image: "",
        name: "",
        originalPrice: "",
        price: "",
        rating: "",
        reviews: "",
        stock: ""
    })

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const isEdit = !!id;

    useEffect(() => {
        const fetchProduct = async () => {
            if (isEdit) {
                const response = await axios.get(`http://localhost:8080/product/get/${id}`, {

                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }

                });
                setProductData({
                    ...response.data,
                    image: response.data.imageData
                });
            }
        }
        fetchProduct();
    }, [id, isEdit])

    const formData = new FormData();

    const addProduct = async () => {
        formData.append(
            "product",
            new Blob(
                [JSON.stringify({
                    ...productData,
                    price: Number(productData.price),
                    discount: Number(productData.discount),
                    originalPrice: Number(productData.originalPrice),
                    rating: Number(productData.rating),
                    reviews: Number(productData.reviews),
                    stock: Number(productData.stock)
                })],
                { type: "application/json" }
            )
        );

        // FILE part
        if (selectedFile) {
            formData.append("imageFile", selectedFile);
        }



        const response = await axios({
            method: isEdit ? "put" : "post",
            url: isEdit
                ? `http://localhost:8080/product/updateProduct/${id}`
                : "http://localhost:8080/product/addProduct",
            data: formData,
            headers: {
              
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        });


        alert(response.data)
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }
    return (
        <>
            <div className="form-wrapper">
                <div className="form-heading">
                    <h1>{id ? "Edit Product" : "Add product"}</h1>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="brand">Brand : </label>
                    <input className="form-control" type="text" onChange={handleChange} name="brand" value={productData.brand} />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="category">Select  Category : </label>
                    <select name="category" id="category" value={productData.category} onChange={handleChange}>
                        <option value="electronic">Electronic</option>
                        <option value="cloths">Cloths</option>
                        <option value="houseHolds">HouseHolds</option>
                        <option value="electrical">Electrical</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" id="description" onChange={handleChange} cols="30" rows="5" value={productData.description}></textarea>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="discount">Discount : </label>
                    <input className="form-control" type="number" onChange={handleChange} name="discount" value={productData.discount}></input>
                </div>

                <input className="form-control" type="file" name="imageFile" onChange={handleFileChange} id="pic" />

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="product-name">Name : </label>
                    <input className="form-control" onChange={handleChange} type="text" name="name" value={productData.name} id="product-name" />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="product-original-price">Original price : </label>
                    <input className="form-control" type="text" onChange={handleChange} name='originalPrice' value={productData.originalPrice}></input>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="product-price">Price : </label>
                    <input className="form-control" type="text" onChange={handleChange} name='price' value={productData.price}></input>
                </div>
                <div className="d-flex justify-content-between align-items-center">

                    <label htmlFor="product-rating">Rating : </label>
                    <input className="form-control" type="text" onChange={handleChange} name='rating' value={productData.rating}></input>
                </div>

                <div className=" d-flex justify-content-between align-items-center">
                    <label htmlFor="product-review">review : </label>
                    <input className="form-control" type="text" onChange={handleChange} name='reviews' value={productData.reviews}></input>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="product-stock">stock : </label>
                    <input className="form-control" onChange={handleChange} type="text" name='stock' value={productData.stock}></input>
                </div>

                <div className="addProductBtn d-flex justify-content-center align-items-center">
                    <button type="button" className='btn btn-success' onClick={addProduct}>{id ? "Update product" : "Add Product"}</button>
                </div>
            </div>
        </>
    )
}