import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Signup() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialRole = queryParams.get("role") || "";

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    blockchainWallet: "",
    userType: initialRole,
    specialization: "",
    licenseNumber: "",
    hospital: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: initialRole }));
  }, [initialRole]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      blockchainWallet: formData.blockchainWallet,
      userType: formData.userType,
    };

    if (formData.userType === "doctor") {
      payload.specialization = formData.specialization;
      payload.licenseNumber = formData.licenseNumber;
      payload.hospital = formData.hospital;
    }

    // axios 
  }

  return (



    

    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">



<div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Star_of_life2.svg/250px-Star_of_life2.svg.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>




      <h2 className="text-3xl font-semibold mb-6">Signup as {formData.userType}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name"
           className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
           value={formData.name} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Username:
          <input name="username"
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
           value={formData.username} onChange={handleChange} required />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

          />
        </label>
        <br />

        <label>
          Phone:
          <input name="phone" 
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          value={formData.phone} onChange={handleChange} />
        </label>
        <br />

        <label>
          Blockchain Wallet:
          <input
            name="blockchainWallet"
            value={formData.blockchainWallet}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

          />
        </label>
        <br />

        {formData.userType === "doctor" && (
          <>
            <label>
              Specialization:
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

              />
            </label>
            <br />

            <label>
              License Number:
              <input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

              />
            </label>
            <br />

            <label>
              Hospital:
              <input
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"

              />
            </label>
            <br />
          </>
        )}

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Sign Up
        </button>
      </form>
    </div>
  );
}
