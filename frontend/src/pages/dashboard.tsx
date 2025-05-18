import React from "react";
import LogOut from "../components/LogOutbutton";
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
  const role = localStorage.getItem("role");

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
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: "View Record",
      description: "Access your medical history and diagnostic records.",
    },
    {
      icon: <Bookmark className="h-6 w-6 text-red-600" />,
      title: "Upload Past Records",
      description: "Upload old prescriptions and medical test reports.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "Grant Permission",
      description: "Control who can access your medical information.",
    },
  ];

  const doctorActions = [
    {
      icon: <Stethoscope className="h-6 w-6 text-green-400" />,
      title: "View Patients",
      description: "See your assigned patients and their health records.",
    },
    {
      icon: <FileText className="h-6 w-6 text-yellow-400" />,
      title: "Write Prescription",
      description: "Add new prescriptions for your patients securely.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "Access Requests",
      description: "Request access to patient history and reports.",
    },
  ];

  const diagnosticActions = [
    {
      icon: <FlaskConical className="h-6 w-6 text-blue-400" />,
      title: "Upload Test Reports",
      description: "Submit diagnostic reports for patient viewing.",
    },
    {
      icon: <Users className="h-6 w-6 text-teal-400" />,
      title: "Manage Tests",
      description: "Manage and assign lab tests for patients.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      title: "Access Permissions",
      description: "Request or revoke access to patient reports.",
    },
  ];

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
          <LogOut />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700 rounded-lg overflow-hidden">
          {actions.map((action, idx) => (
            <div
              key={idx}
              className="group relative bg-gray-800 p-6 flex flex-col justify-between hover:bg-gray-700 transition"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{action.icon}</div>
                <div>
                  <h3 className="text-base font-semibold">{action.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    {action.description}
                  </p>
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

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {renderActions()}
    </div>
  );
}
