import { getDiseaseById, updateDisease } from "@/services/Record";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyCombobox from "@/components/common/ComboBox";
import { getAllDiseasesInDB } from "@/services/DiseaseServices";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons
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
import Header from "@/components/common/Header";
import Edit from "../assets/Edit.svg";


function DiseaseEditPage({item, med_id, forceRerender }) {
  const [name, setName] = useState("");
  const [allDiseases, setAllDiseases] = useState([]);
  const [diseaseInfo, setDiseaseInfo] = useState({
    medical_record_id: med_id,
    disease_name: "",
    notes: "",
  });

  useEffect(() => {
    getDiseaseById(item.id).then((response) => {
      setDiseaseInfo(response.data);
    });
  }, [item.id]);

  useEffect(() => {
    getAllDiseasesInDB()
      .then((response) => setAllDiseases(response.data))
      .catch((e) => {
        throw e;
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiseaseInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameChange = (selectedName) => {
    setName(selectedName);
  };

  // Example usage
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
      const updatedDiseaseInfo = {
        ...diseaseInfo,
        disease_name: name,
      };
      await updateDisease(item.id, updatedDiseaseInfo);
      // Show success notification with the success icon
      handleShowNotification("Disease updated successfully!", true);
      forceRerender();
      // navigate("/record");
    } catch (error) {
      console.error("Error updating disease:", error);
      // Show error notification with the error icon
      handleShowNotification(error.response.data.error.disease_name, false);
    }
  };

  return (
    <>




      <AlertDialog>
        <AlertDialogTrigger>
          <button  disabled={!(item.doctor_id == localStorage.getItem("id"))} className={`${item.doctor_id == localStorage.getItem("id") ? `opacity-100` : `opacity-50 cursor-not-allowed`}`}>
            <img src={Edit} alt="" className="w-1/8 aspect-square" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-3/4 p-5">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="text-center w-full flex justify-center items-center m-auto">
                <form onSubmit={handleSubmit} className="w-full ">
                  <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                    <h2 className="font-bold text-5xl gradient-text text-start py-5">
                      Disease Information
                    </h2>
                    <div className="mt-2 space-y-3">
                      {/* Input fields pre-filled with allergy data */}
                      <MyCombobox
                        options={allDiseases}
                        setName={handleNameChange} // Pass handleNameChange function
                        placeholder={"Disease Name"}
                        defaultValue={diseaseInfo.disease_name}
                      />
                      <input
                        type="text"
                        className=" peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="notes"
                        id="notes"
                        name="notes"
                        value={diseaseInfo.notes}
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
                    {/* <Toaster /> Render the Toaster component */}
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

export default DiseaseEditPage;
