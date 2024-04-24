import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import { medicalRecordForPatient } from "../services/homeServices";
import BasicMedicalData from "@/components/Record/BasicMedicalData";
import {
  getAllAllergies,
  getAllMedications,
  getAllDiseases,
  getAllOperations,
} from "@/services/Record";
import DiseaseInfo from "@/components/Record/DiseaseInfo";
import MedicationInfo from "@/components/Record/MedicationInfo";
import AllergyInfo from "@/components/Record/AllergyInfo";
import OperationInfo from "@/components/Record/OperationInfo";
import FamilyInfo from "@/components/Record/FamilyInfo";
import useRequireAuth from "@/custom hooks/useRequireAuth";
function MedRecord() {
  useRequireAuth();

  const [record, setrecord] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [operations, setOperations] = useState([]);
  useEffect(() => {
    medicalRecordForPatient(
      localStorage.getItem("id"),
      localStorage.getItem("token")
    )
      .then((response) => {
        // Check if response has data and set the record state
        if (response && response.data) {
          setrecord(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching medical record:", error);
        // Handle error here
      });

    getAllDiseases().then((response) => {
      setDiseases(response.data);
    });

    getAllMedications().then((response) => {
      setMedications(response.data);
    });

    getAllOperations().then((response) => {
      setOperations(response.data);
    });

    getAllAllergies().then((response) => {
      setAllergies(response.data);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center ">
        <h2 className="primary-text-semibold text-3xl">Medical Record ID</h2>
        <h2 className="gradient-text font-bold text-2xl">
          # {record.medical_record_id}
        </h2>
      </div>
      <section className="flex flex-col gap-10">
        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl mb-16">
          {record && <BasicMedicalData record={record} />}
        </section>

        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
          <DiseaseInfo diseases={diseases} />
        </section>

        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
          <MedicationInfo medications={medications} />
        </section>

        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
          <AllergyInfo allergy={allergies} />
        </section>

        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
          <OperationInfo operation={operations} />
        </section>

        <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
          <FamilyInfo
            father={record.father}
            mother={record.mother}
            second={record.second_degree}
          />
        </section>
      </section>

      <Footer />
    </>
  );
}

export default MedRecord;
