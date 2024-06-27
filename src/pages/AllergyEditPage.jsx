import React, { useState, useEffect } from "react";
import { getAllergyById, updateAllergy } from "@/services/Record";
import { getAllAllergiesInDB } from "@/services/AllergyInfo";
import MyCombobox from "@/components/common/ComboBox";
import toast from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons
import Notification from "@/components/common/Notification";
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

function AllergyEditPage({ item, med_id, forceRerender }) {
  const [name, setName] = useState("");
  const [allAllergies, setAllAllergies] = useState([]);
  const [allergyInfo, setAllergyInfo] = useState({
    medical_record_id: med_id,
    allergy_name: "",
    allergy_type: "",
    severity_level: "",
    body_response: "",
  });

  useEffect(() => {
    getAllergyById(item.id).then((response) => {
      setAllergyInfo(response.data);
    });
  }, [item.id]);

  useEffect(() => {
    getAllAllergiesInDB()
      .then((response) => setAllAllergies(response.data))
      .catch((e) => {
        throw e;
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllergyInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameChange = (selectedName) => {
    setName(selectedName);
  };

  const handleShowNotification = (message, isSuccess) => {
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
        />
      ),
      {
        position: "bottom-right",
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAllergyInfo = {
        ...allergyInfo,
        allergy_name: name,
      };
      await updateAllergy(item.id, updatedAllergyInfo);
      handleShowNotification("Allergy updated successfully!", true);
      forceRerender();
    } catch (error) {
      console.error("Error updating allergy:", error.response.data.error);
      // Extract error messages for specific fields, if available
      const allergyNameError =
        error.response.data.error && error.response.data.error.allergy_name;
      const allergyTypeError =
        error.response.data.error && error.response.data.error.allergy_type;

      // Show error notifications for each error, if they exist
      if (allergyNameError) {
        handleShowNotification(allergyNameError, false);
      }
      if (allergyTypeError) {
        handleShowNotification(allergyTypeError, false);
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
          <button
            disabled={!(item.doctor_id == localStorage.getItem("id"))}
            className={`${
              item.doctor_id == localStorage.getItem("id")
                ? `opacity-100`
                : `opacity-50 cursor-not-allowed`
            }`}
          >
            <img src={Edit} alt="" className="w-1/8 aspect-square" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-3/4 p-5">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="text-center w-full flex justify-center items-center m-auto">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                    <h2 className="font-bold text-5xl gradient-text text-start py-5">
                      Allergy Information
                    </h2>
                    <div className="mt-2 space-y-3">
                      {/* Input fields pre-filled with allergy data */}

                      <MyCombobox
                        options={allAllergies}
                        setName={handleNameChange} // Pass handleNameChange function
                        placeholder={"Allergy Name"}
                      />
                      <input
                        type="text"
                        className="allergy_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="severity level"
                        id="severity_level"
                        name="severity_level"
                        value={allergyInfo.severity_level}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="allergy_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Allergy type"
                        id="allergy_type"
                        name="allergy_type"
                        value={allergyInfo.allergy_type}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="allergy_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="body response"
                        id="body_response"
                        name="body_response"
                        value={allergyInfo.body_response}
                        onChange={handleChange}
                      />
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
            <AlertDialogCancel className="py-3 px-5 w-full rounded-lg shadow-sm text-white bg-green-600 primary-text-semibold shadow-gray-400">
              Finish
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AllergyEditPage;
