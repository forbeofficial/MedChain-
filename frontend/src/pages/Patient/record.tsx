import React from 'react';

const patient = {
  name: 'Anjali Verma',
  email: 'anjali.verma@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  records: [
    {
      date: '2025-05-10',
      doctor: 'Dr. Sharma',
      diagnosis: 'Fever and sore throat',
      prescription: 'Paracetamol, rest',
    },
    {
      date: '2025-03-28',
      doctor: 'Dr. Mehta',
      diagnosis: 'Mild Hypertension',
      prescription: 'Amlodipine 5mg',
    },
    {
      date: '2025-02-15',
      doctor: 'Dr. Kapoor',
      diagnosis: 'General Checkup',
      prescription: 'Vitamin D supplements',
    },
  ],
};

export default function Record() {
  const handleView = (record) => {
    alert(`Viewing record:\nDate: ${record.date}\nDoctor: ${record.doctor}`);
  };

  return (
    <div className="p-6">
      {/* Patient header */}
      <div className="flex gap-x-4 items-center mb-6">
        <img
          className="size-16 rounded-full bg-gray-50"
          src={patient.imageUrl}
          alt={patient.name}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-600">{patient.email}</p>
        </div>
      </div>

      {/* Record list */}
      <ul role="list" className="divide-y divide-gray-200">
        {patient.records.map((record, index) => (
          <li key={index} className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-md font-semibold text-gray-800">
                  {record.date} - {record.doctor}
                </p>
                <p className="text-sm text-gray-700 mt-1">Diagnosis: {record.diagnosis}</p>
                <p className="text-sm text-gray-700">Prescription: {record.prescription}</p>
              </div>
              <div>
                <button
                  onClick={() => handleView(record)}
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
                >
                  View
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
