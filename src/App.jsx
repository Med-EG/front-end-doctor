import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { DateProvider } from "./context/DateContext";
import React, { useEffect } from 'react';
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


function App() {
  // let token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer 791|tzkiUPOtIawS5WixmVBf21wcDKfZOxNGOLQ4G6gX712fe421`;
    return config;
  });
  return (
    <>
      <DateProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MedicalRecord" element={<MedicalRecord />} />
          <Route path="/addDisease" element={<AddNewDisease />} />
          <Route path="/addMedicine" element={<AddNewMedicine />} />
          <Route path="/addAllergy" element={<AddNewAllergy />} />
          <Route path="/addOperation" element={<AddNewOperation />} />
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
  )
}

export default App

