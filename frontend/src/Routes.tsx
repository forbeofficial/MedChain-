import { BrowserRouter, Route, Routes } from "react-router-dom"
import Role from "./pages/role"
import MainPage from "./pages/mainpage"
import Signin from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { Layout } from "./Layout"
import { Signup } from "./pages/signup"
import Error from "./pages/404"
import { PrivateRoute } from "./PrivateRoute";
import UploadForm from "./pages/uploadform"
import Consultency from "./pages/doctor/Consultency"
import PatentsPastRecord from "./pages/doctor/patentspastrec"
import PatientsList from "./pages/doctor/patientslist"
import PatientsProfile from "./pages/doctor/patientsProfile"
import DoctorProfile from "./pages/doctor/profile"

import Permission from './pages/Patient/permission';
import PatientProfile from './pages/Patient/profile';
import Record from './pages/Patient/record';
import Upload from './pages/Patient/upload';

export default function Approutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} /> 
        <Route path="/role" element={<Role />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadForm />} />

            {/* Doctor Routes */}
            <Route path="/doctor/consultency" element={<Consultency />} />
            <Route path="/doctor/pastrecord" element={<PatentsPastRecord />} />
            <Route path="/doctor/patients" element={<PatientsList />} />
            <Route path="/doctor/patientProfile" element={<PatientsProfile />} />
            <Route path="/doctor/details" element={<DoctorProfile />} />
          </Route>

          {/* Patient Routes */}
          <Route path="/patient/permission"     element={<Permission />} />
          <Route path="/patient/profile"        element={<PatientProfile />} />
          <Route path="/patient/record"         element={<Record />} />
          <Route path="/patient/upload"         element={<Upload />} />

          {/* 404 Page */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
