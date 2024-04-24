import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DoctorProvider } from "./context/DoctorsProvider.jsx";
import toast, { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
