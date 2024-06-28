import "./App.css";
import axios from "axios";
import { DateProvider } from "./context/DateContext";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Pages imports
import Home from "./pages/Home";
import MedicalRecord from "./pages/MedRecord";
import AddNewDisease from "./pages/AddNewDisease";
import AddNewMedicine from "./pages/AddNewMedicine";
import AddNewAllergy from "./pages/AddNewAllergy";
import AddNewOperation from "./pages/AddNewOperation";
import AllergyEditPage from "./pages/AllergyEditPage";
import OperationEditPage from "./pages/OperationEditPage";
import DiseaseEditPage from "./pages/DiseaseEditPage";
import MedicationEditPage from "./pages/MedicationEditPage";
import FatherEdit from "./pages/FatherEdit";
import MotherEdit from "./pages/MotherEdit";
import SecondDegreeEdit from "./pages/SecondDegreeEdit";
import DoctorRegister from "./pages/DoctorRegister";
import Login from "./pages/Login";
import DoctorWorkingDays from "./pages/DoctorWorkingDays";
import DoctorWorkingHours from "./pages/DoctorWorkingHours";
import AllWorkingDaysAndHours from "./pages/AllWorkingDaysAndHours";
import ShowDayDetails from "./pages/ShowDayDetails";
import Chat from "./pages/Chat";
import MyAppointments from "./pages/MyAppointments";
import NotFound from "./pages/NotFound";
import AddNewWorkingDays from "./pages/AddNewWorkingDays";
import AddNewWorkingHours from "./pages/AddNewWorkingHours";
import DoctorUpdateProfile from "./pages/doctorUpdateProfile";
import UpdateProfile from "./pages/doctorUpdateProfile";
import EditWorkingDays from "./pages/EditWorkingDays";
import EditWorkingHours from "./pages/EditWorkingHours";
import { WorkingDaysProvider } from "./context/WorkingDaysContext";

function App() {
  let token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return (
    <>
      <DateProvider>
        <WorkingDaysProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Appointments/:id" element={<MyAppointments />} />
            <Route path="/updateProfile" element={<DoctorUpdateProfile />} />

            {/* Login & Register */}
            {/*======================================================================*/}

            <Route path="/signup" element={<DoctorRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setWorkingDays" element={<DoctorWorkingDays />} />
            <Route path="/setWorkingHours" element={<DoctorWorkingHours />} />
            <Route path="/editWorkingDays" element={<EditWorkingDays />} />
            <Route path="/editWorkingHours" element={<EditWorkingHours />} />
            <Route
              path="/allWorkingDays"
              element={<AllWorkingDaysAndHours />}
            />
            <Route path="/workingDayDetails/:id" element={<ShowDayDetails />} />
            <Route path="/addNewWorkingDays" element={<AddNewWorkingDays />} />
            <Route
              path="/addNewWorkingHours"
              element={<AddNewWorkingHours />}
            />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            {/* Medical Record */}
            {/*======================================================================*/}

            <Route path="/MedicalRecord" element={<MedicalRecord />} />
            {/* <Route path="/addDisease" element={<AddNewDisease />} />
          <Route path="/addMedicine" element={<AddNewMedicine />} />
          <Route path="/addAllergy" element={<AddNewAllergy />} />
          <Route path="/addOperation" element={<AddNewOperation />} /> */}
            <Route path="/FatherEdit" element={<FatherEdit />} />
            <Route path="/MotherEdit" element={<MotherEdit />} />
            <Route path="/SecondDegreeEdit" element={<SecondDegreeEdit />} />
            <Route path="/DiseaseEdit/:id" element={<DiseaseEditPage />} />
            <Route path="/MedicineEdit/:id" element={<MedicationEditPage />} />
            <Route path="/AllergyEdit/:id" element={<AllergyEditPage />} />
            <Route path="/OperationEdit/:id" element={<OperationEditPage />} />
          </Routes>
        </WorkingDaysProvider>
      </DateProvider>
    </>
  );
}

export default App;
