import React, { useState } from "react";
import { File, Home, Shield, User, Settings, Siren, Menu, LogOut } from "lucide-react";
import { Pill, TestTubeDiagonal, Activity, Plus } from "lucide-react";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    window.location.href = "/"; // Redirect to login
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
      {/* Hamburger Menu Button (Only on Mobile) */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-200 p-2 rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar (Hidden on Mobile, Visible on Larger Screens) */}
      <div
        className={`fixed md:relative w-64 bg-white shadow-md transition-transform transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 h-full md:block`}
      >
        {/* Sidebar Header with Close Button */}
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
                setIsSidebarOpen(false); // Close sidebar when clicking a menu item
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

const HealthRecordCard = ({ title, icon, message, buttonText }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="text-blue-500 mb-2">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="w-20 h-5 bg-gray-700 rounded-md my-2"></div> {/* Placeholder for data */}
    <p className="text-gray-500">{message}</p>
    <button className="mt-3 flex items-center gap-2 border px-4 py-2 rounded-lg text-blue-600 border-blue-600 hover:bg-blue-100">
      <Plus className="w-4 h-4" />
      {buttonText}
    </button>
  </div>
);

const HomeContent = () => {
  return (
    <div>
      <h1 className="text-3xl mb-6">Health Records Overview</h1>
      
      {/* Health Records Cards */}
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
    <p>coming soon...</p>
  </div>
);

const SettingsContent = () => (
  <div>
    <h1 className="text-3xl mb-6">Emergency Access</h1>
    <p>coming soon...</p>
  </div>
);

export default Dashboard;
