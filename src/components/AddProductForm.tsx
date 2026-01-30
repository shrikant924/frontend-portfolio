import { useState } from 'react'
import './css/AddProductForm.css'
import axios from 'axios'

export const AddProductForm = () => {

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

    const addProduct = async () => {

        const payload = {
            ...productData,
            price:Number(productData.price),
            discount:Number(productData.discount),
            originalPrice:Number(productData.originalPrice),
            rating:Number(productData.rating),
            reviews:Number(productData.reviews),
            stock:Number(productData.stock)
        }
        const response = await axios.post("http://localhost:8080/product/addProduct", payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })

        console.log(response);
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
                    <h1>Add product</h1>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="brand">Brand : </label>
                    <input className="form-control" type="text" onChange={handleChange} name="brand" value={productData.brand} />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <label htmlFor="category">Select  Category : </label>
                    <select name="category" id="category">
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

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="product-img">Image :</label>
                    <input className="form-control" type="file" name="image" id="pic" />
                </div>

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
                    <button type="button" className='btn btn-success' onClick={addProduct}>Add Product</button>
                </div>
            </div>
        </>
    )
}