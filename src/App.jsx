import './App.css'
import axios from 'axios';
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
import DoctorAssistant from './pages/DoctorAssistant'
import DoctorAssistantCreate from './pages/DoctorAssistantCreate'
import AssistantAppointment from './pages/AssistantAppointment';


function App() {
  let token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return (
    <>
      <DateProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Appointments/:id" element={<MyAppointments />} />
          <Route path="/Assistant/Appointments/:id" element={<AssistantAppointment />} />
          <Route path="/doctor/assistants" element={<DoctorAssistant />} />
          <Route path="/doctor/assistants/create" element={<DoctorAssistantCreate />} />
          <Route path='/assistant/appointments' element={<AssistantAppointment/>}/>
          {/* Login & Register */}
          {/*======================================================================*/}

          <Route path="/signup" element={<DoctorRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/assistant/signup" element={<DoctorRegister />} />
          <Route path="/doctor/assistant/login" element={<Login />} />

          <Route path="/setWorkingDays" element={<DoctorWorkingDays />} />
          <Route path="/setWorkingHours" element={<DoctorWorkingHours />} />
        <Route path="/allWorkingDays" element={<AllWorkingDaysAndHours />} />
        <Route path="/workingDayDetails/:id" element={<ShowDayDetails />} />
        


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
      </DateProvider>
    </>
  );
}

export default App;

