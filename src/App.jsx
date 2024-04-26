import "./App.css";
import Home from "./pages/Home";
import axios from "axios";
import { DateProvider } from "./context/DateContext";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorRegister from "./pages/DoctorRegister";
import Login from "./pages/Login";
import DoctorWorkingDays from "./pages/DoctorWorkingDays";
import DoctorWorkingHours from "./pages/DoctorWorkingHours";

function App() {
  // let token = localStorage.getItem("token");

  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer 799|lKqCuYF95ONbbtJGzWLde4D7a3MRwA30INjU2CyM9ebc2c0a`;
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
      </Routes>
    </>
  );
}

export default App;
