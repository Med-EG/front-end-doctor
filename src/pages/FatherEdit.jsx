import useRequireAuth from "@/custom hooks/useRequireAuth";
import Header from "@/components/common/Header";
import { updateFamily } from "@/services/Record";
import { medicalRecordForPatient } from "@/services/homeServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons

function FatherEdit({ med_id }) {
  const [record, setRecord] = useState({
    father: "",
    mother: "",
    second_degree: "",
    alcoholic: "",
    alcoholic_level: "",
    blood_type: "",
    height: "",
    job: "",
    marital_status: "",
    patient_id: "",
    smoker: "",
    smoking_level: "",
    weight: "",
  });

  useEffect(() => {
    medicalRecordForPatient(med_id)
      .then((res) => {
        setRecord(res?.data);
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
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
      await updateFamily(record);
      console.log("Father updated successfully!");
      handleShowNotification("Father updated successfully!", true);
    } catch (error) {
      console.error("Error updating Father:", error);
      handleShowNotification("Error updating Father's info", false);
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
              <div className="text-center w-full flex justify-center items-center m-auto">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                    <h2 className="font-bold text-5xl gradient-text text-start py-5">
                      Father Information
                    </h2>
                    <div className="mt-2 space-y-3">
                      <input
                        type="text"
                        className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder="father"
                        id="father"
                        name="father"
                        value={record.father}
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
            <AlertDialogCancel
              className="py-3 px-5 w-full rounded-lg shadow-sm text-white bg-green-600 primary-text-semibold shadow-gray-400"
            >Finish</AlertDialogCancel>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



    </>
  );
}

export default FatherEdit;
