import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./pages/Home";
import axios from 'axios';
import { DateProvider } from "./context/DateContext";
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

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
      </Routes>
      </DateProvider>
    </>
  )
}

export default App
