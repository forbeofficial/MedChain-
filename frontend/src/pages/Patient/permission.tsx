import React, { useState } from 'react';

export default function Permission() {
  const [doctorUsername, setDoctorUsername] = useState('');

  const handleInputChange = (e) => {
    setDoctorUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Permission granted to doctor:", doctorUsername);
    // You can replace this with an API call
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Permission Page</h2>
        <p className="text-gray-700 mb-6 text-center">
          Enter the doctor's username to give access to your records:
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Doctor's Username"
            value={doctorUsername}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Grant Access
          </button>
        </form>
      </div>
    </div>
  );
}
