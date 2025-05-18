import React from 'react';

export default function DoctorProfile({ user, doctor }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Doctor Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-semibold">@{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-semibold">{user.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Blockchain Wallet</p>
            <p className="text-lg font-semibold">{user.blockchainWallet}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="text-lg font-semibold">{doctor.specialization}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">License Number</p>
            <p className="text-lg font-semibold">{doctor.licenseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital</p>
            <p className="text-lg font-semibold">{doctor.hospital}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
