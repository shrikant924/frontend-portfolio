import React, { useState } from 'react';
import { useAddProductToCartByIdAndQtyMutation } from '../features/product/productApi';
import { useLocation, useNavigate } from 'react-router-dom';

export const OrderShippingDetails = () => {
  const [addToCart] = useAddProductToCartByIdAndQtyMutation();
  const location = useLocation();
  const { userId, productId, productQty } = location.state || {};
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    fistName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addToCart({
      userId,
      productId: productId,
      productQty: productQty,
    }).unwrap();

    navigate('/orderStatus');
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Shipping Address</h2>
            <p className="text-gray-500 mt-1">Please fill your details to receive your order</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="fistName"
                value={shippingDetails.fistName}
                onChange={handleInput}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="firstName"
                className="absolute left-3 top-2 text-gray-500 text-sm
              transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                First Name
              </label>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={shippingDetails.lastName}
                onChange={handleInput}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="lastName"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                Last Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInput}
                id="email"
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                Email Address
              </label>
            </div>

            {/* Mobile */}
            <div className="relative">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={shippingDetails.mobile}
                onChange={handleInput}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="mobile"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                Mobile Number
              </label>
            </div>

            {/* Address */}
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInput}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="address"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                Address
              </label>
            </div>

            {/* City & State row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleInput}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <label
                  htmlFor="city"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-blue-500"
                >
                  City
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleInput}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <label
                  htmlFor="state"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-blue-500"
                >
                  State
                </label>
              </div>
            </div>

            {/* Zip */}
            <div className="relative">
              <input
                type="text"
                id="zip"
                placeholder=" "
                name="zip"
                value={shippingDetails.zip}
                onChange={handleInput}
                className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <label
                htmlFor="zip"
                className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-500"
              >
                Zip Code
              </label>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit Shipping Details
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
