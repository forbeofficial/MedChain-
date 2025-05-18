import React from 'react';
import { useNavigate } from 'react-router-dom';

const pastRecords = [
  {
    name: 'Rohit Sharma',
    consultationDate: '2025-05-10',
    summary: 'Fever and sore throat. Prescribed paracetamol and advised rest.',
    doctor: 'Dr. Mehta',
  },
  {
    name: 'Anjali Verma',
    consultationDate: '2025-04-25',
    summary: 'Diabetic follow-up. Blood sugar levels under control.',
    doctor: 'Dr. Kapoor',
  },
  {
    name: 'Arjun Singh',
    consultationDate: '2025-03-30',
    summary: 'Sprained ankle. Recommended physiotherapy.',
    doctor: 'Dr. Sharma',
  },
];

export default function PatientsPastRecord() {
  const navigate = useNavigate();

  const handleViewClick = (name) => {
    // You can modify this route to include patient info or ID
    navigate('/doctor/patientProfile', { state: { patientName: name } });
  };

  const handleRemoveClick = (name) => {
    alert(`Remove ${name}'s record?`);
  };

  const buttonClass =
    'rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600';

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Patients Past Records</h1>
      <ul role="list" className="divide-y divide-gray-200 bg-white rounded-lg shadow">
        {pastRecords.map((record, index) => (
          <li key={index} className="flex justify-between gap-x-6 p-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="size-12 flex-none rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                {record.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{record.name}</p>
                <p className="text-sm text-gray-600">{record.consultationDate} &bull; {record.doctor}</p>
                <p className="mt-1 text-sm text-gray-700">{record.summary}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <button
                onClick={() => handleViewClick(record.name)}
                className={buttonClass}
              >
                View
              </button>
              <button
                onClick={() => handleRemoveClick(record.name)}
                className={buttonClass}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
