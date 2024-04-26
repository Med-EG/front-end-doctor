import { useState } from "react";
import { setWorkingDays } from "../services/DoctorRegisterServices";
import logoIcon from "../assets/doctorslogo.svg";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";

function DoctorWorkingDays() {
  const navigate = useNavigate();
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  // Define a state to track the selected days
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayClick = (day) => {
    // Toggle selection of the day
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleNextButtonClick = async (event) => {
    event.preventDefault();
    // Check if any days are selected
    if (selectedDays.length === 0) {
      console.log("Please select at least one working day.");
      return;
    }

    try {
      // Send the API request for each selected day
      await Promise.all(selectedDays.map((day) => setWorkingDays(day)));
      console.log("Working days set successfully:", selectedDays);
      // Reset selected days
      setSelectedDays([]);
      navigate("/setWorkingHours");
    } catch (error) {
      console.error("Error setting working days:", error);
    }
  };

  return (
    <>
      <div className="container pt-10 flex flex-col items-center">
        <img src={logoIcon} alt="" />
        <div className="flex flex-col pt-16 items-center gap-10">
          <h1 className="gradient-text font-bold text-5xl my-2">
            Working Days
          </h1>
          <div className="flex gap-10">
            {days.map((day, index) => (
              <button
                key={index}
                className={`py-2 px-4 text-blue-800 font-medium rounded-lg border ${
                  selectedDays.includes(day)
                    ? "gradient-background text-white"
                    : ""
                }`}
                onClick={() => handleDayClick(day)} // Attach onClick event handler
              >
                {day}
              </button>
            ))}
          </div>
          <button
            className="py-2 px-4 rounded-lg border offwhite gradient-background  lg:text-xl "
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorWorkingDays;
