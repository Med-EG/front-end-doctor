import React, { useContext } from "react";
import { DoctorsContext } from "@/context/DoctorsProvider";
import Card from "../common/Card";
import line from "../../assets/home-section.svg";
import { useNavigate, Link } from "react-router-dom";

function Doctors() {
  return (
    <div className="w-10/12 lg:py-20 m-auto gap-10 flex lg:flex-row md:flex-col sm:flex-col xs-flex-col justify-center items-center p-14 rounded-xl shadow-lg shadow-gray-400">
      <div className="w-1/2 flex justify-center items-center">
        <h2 className="primary-text-bold text-blue-900  text-center lg:text-start lg:text-7xl md:text-6xl sm:text-5xl xs-text-xl">Get the best help in your work</h2>
      </div>
      <div className="w-1/2 flex justify-center items-center"><img src={line} alt="" className="w-fulll" /></div>
    </div>
  );
}

export default Doctors;
