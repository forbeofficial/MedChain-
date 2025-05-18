import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientsProfile = () => {
  const navigate = useNavigate();

  const buttonClass = "flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Patients Profile</h1>

      <div className="mt-5 flex gap-4">
        <button className={buttonClass} onClick={() => navigate('/doctor/pastrecord')}>
          View Record
        </button>
        <button className={buttonClass} onClick={() => navigate('/doctor/consultency')}>
          Prescription
        </button>
        <button className={buttonClass} onClick={() => navigate(-1)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientsProfile;
