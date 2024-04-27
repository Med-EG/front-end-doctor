import AppointmentCard from "@/components/common/AppointmentCard";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getAllAppointmentsForDoctor } from "@/services/homeServices";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icon from "../assets/no_app.svg";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function MyAppointments() {
  useRequireAuth();
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAllAppointmentsForDoctor(id)
      .then((res) => {
        setAppointments(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Header />
      <div className="m-auto w-10/12 flex justify-around flex-wrap">
        {appointments &&
          appointments.length!==0 ?
          appointments.map((appointment, index) => (
            <AppointmentCard
              src={`https://api-medeg.online/${appointment?.patient?.personal_image}`}
              doctorName={`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}
              date={appointment?.appointment_day}
              time={appointment?.appointment_time}
            />
          ))
         : (
          <>
            <div className="flex flex-col justify-center items-center w-full h-72">
              <img src={icon} alt="" />
              <h2 className="primary-text-bold text-3xl text-gray-500 py-5">
                No Appointments yet !{" "}
              </h2>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyAppointments;
