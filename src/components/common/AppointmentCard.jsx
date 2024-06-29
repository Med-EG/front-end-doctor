import React from "react";

const AppointmentCard = ({
  src,
  doctorName,
  location,
  specialization,
  date,
  time,
  price
}) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm sm:flex my-10">
      <div className="flex-shrink-0 rounded-s-xl overflow-hidden w-32 sm:w-60 md:w-40">
        <div className="h-full aspect-w-1 aspect-h-1">
          <img className="object-cover w-full h-full" src={src} alt="Doctor" />
        </div>
      </div>
      <div className="flex flex-col gap-16 flex-grow p-4">
        <div>
          <h3 className="text-2xl primary-text-bold secondary-color">
            {doctorName}
          </h3>
          {/* <div className="flex justify-between items-center"> */}
            <h3 className="text-xl gradient-text">{specialization}</h3>
            <h3 className="text-xl gradient-text">{location}</h3>
          {/* </div> */}
        </div>

        <div className="mt-2">
          <h4 className="text-md blue-1">Date : {date}</h4>
          <h4 className="text-md blue-1">Time : {time}</h4>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
