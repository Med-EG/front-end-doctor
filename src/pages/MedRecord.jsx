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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DiseaseInfo from "@/components/Record/DiseaseInfo";
import MedicationInfo from "@/components/Record/MedicationInfo";
import AllergyInfo from "@/components/Record/AllergyInfo";
import OperationInfo from "@/components/Record/OperationInfo";
import FamilyInfo from "@/components/Record/FamilyInfo";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function MedRecord() {
  // useRequireAuth();

  const [record, setRecord] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [operations, setOperations] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [firstRun, setFirstRun] = useState(true);

  const searchForPatient = (Id) => {
    setFirstRun(false)
    setSearching(true);
    medicalRecordForPatient(Id)
      .then((response) => {
        if (response && response.data) {
          setRecord(response.data);
          setSearching(false);
        } else {
          setRecord(null); // Clear previous record if not found
          setSearching(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching medical record:", error);
        setRecord(null);
        setSearching(false);
        // Handle error here
      });

    getAllDiseases(Id).then((response) => {
      setDiseases(response.data);
      console.log(response.data);
    });

    getAllMedications(Id).then((response) => {
      setMedications(response.data);

    });

    getAllOperations(Id).then((response) => {
      setOperations(response.data);

    });

    getAllAllergies(Id).then((response) => {
      setAllergies(response.data);

    });
  };


  const forceRerender = (component) => {
    switch (component) {
      case "DiseaseInfo":
        getAllDiseases(searchId).then((response) => {
          setDiseases(response.data);
        });
        break;
      case "MedicationInfo":
        getAllMedications(searchId).then((response) => {
          setMedications(response.data);
        });
        break;
      case "AllergyInfo":
        getAllAllergies(searchId).then((response) => {
          setAllergies(response.data);
        });
        break;
      case "OperationInfo":
        getAllOperations(searchId).then((response) => {
          setOperations(response.data);
        });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Header />
      <div className="flex lg:flex-row md:flex-row sm:flex-col xs-flex-col w-10/12 m-auto p-5  items-center space-x-2 gap-5">
        <input type="text" placeholder="Enter Patient Medical Record ID Here ..." className="lg:w-5/6 md:w-4/6 sm:w-3/6 xs-width-full p-5 bg-slate-100 rounded-xl" onChange={(e) => setSearchId(e.target.value)} />
        <button className="lg:w-1/6 md:w-2/3 sm:w-3/6 xs-width-full text-center bg-blue-500 p-5 rounded-xl primary-text-bold text-white" type="submit" onClick={() => searchForPatient(searchId)} disabled={searching}><i class="fa-solid fa-magnifying-glass"></i> Search</button>
      </div>
      {firstRun ?
        <>
          <div className="h-96 w-full flex justify-center items-center">
            <div className="text-center w-full flex flex-col justify-center items-center" >
              <i class="fa-solid fa-magnifying-glass fa-10x " style={{ color: "rgb(148 163 184)" }}></i>
              <h2 className="text-5xl primary-text-bold text-slate-400 py-7">Search for Medical Records</h2>
            </div>
          </div>
        </>
        : <>{searching ? (
          <div className="h-96 w-full flex justify-center items-center">
            <div className="text-center w-full flex flex-col justify-center items-center" >
              <i class="fa-solid fa-spinner fa-10x " style={{ color: "rgb(148 163 184)" }}></i>
              <h2 className="text-5xl primary-text-bold text-slate-400 py-7">Loading....</h2>
            </div>
          </div>
        ) : record ? (
          <section>
            <div className="flex flex-col items-center justify-center ">
              <h2 className="primary-text-semibold text-3xl">Medical Record ID</h2>
              <h2 className="gradient-text font-bold text-2xl">
                # {record.medical_record_id}
              </h2>
            </div>
            <section className="flex flex-col gap-10">
              <section className="flex flex-col gap-10">
                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <BasicMedicalData record={record} />
                </section>

                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <DiseaseInfo diseases={diseases} med_id={searchId}  forceRerender={() => forceRerender("DiseaseInfo")} />
                </section>

                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <MedicationInfo medications={medications} med_id={searchId} forceRerender={() => forceRerender("MedicationInfo")} />
                </section>

                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <AllergyInfo allergy={allergies} med_id={searchId} forceRerender={() => forceRerender("AllergyInfo")} />
                </section>

                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <OperationInfo operation={operations} med_id={searchId} forceRerender={() => forceRerender("OperationInfo")} />
                </section>

                <section className="lg:w-9/12 md:w-10/12 sm:w-11/12 xs-width-full m-auto p-10 shadow-lg shadow-gray-300 rounded-xl">
                  <FamilyInfo
                    father={record.father}
                    mother={record.mother}
                    second={record.second_degree}
                  />
                </section>
              </section>

            </section>
          </section>
        ) : (
          <div className="h-96 w-full flex justify-center items-center">
            <div className="text-center w-full flex flex-col justify-center items-center" >
              <i class="fa-solid fa-ban fa-10x " style={{ color: "rgb(148 163 184)" }}></i>
              <h2 className="text-5xl primary-text-bold text-slate-400 py-7">Patient Not Found</h2>
            </div>
          </div>
        )}</>}
      <Footer />
    </>
  );
}

export default MedRecord;
