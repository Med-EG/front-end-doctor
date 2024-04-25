import { Link, useNavigate } from "react-router-dom";
import Operation from "@/services/OperationInfo";
import { useState, useEffect } from "react";
import MyCombobox from "./ComboBox";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function OperationRecord() {
  const navigate = useNavigate();
  const [allOperation, setAllOperation] = useState([]);
  const [operationInfo, setOperationInfo] = useState(new Operation());
  const [name, setName] = useState("");

  useEffect(() => {
    operationInfo
      .getAllOperation()
      .then((response) => setAllOperation(response.data));
  }, []);

  const nextpage = () => {
    navigate("/medicalRecord/family");
  };
  const backward = () => {
    navigate("/medicalRecord/allergy");
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    operationInfo.addOperationByPatient(name)
    .then(()=>{
      handleShowNotification("Disease Added successfully!", true);
            var inputs = document.getElementsByClassName("disease_info");
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
    })
    .catch((error) => {
      console.error("Error occurred while adding allergy information:", error);

      const extractedErrorMessages = [];

      // Iterate over the errors object to extract each error message
      for (const field in error.response.data.error) {
          if (error.response.data.error.hasOwnProperty(field)) {
              // Get the array of error messages for the current field
              const fieldErrors = error.response.data.error[field];

              // Add each error message to the extractedErrorMessages array
              fieldErrors.forEach((errorMessage) => {
                  extractedErrorMessages.push(errorMessage);
              });
          }
      }

      // Now, after saving all error messages, show the notification
      handleShowNotification(extractedErrorMessages, false);
  });
    var inputs = document.getElementsByClassName("operation_info");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
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
  return (
    <>
      <section className="w-full h-full overflow-y-scroll ">
        {/* Progress Bar Component */}
        <div
          className="flex w-full h-3.5 bg-gray-200  overflow-hidden dark:bg-gray-700"
          role="progressbar"
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="flex flex-col justify-center overflow-hidden gradient-background text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
            style={{ width: "75%" }}
          ></div>
        </div>

                {/* The Form  */}
                {/* ============================ */}
                <div className="text-center lg:w-10/12 md:w-11/12 xs-width-full flex justify-center items-center m-auto">
                    <form className="w-full p-10">
                        <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                            <h2 className="font-bold text-5xl gradient-text text-start py-5">Operation Information</h2>
                            <div className="mt-2 space-y-3">

                                {/* Disease name */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3">
                                    {/* <div className="relative w-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" placeholder="" onChange={(e) => setblood_type(e.target.value)} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Operation Name</label>
                                    </div> */}

                  <div className="relative w-full">
                    <MyCombobox
                      options={allOperation}
                      setName={setName}
                      placeholder={"Operation Name"}
                    />
                  </div>
                </div>

                {/* Disease name */}
                {/* =========================================================== */}
                <div className="grid sm:flex gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="hs-floating-input-name"
                      className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) =>
                        (operationInfo.surgeon_name = e.target.value)
                      }
                    />
                    <label
                      htmlFor="hs-floating-input-name"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Surgeon name
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="date"
                      id="hs-floating-input-name"
                      className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) =>
                        (operationInfo.operation_date = e.target.value)
                      }
                    />
                    <label
                      htmlFor="hs-floating-input-name"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Operation date
                    </label>
                  </div>
                </div>

                {/* Complications */}
                <div className="relative">
                  <textarea
                    id="hs-floating-textarea"
                    className="operation_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    rows="3"
                    placeholder="This is a textarea placeholder"
                    onChange={(e) =>
                      (operationInfo.complications = e.target.value)
                    }
                  ></textarea>
                  <label
                    htmlFor="hs-floating-textarea"
                    className="absolute top-0 start-0 p-4 h-full gradient-text text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Commplications
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-task-created-alert"
                    onClick={handlesubmit}
                  >
                    Add
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="py-3 px-4 w-1/4 inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border-2  border-blue-300 bg-transparent text-blue-700  disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-task-created-alert"
                    onClick={backward}
                  >
                    back
                  </button>

                  <button
                    type="button"
                    className="py-3 px-4 w-1/4 inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-task-created-alert"
                    onClick={nextpage}
                  >
                    next
                  </button>
                </div>
                {/* {
                                errorMessages ?
                                    <div id="hs-task-created-alert" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto">
                                        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                                            <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
                                                <div className="p-4 sm:p-10 text-center overflow-y-auto">
                                                    <span className="mb-4 inline-flex justify-center items-center size-[70px] rounded-full border-4 border-red-50 bg-red-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
                                                        <i className="fa-solid fa-circle-xmark fa-3x" style={{ color: 'red' }}></i>
                                                    </span><h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                                        Please enter all valid data !
                                                    </h3>

                                                    <div className="shadow-lg rounded-lg p-5 m-5 bg-red-50">
                                                        {
                                                            errorMessages.map((value, index) => (
                                                                <p key={index} className="text-red-600 font-bold text-center">{value}</p>
                                                            ))
                                                        }
                                                    </div>

                                                    <div className="mt-6 flex justify-center gap-x-4">

                                                        <button type="button" className="py-2 px-3 w-full flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            } */}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default OperationRecord;
