import React from 'react';

export default function PatientProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Patient Profile</h2>
        <p className="text-gray-600 text-center mb-8">View and update your personal details.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Username</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="@johndoe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="+91 1234567890" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500">Blockchain Wallet</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="0x1234abcd..." />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
