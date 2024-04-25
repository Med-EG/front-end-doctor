import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllDoctors } from "@/services/doctors";
import AllDoctors from "@/components/Doctors/AllDoctors";
import Filter from "@/components/common/Filter";
import axios from "axios";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function DoctorPage() {
  useRequireAuth();
  // get all doctors paginated
  const [area, setArea] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(
    "https://api-medeg.online/api/medEG/doctors?page=1"
  );

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          area,
          specialization,
          search,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };
  // useEffect(() => {
  //     getAllDoctors(page)
  //         .then(response => { setDoctors(response); })
  //         .catch(err => { throw err })
  // }, [page])
  useEffect(() => {
    fetchDoctors();
  }, [area, specialization, search, page]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    fetchDoctors();
  };
  return (
    <>
      <Header />
      <Filter
        setArea={setArea}
        setSpecialization={setSpecialization}
        setSearch={setSearch}
      />
      <AllDoctors doctor={doctors} setpages={setpage} />

      <Footer />
    </>
  );
}

export default DoctorPage;
