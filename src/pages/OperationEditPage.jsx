import MyCombobox from "@/components/common/ComboBox";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import Header from "@/components/common/Header";
import { getAllOperationsInDB } from "@/services/OperationInfo";
import { getOperationById, updateOperation } from "@/services/Record";
import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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

function OperationEditPage({ item, med_id, forceRerender }) {
  const [name, setName] = useState("");
  const [allOperations, setAllOperations] = useState([]);

  const [operationInfo, setOperationInfo] = useState({
    complications: "",
    medical_record_id: med_id,
    operation_date: "",
    operation_name: "",
    operation_notes: "",
    surgeon_name: "",
  });

  // Function to fetch operation data based on the ID
  useEffect(() => {
    getOperationById(item.id).then((response) => {
      setOperationInfo(response.data);
    });
  }, [item.id]);
  useEffect(() => {
    getAllOperationsInDB().then((response) => {
      setAllOperations(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationInfo((prevData) => ({
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
      const updatedOperationInfo = { ...operationInfo, operation_name: name };

      await updateOperation(item.id, updatedOperationInfo);
      handleShowNotification("Operation updated successfully!", true);
      forceRerender();
    } catch (error) {
      console.error("Error updating operation:", error);
      // Extract error messages for specific fields, if available
      const opNameError =
        error.response.data.error && error.response.data.error.operation_name;
      const opDateError =
        error.response.data.error && error.response.data.error.operation_date;

      // Show error notifications for each error, if they exist
      if (opNameError) {
        handleShowNotification(opNameError, false);
      }
      if (opDateError) {
        handleShowNotification(opDateError, false);
      }

      // If no specific error message exists, display a generic error message
      if (!opNameError && !opDateError) {
        handleShowNotification(
          "An error occurred while updating the operation.",
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
                      Operation Information
                    </h2>
                    <div className="mt-2 space-y-3">
                      {/* Input fields pre-filled with operation data */}
                      <MyCombobox
                        options={allOperations}
                        setName={handleNameChange}
                        placeholder={"Operation Name"}
                      />
                      <input
                        type="text"
                        className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Complications"
                        id="complications"
                        name="complications"
                        value={operationInfo.complications}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Operation Date"
                        id="operation_date"
                        name="operation_date"
                        value={operationInfo.operation_date}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="Surgeon Name"
                        id="surgeon_name"
                        name="surgeon_name"
                        value={operationInfo.surgeon_name}
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

export default OperationEditPage;
