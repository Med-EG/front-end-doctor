import React, { createContext, useState, useEffect } from "react";
import { getAllDoctors } from "@/services/homeServices";

export const DoctorsContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors(token);
        setDoctors(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <DoctorsContext.Provider value={{ doctors, loading }}>
      {children}
    </DoctorsContext.Provider>
  );
};
