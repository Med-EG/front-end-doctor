import { Link, useNavigate } from "react-router-dom";
import Allergy from "@/services/AllergyInfo";
import { useState, useEffect } from "react";
import MyCombobox from "./ComboBox";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function AllergyRecord() {
  const navigate = useNavigate();
  const [allAllergy, setAllAllergy] = useState([]);
  const [allergyInfo, setAllergyInfo] = useState(new Allergy());
  const [name, setName] = useState("");

  useEffect(() => {
    allergyInfo
      .getAllAllergy()
      .then((response) => setAllAllergy(response.data));
  }, []);

  const nextpage = () => {
    navigate("/medicalRecord/operation");
  };
  const backward = () => {
    navigate("/medicalRecord/medication");
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    allergyInfo.addAllergyByPatient(name)
      .then(() => {
        handleShowNotification("Allergy added successfully!", true);
        var inputs = document.getElementsByClassName("allergy_info");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].value = "";
        }
      })
      .catch((error) => {
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
      })
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
          style={{ width: "60%" }}
        ></div>
      </div>

      {/* The Form  */}
      {/* ============================ */}
      <div className="text-center lg:w-10/12 md:w-11/12 xs-width-full flex justify-center items-center m-auto">
        <form className="w-full p-10">
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <h2 className="font-bold text-5xl gradient-text text-start py-5">
              Allergy Information
            </h2>
            <div className="mt-2 space-y-3">
              {/* Disease name */}
              {/* =========================================================== */}
              <div className="grid sm:flex gap-3">
                {/* <div className="relative w-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" placeholder="" onChange={(e) => setblood_type(e.target.value)} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Allergy Name</label>
                                    </div> */}

                <div className="relative w-full">
                  <MyCombobox
                    options={allAllergy}
                    setName={setName}
                    placeholder={"Allergy Name"}
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
                    className="allergy_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={(e) =>
                      (allergyInfo.allergy_type = e.target.value)
                    }
                  />
                  <label
                    htmlFor="hs-floating-input-name"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Allergian name
                  </label>
                </div>
                {/* Dose unit */}
                {/* =========================================================== */}
                <div className="grid sm:flex gap-3 h-full w-full">
                  <div className="relative w-full">
                    <select
                      className="allergy_info peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      defaultValue={"--"}
                      onChange={(e) =>
                        (allergyInfo.severity_level = e.target.value)
                      }
                    >
                      <option>--</option>
                      <option>low</option>
                      <option>medium</option>
                      <option>high</option>
                      <option>intense</option>
                    </select>
                    <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">
                      Severity level
                    </label>
                  </div>
                </div>
              </div>

              {/* Body response */}
              <div className="relative">
                <textarea
                  id="hs-floating-textarea"
                  className="allergy_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  rows="3"
                  placeholder="This is a textarea placeholder"
                  onChange={(e) =>
                    (allergyInfo.body_response = e.target.value)
                  }
                ></textarea>
                <label
                  htmlFor="hs-floating-textarea"
                  className="absolute top-0 start-0 p-4 h-full gradient-text text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Body response
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
            </div>
          </div>
        </form>
      </div>
    </section>
  </>
);
}

export default AllergyRecord;
