import React, { useState } from "react";
import { File, Shield, Siren, Menu, LogOut } from "lucide-react";
import { Pill, TestTubeDiagonal, Activity, Plus } from "lucide-react";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("My Records");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const menuItems = [
    { id: "My Records", icon: <File className="w-5 h-5" />, label: "My Records" },
    { id: "Access Control", icon: <Shield className="w-5 h-5" />, label: "Access Control" },
    { id: "Emergency Access", icon: <Siren className="w-5 h-5" />, label: "Emergency Access" },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "My Records":
        return <HomeContent />;
      case "Access Control":
        return <ProfileContent />;
      case "Emergency Access":
        return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Menu Button */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-200 p-2 rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 bg-white shadow-md transition-transform transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 h-full md:block`}
      >
        <div className="p-5 text-center text-xl font-bold border-b flex justify-between items-center">
          Dashboard
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>✖</button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors
                ${activeMenu === item.id ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 mt-4 text-red-600 border-t border-gray-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

const HealthRecordCard = ({ title, icon, message, buttonText }) => {
  const fileInputRef = React.useRef(null);
  const [serverResponse, setServerResponse] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);
      setServerResponse(responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-6 space-y-4 bg-white rounded-lg shadow-md text-center">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{message}</p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100"
        onClick={() => fileInputRef.current.click()}
      >
        <Plus className="w-5 h-5" />
        {buttonText}
      </button>
      {serverResponse && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md text-left">
          <h4 className="text-lg font-semibold text-gray-700">Server Response</h4>
          <div className="mt-2 text-gray-700 space-y-2">
            {serverResponse.data ? (
              <div>
                <p><strong>Patient Name:</strong> {serverResponse.data.patient_name}</p>
                <p><strong>Address:</strong> {serverResponse.data.patient_address}</p>
                <p><strong>Medicines:</strong> {serverResponse.data.medicines}</p>
                <p><strong>Directions:</strong> {serverResponse.data.directions}</p>
                <p><strong>Refill:</strong> {serverResponse.data.refill}</p>
              </div>
            ) : (
              <pre className="text-sm">{JSON.stringify(serverResponse, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const HomeContent = () => {
  return (
    <div>
      <h1 className="text-3xl mb-6">Health Records Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <HealthRecordCard 
          title="Medications"
          icon={<Pill className="w-8 h-8" />}
          message="No medications records found"
          buttonText="Add Medications"
        />
        <HealthRecordCard 
          title="Lab Results"
          icon={<TestTubeDiagonal className="w-8 h-8" />}
          message="No lab results records found"
          buttonText="Add Lab Results"
        />
        <HealthRecordCard 
          title="Allergies"
          icon={<Activity className="w-8 h-8" />}
          message="No allergies records found"
          buttonText="Add Allergies"
        />
      </div>
    </div>
  );
};

const ProfileContent = () => (
  <div>
    <h1 className="text-3xl mb-6">Access Control</h1>
    <p>Coming soon...</p>
  </div>
);

const SettingsContent = () => (
  <div>
    <h1 className="text-3xl mb-6">Emergency Access</h1>
    <p>Coming soon...</p>
  </div>
);

export default Dashboard;
