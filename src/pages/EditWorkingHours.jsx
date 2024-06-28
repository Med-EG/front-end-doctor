import React, { useState, useEffect } from "react";
import {
  getAllWorkingDaysForADoctor,
  setWorkingHours,
} from "../services/DoctorRegisterServices";
import MyCombobox from "../components/common/ComboBox2";
import Footer from "../components/common/Footer";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons
import { useNavigate } from "react-router-dom";

function EditWorkingHours() {
  const navigate = useNavigate();
  const [workingDays, setWorkingDays] = useState([]);
  const [formData, setFormData] = useState({});
  const [allComboboxesFilled, setAllComboboxesFilled] = useState(false);

  useEffect(() => {
    getAllWorkingDaysForADoctor().then((response) => {
      setWorkingDays(response.data);
    });
  }, []);

  function getHoursArray() {
    const hoursArray = [];

    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      hoursArray.push(hourString);
    }

    return hoursArray;
  }

  const hours = getHoursArray();

  const handleTimeChange = (time, workingDayId, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [workingDayId]: {
        ...prevData[workingDayId],
        [fieldName]: time,
      },
    }));
  };

  const validateForm = () => {
    for (const day of workingDays) {
      if (
        !formData[day.working_day_id] ||
        !formData[day.working_day_id].from ||
        !formData[day.working_day_id].to
      ) {
        return false;
      }
    }
    return true;
  };
  const handleShowNotification = (message, isSuccess, button, onClick) => {
    const iconColor = isSuccess ? "text-green-500" : "text-red-500"; // Define colors for success and error icons
    const icon = isSuccess ? (
      <HiCheckCircle size={24} className={iconColor} />
    ) : (
      <HiXCircle size={24} className={iconColor} />
    );
    toast.custom(
      (t) => (
        <Notification
          title={icon} // Use the icon as the title
          text={message}
          isSuccess={isSuccess}
          button={button}
          onClick={onClick}
        />
      ),
      {
        position: "bottom-right",
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!validateForm()) {
        throw new Error("Please fill in all start and end times for all days.");
      }

      for (const workingDayId in formData) {
        const { from, to } = formData[workingDayId];
        // Ensure end time is after start time
        if (new Date(`2000-01-01 ${to}`) <= new Date(`2000-01-01 ${from}`)) {
          throw new Error("The end time must be after the start time.");
        }
        // Format start and end times as H:i
        const formattedFrom = from.slice(0, 5);
        const formattedTo = to.slice(0, 5);
        await setWorkingHours(formattedFrom, formattedTo, workingDayId);
      }
      handleShowNotification(
        "Working Hours Created successfully!",
        true,
        "Let's Get Started",
        () => navigate("/")
      );
    } catch (error) {
      handleShowNotification(error.message, false);
    }
  };

  useEffect(() => {
    setAllComboboxesFilled(validateForm());
  }, [formData, workingDays]);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="gradient-text font-bold text-5xl my-2">Working Hours</h1>
      {workingDays.map((day) => (
        <div
          key={day.working_day_id}
          className="px-10 pt-2 pb-8 m-10 bg-secondary-color rounded-3xl"
        >
          <div className="flex flex-col  gap-4 items-center">
            <h2 className="text-white font-bold text-lg">{day.day_of_week}</h2>
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <MyCombobox
                  options={hours}
                  onChange={(time) =>
                    handleTimeChange(time, day.working_day_id, "from")
                  }
                  placeholder="From :"
                />
              </div>
              <div className="relative w-full">
                <MyCombobox
                  options={hours}
                  onChange={(time) =>
                    handleTimeChange(time, day.working_day_id, "to")
                  }
                  placeholder="To :"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        className="py-2 px-4 rounded-lg border offwhite gradient-background lg:text-xl"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Toaster />
    </div>
  );
}

export default EditWorkingHours;
