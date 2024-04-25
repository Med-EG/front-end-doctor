import DetailsCard from "@/components/DoctorDetailsComponents/DetailsCard";
import Header from "@/components/common/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDoctorByID,
  getDoctorContactNumbers,
} from "@/services/homeServices";
// import DoctorAppointments from "@/components/DoctorDetailsComponents/DoctorAppointments";
import Footer from "@/components/common/Footer";
import SimilarDoctors from "@/components/DoctorDetailsComponents/SimilarDoctors";
import Appointments from "@/components/DoctorDetailsComponents/Appointments";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function DoctorDetails() {
  useRequireAuth();
  const [doctor, setDoctor] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // getting doctor data
      // =======================================
      getDoctorByID(id)
        .then((res) => {
          setDoctor(res.data);
        })
        .catch((err) => {
          throw err;
        });
      // getting doctor contact numbers
      // =======================================
      getDoctorContactNumbers(id)
        .then((res) => {
          setNumbers(res.data);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      // No token found, redirect to the login page
      window.location.href = "http://medeg-eg.com/login";
    }
  }, []);
  const fullName = `${doctor?.doctor?.first_name} ${doctor?.doctor?.last_name}`;

  // Concatenate phone numbers from the numbers state
  const phoneNumber = numbers
    .map((number) => number?.contact_number)
    .join(", ");

  // Concatenate location details
  const location = `${doctor?.doctor?.city}, ${doctor?.doctor?.country}, ${doctor?.doctor?.street}`;

  return (
    <>
      <Header />
      <DetailsCard
        src={`https://api-medeg.online/${doctor?.doctor?.doctor_image}`}
        name={fullName}
        specialization={doctor?.doctor?.specialization}
        phoneNumber={phoneNumber}
        location={location}
        bio={doctor?.doctor?.bio}
        price={doctor?.doctor?.price}
        rating={doctor?.doctor?.rating}
        yearsOfExp={doctor?.doctor?.years_of_experience}
        education={doctor?.doctor?.education}
        scientificDegree={doctor?.doctor?.scientific_degree}
      />
      <Appointments id={id} price={doctor?.doctor?.price} />
      {/* <DoctorAppointments id={id} /> */}
      <SimilarDoctors id={id} />
      <Footer />
    </>
  );
}

export default DoctorDetails;
