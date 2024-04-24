import { Route, Routes, useNavigate } from "react-router-dom";
import logoIcon from "../assets/LogoIcon.svg";
import logo from "../assets/logo.svg";
import medicalRecordImage from "../assets/medicalRecordImage.svg";
import BasicMedical from "@/components/common/BasicMedical";
import DiseaseRecord from "@/components/common/DiseaseRecord";
import FinishRecord from "@/components/common/FinishRecord";
import Record from "@/services/MedicalRecordServices";
import MedicationRecord from "@/components/common/MedicationRecord";
import AllergyRecord from "@/components/common/AllergyRecord";
import OperationRecord from "@/components/common/OperationRecord";
import FamilyRecord from "@/components/common/FamilyRecord";
import Face_ID from "@/components/common/Face-ID";
import { useEffect, useState } from "react";

function BasicMedicalInfo() {
  useEffect(() => {
    const med_id = localStorage.getItem("med_id");
    console.log(med_id==null)
    if (med_id) {
      window.location.href = "https://medeg-eg.com/";
    }
  }, []);
  const [newRecord, setRecord] = useState(new Record());
  return (
    <>
      <section className="w-screen h-screen flex lg:flex-row md:flex-col sm:flex-col">
        <div className="lg:w-4/12 md:w-3/4 md:h-1/2 md:m-auto sm:h-1/4 sm:w-3/4 sm:m-auto bg-white h-full relative flex justify-center items-center z-0">
          <img
            src={logoIcon}
            alt=""
            className=" w-full opacity-5 z-0 absolute"
          />
          <div className="lg:w-10/12 md:w-6/12 sm:w-6/12 aspect-auto m-auto z-10 absolute flex lg:flex-col items-center justify-center gap-9">
            <img src={logo} alt="" className="w-1/2 m-auto" />
            <img src={medicalRecordImage} alt="" className="w-full" />
          </div>
        </div>

        <div className="lg:w-8/12 md:w-full sm:w-full xsfull bg-gray-100 lg:h-full md:h-full md:relative sm:h-4/6 z-10 overflow-auto">
          <Routes>
            <Route path="/" element={<BasicMedical record={newRecord} />} />
            <Route path="/disease" element={<DiseaseRecord />} />
            <Route path="/medication" element={<MedicationRecord />} />
            <Route path="/allergy" element={<AllergyRecord />} />
            <Route path="/operation" element={<OperationRecord />} />
            <Route
              path="/family"
              element={<FamilyRecord record={newRecord} />}
            />
            <Route path="/face-ID" element={<Face_ID />} />
            <Route path="/finish" element={<FinishRecord />} />
          </Routes>
        </div>
      </section>
    </>
  );
}

export default BasicMedicalInfo;
