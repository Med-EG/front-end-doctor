import { DateContext } from "@/context/DateContext";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/LogoIcon.svg";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  bookAppointment,
  checkChat,
  makeChat,
  getWorkingDays,
} from "@/services/AppointmentServices";
import WorkingHours from "./WorkingHours";

function Appointments({ id, price }) {
  const { date } = useContext(DateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [error, setError] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getWorkingDays(id);
        setWorkingDays(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    makingAppointment();
    chatopening();
  };

  const makingAppointment = async () => {
    try {
      // Make the appointment object to send to the backend
      const appointmentData = {
        doctor_id: id,
        patient_id: localStorage.getItem("id"),
        appointment_date: selectedDate,
        appointment_time: appointmentTime,
        price: price,
      };
      const response = await bookAppointment(appointmentData);
      console.log("Appointment booked successfully");
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const chatopening = async () => {
    try {
      // Make the chat object to send to the backend
      const chatData = {
        patient_id: localStorage.getItem("id"),
        doctor_id: id,
      };

      const response = await checkChat(chatData);
      if (response == "exist") {
        console.log("chat already exist between the 2 users");
      } else if (response == "not exist") {
        const chat = await makeChat(chatData);
        console.log("chat created");
      }
    } catch (error) {
      console.error("Error making chat :", error);
    }
  };

  // Function that returns the day name and date
  function getDayNameAndDateFormat(dateSelect) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateSelect);
    const dayName = days[date.getDay()];
    const formattedDate = date.toISOString().split("T")[0];

    setSelectedDay(dayName);
    setSelectedDate(formattedDate);
  }

  return (
    <section className="border-1 p-10 flex-col items-end justify-end  w-5/6 rounded-2xl m-auto">
      <div className="w-full flex justify-between items-center py-10">
        <label
          htmlFor="date"
          className="gradient-text primary-text-bold text-3xl"
        >
          Appointment Date :
        </label>
        <input
          name="date"
          type="date"
          className="w-2/6 uppercase text-center  border-2 border-blue-500 gradient-text primary-text-thin tracking-widest text-xl placeholder-white p-3 rounded-xl"
          onChange={(e) =>
            e.target.value
              ? getDayNameAndDateFormat(e.target.value)
              : console.log("date cleared")
          }
        />
      </div>

      {isLoading && (
        <div className="w-3/4 m-auto p-5 flex justify-center items-center">
          <div className="flex gap-3 items-center">
            <img src={logo} alt="" className="w-1/2" />
            <h2 className="font-bold gradient-text text-lg">Loading.....</h2>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {selectedDate &&
            selectedDay &&
            (workingDays.some((day) => selectedDay === day.day_of_week) ? (
              <>
                <h2 className="gradient-text primary-text-bold text-3xl py-3">
                  Available Hours :
                </h2>
                <WorkingHours
                  dayID={
                    workingDays.find((day) => selectedDay === day.day_of_week)
                      .working_day_id
                  }
                  setAppointmentTime={setAppointmentTime}
                  date={selectedDate}
                  doctor={id}
                />
              </>
            ) : (
              <div className="w-full flex flex-col gap-3 text-gray-400 justify-center items-center p-10 bg-white mb-7 rounded-lg">
                <i className="fa-regular fa-circle-xmark fa-3x"></i>
                <h2 className="w-full text-center font-bold text-2xl">
                  Doctor is not available this day
                </h2>
              </div>
            ))}

          <button className="offwhite w-full  gradient-background rounded-2xl lg:text-xl px-6 py-3">
            <AlertDialog>
              <AlertDialogTrigger>
                <h2 className="text-2xl primary-text-">Confrim Appointment</h2>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Appointment ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    <h4>Date : {selectedDate} </h4>
                    <h4>Time : {appointmentTime}</h4>
                    <h4>vezeeta : {price} L.E</h4>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </button>
        </>
      )}
    </section>
  );
}

export default Appointments;
