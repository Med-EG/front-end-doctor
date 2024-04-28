import "./App.css";
import Home from "./pages/Home";
import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorRegister from "./pages/DoctorRegister";
import Login from "./pages/Login";
import DoctorWorkingDays from "./pages/DoctorWorkingDays";
import DoctorWorkingHours from "./pages/DoctorWorkingHours";
import AllWorkingDaysAndHours from "./pages/AllWorkingDaysAndHours";
import ShowDayDetails from "./pages/ShowDayDetails";

function App() {
  let token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<DoctorRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setWorkingDays" element={<DoctorWorkingDays />} />
        <Route path="/setWorkingHours" element={<DoctorWorkingHours />} />
        <Route path="/allWorkingDays" element={<AllWorkingDaysAndHours />} />
        <Route path="/workingDayDetails/:id" element={<ShowDayDetails />} />
      </Routes>
    </>
  );
}

export default App;
