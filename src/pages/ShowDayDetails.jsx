import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkingHoursByDay } from "../services/DoctorRegisterServices";
import Footer from "../components/common/Footer";
import Header from "@/components/common/Header";

function ShowDayDetails() {
  const { id } = useParams();
  const [dayHours, setDayHours] = useState([]);
  useEffect(() => {
    getWorkingHoursByDay(id)
      .then((res) => {
        setDayHours(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <div className="container">
      <Header />

      <div className="bg-white border rounded-lg shadow-sm sm:flex my-10">
        <div className="flex flex-col gap-4 flex-grow p-4">
          {dayHours && dayHours.working_day && (
            <h3 className="text-2xl primary-text-bold secondary-color">
              {dayHours.working_day.day_of_week}
            </h3>
          )}
          {dayHours &&
            dayHours.working_hours &&
            dayHours.working_hours.length > 0 && (
              <>
                <h3 className="text-xl gradient-text">
                  Start Time : {dayHours.working_hours[0].start_time}
                </h3>
                <h3 className="text-xl gradient-text">
                  End Time : {dayHours.working_hours[0].end_time}
                </h3>
              </>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShowDayDetails;
