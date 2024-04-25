import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllergyById, updateAllergy } from "@/services/Record";
import { getAllAllergiesInDB } from "@/services/AllergyInfo";
import MyCombobox from "@/components/common/ComboBox";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons
import Notification from "@/components/common/Notification";
import Header from "@/components/common/Header";

function AllergyEditPage() {
  useRequireAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [allAllergies, setAllAllergies] = useState([]);
  const [allergyInfo, setAllergyInfo] = useState({
    medical_record_id: localStorage.getItem("med_id"),
    allergy_name: "",
    allergy_type: "",
    severity_level: "",
    body_response: "",
  });

  useEffect(() => {
    getAllergyById(id).then((response) => {
      setAllergyInfo(response.data);
    });
  }, [id]);

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
      await updateAllergy(id, updatedAllergyInfo);
      console.log("Allergy updated successfully!");
      // Show success notification with the success icon
      handleShowNotification("Allergy updated successfully!", true);
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
    <Header/>
    <div className="text-center lg:w-10/12 md:w-11/12 sm:w-full xs-width-full flex justify-center items-center m-auto">
      <form onSubmit={handleSubmit} className="w-full p-10">
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
    </>
  );
}

export default AllergyEditPage;
