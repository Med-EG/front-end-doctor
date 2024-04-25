import { Link } from "react-router-dom";
import doctorAlt from "../../assets/doctorAlt.jpg";
import Location from "../../assets/locationIcon.svg";
function Card({ src, DoctorName, specialization, location, doctorID }) {
  return (
    <>
      <Link to={`/doctorDetails/${doctorID}`}>
        <div
          className="flex flex-col bg-white border shadow-gray-300 rounded-xl w-80 shadow-lg"
          style={{ height: "30rem" }}
        >
          <div className="h-3/4">
            <img
              className="w-full h-full rounded-t-xl object-cover"
              src={src}
              alt="Image Description"
            />
          </div>
          <div className="p-4 md:p-5 h-1/4">
            <div className="flex justify-between">
              <h2 className="text-lg  w-3/4 text-gray-800 primary-text-semibold">
                Dr {DoctorName}
              </h2>
              <p className=" flex items-center gap-2 justify-end text-gray-400 w-2/4 text-sm primary-text-medium">
                <i className="fa-solid fa-location-dot"></i> {location}
              </p>
            </div>
            <h5 className="text-blue-500 primary-text-medium">
              {specialization}
            </h5>
          </div>
        </div>








        {/* <div className="flex flex-col bg-white border-black shadow-lg border-2 shadow-black rounded-xl w-64 aspect-square dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] ">
          <img
            className="w-full h-full rounded-t-lg"
            src={src}
            alt={doctorAlt}
          />
          <div className="p-4 md:px-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl secondary-text-semibold primary-color dark:text-white">
                {DoctorName}
              </h3>
              <div className="flex items-center">
                <img src={Location} alt="D:\Graduation Project\medeg-front\src\assets\doctorAlt.jpg" />
                <h4>{location}</h4>
              </div>
            </div>
            <p className="mt-1 primary-text-medium blue-1 dark:text-gray-400">
              {specialization}
            </p>
          </div>
        </div> */}
      </Link>
    </>
  );
}

export default Card;
