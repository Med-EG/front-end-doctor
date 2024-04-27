import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyCombobox from "@/components/common/ComboBox";
import { updateMedicine, getMedicationById } from "@/services/Record";
import { getAllMedicinesInDB } from "@/services/MedicationServices";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import Notification from "@/components/common/Notification";
import Header from "@/components/common/Header";
import Edit from "../assets/Edit.svg";
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

function MedicationEditPage({ item, med_id, forceRerender }) {
  const [name, setName] = useState("");
  const [allMedications, setAllMedications] = useState([]);
  const [medicineInfo, setMedicineInfo] = useState({
    medical_record_id: med_id,
    medicine_name: "",
    dose: "",
    frequency: "",
    notes: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch medication data based on the ID
    getMedicationById(item.id)
      .then((response) => {
        setMedicineInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medication data:", error);
      });
  }, [item.id]);

  useEffect(() => {
    getAllMedicinesInDB()
      .then((res) => {
        setAllMedications(res.data);
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameChange = (selectedName) => {
    setName(selectedName);
  };

  const handleShowNotification = (message, isSuccess) => {
    const iconColor = isSuccess ? "text-green-500" : "text-red-500";
    const icon = isSuccess ? (
      <HiCheckCircle size={24} className={iconColor} />
    ) : (
      <HiXCircle size={24} className={iconColor} />
    );
    toast.custom(
      (t) => <Notification title={icon} text={message} isSuccess={isSuccess} />,
      {
        position: "bottom-right",
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure medicine_name is a string
      const updatedMedicineInfo = {
        ...medicineInfo,
        medicine_name: name,
      };
      await updateMedicine(item.id, updatedMedicineInfo);
      handleShowNotification("Medicine updated successfully!", true);
      forceRerender();
    } catch (error) {
      console.error("Error updating medicine:", error);
      const medicineNameError =
        error.response.data.error && error.response.data.error.medicine_name;
      const doseError =
        error.response.data.error && error.response.data.error.dose;
      const frequencyError =
        error.response.data.error && error.response.data.error.frequency;

      if (medicineNameError) {
        handleShowNotification(medicineNameError, false);
      }
      if (doseError) {
        handleShowNotification(doseError, false);
      }
      if (frequencyError) {
        handleShowNotification(frequencyError, false);
      }
      // If no specific error message exists, display a generic error message
      if (!allergyNameError && !allergyTypeError) {
        handleShowNotification(
          "An error occurred while updating the allergy.",
          false
        );
      }
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <button disabled={!(item.doctor_id == localStorage.getItem("id"))} className={`${item.doctor_id == localStorage.getItem("id") ? `opacity-100` : `opacity-50 cursor-not-allowed`}`}>
            <img src={Edit} alt="" className="w-1/8 aspect-square" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-3/4 p-5">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="text-center lg:w-10/12 md:w-11/12 sm:w-full xs-width-full flex justify-center items-center m-auto">
                <form onSubmit={handleSubmit} className="w-full p-10">
                  <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                    <h2 className="font-bold text-5xl gradient-text text-start py-5">
                      Medication Information
                    </h2>
                    <div className="mt-2 space-y-3">
                      {/* Combobox for selecting medicine */}
                      <MyCombobox
                        options={allMedications}
                        setName={handleNameChange}
                        placeholder={"Medicine Name"}
                      />
                      {/* Other input fields */}
                      <input
                        type="text"
                        className="medication_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Dose"
                        id="dose"
                        name="dose"
                        value={medicineInfo.dose}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="medication_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Frequency"
                        id="frequency"
                        name="frequency"
                        value={medicineInfo.frequency}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="medication_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Notes"
                        id="notes"
                        name="notes"
                        value={medicineInfo.notes}
                        onChange={handleChange}
                      />
                      {error && <p className="text-red-500">{error}</p>}
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="py-3 px-5  w-full rounded-lg shadow-sm text-white bg-green-600 primary-text-semibold shadow-gray-400"
            >Finish</AlertDialogCancel>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
}

export default MedicationEditPage;
