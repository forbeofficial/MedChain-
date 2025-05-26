import React from "react";
import LogOut from "../components/LogOutbutton";
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Clock,
  Users,
  Bookmark,
  ShieldCheck,
  Stethoscope,
  FileText,
  FlaskConical,
} from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/signin";
  };

  const patientActions = [
    {
      icon: <Clock className="h-6 w-6 text-emerald-400" />,
      title: "View Profile",
      description: "Check and update your personal profile information.",
      onClick: () => navigate("/patient/profile"), // example route
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: "View Record",
      description: "Access your medical history and diagnostic records.",
      onClick: () => navigate("/patient/record"),
    },
    {
      icon: <Bookmark className="h-6 w-6 text-red-600" />,
      title: "Upload Past Records",
      description: "Upload old prescriptions and medical test reports.",
      onClick: () => navigate("/patient/upload"), 
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "Grant Permission",
      description: "Control who can access your medical information.",
      onClick: () => navigate("/patient/permission"), 
    },
  ];

  const doctorActions = [
    {
      icon: <Stethoscope className="h-6 w-6 text-green-400" />,
      title: "View Patients",
      description: "See your assigned patients and their health records.",
      onClick: () => navigate("/doctor/patients"),
    },
  
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "view Profile",
      description: "Request access to patient history and reports.",
      onClick: () => navigate(""),
    },
  ];

  // const diagnosticActions = [
  //   {
  //     icon: <FlaskConical className="h-6 w-6 text-blue-400" />,
  //     title: "Upload Test Reports",
  //     description: "Submit diagnostic reports for patient viewing.",
  //     onClick: () => navigate("/upload-test-reports"),
  //   },
  //   {
  //     icon: <Users className="h-6 w-6 text-teal-400" />,
  //     title: "Manage Tests",
  //     description: "Manage and assign lab tests for patients.",
  //     onClick: () => navigate("/manage-tests"),
  //   },
  //   {
  //     icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
  //     title: "Access Permissions",
  //     description: "Request or revoke access to patient reports.",
  //     onClick: () => navigate("/permissions"),
  //   },
  // ];

  const renderActions = () => {
    let title = "";
    let actions = [];

    switch (role) {
      case "patient":
        title = "Patient Dashboard";
        actions = patientActions;
        break;
      case "doctor":
        title = "Doctor Dashboard";
        actions = doctorActions;
        break;
      case "diagnostic":
        title = "Diagnostic Center Dashboard";
        actions = diagnosticActions;
        break;
      default:
        return (
          <div className="text-red-500 text-lg">
            Role not recognized. Please login again.
          </div>
        );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <LogOut onClick={handleLogout} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700 rounded-lg overflow-hidden">
          {actions.map((action, idx) => (
            <div
              key={idx}
              onClick={action.onClick}
              className="cursor-pointer group relative bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{action.icon}</div>
                <div>
                  <h3 className="text-base font-semibold">{action.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{action.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return <div className="bg-gray-900 text-white min-h-screen p-8">{renderActions()}</div>;
}
