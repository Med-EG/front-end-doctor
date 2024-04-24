import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import profilePicture from "../assets/profile-circled-svgrepo-com.svg";
import Patient from "@/services/Register";
import Notification from "@/components/common/Notification";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [state, setstate] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [previewSource, setPreviewSource] = useState(profilePicture);
  const navigate = useNavigate();

  // Image File Congig Functions
  // ================================================
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    newPatient.personal_image = file;
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //=============================================================================================
  // UseEffect
  // ============================================================================================
  const [newPatient, setPatient] = useState(new Patient());

  const handleSubmit = (e) => {
    e.preventDefault();
    newPatient
      .setNewPatient()
      .then((response) => {
        setstate(response.status);
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", `${response.data.patient.patient_id}`);
        localStorage.setItem("role", `patient`);
        window.location.href("https://medeg-eg.com/medicalRecord")
      })
      .catch(async (error) => {
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
    
        // Update the errorMessages state variable with the extracted error messages
        setErrorMessages(extractedErrorMessages);
    
        // Now, after saving all error messages, show the notification
        handleShowNotification(extractedErrorMessages, false);
    });
    

  };

  // ============================================
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
  return (
    <>
      <div className="flex flex-col">
        <div className="my-4">
          <img src={logo} alt="" className="w-1/10 m-auto" />
        </div>

        <div className="p-4 sm:p-7 dark:bg-slate-900 w-3/4 m-auto">
          <div className="text-center mb-8">
            <h2 className="text-6xl gradient-text p-4  font-bold dark:text-gray-200">
              Register
            </h2>
          </div>
        
          <form>
            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
              <div className="mt-2 space-y-3">
                {/* upload image section */}
                {/* =========================================================== */}
                <div className="flex flex-col items-center gap-5 pt-5 pb-9">
                  {previewSource && (
                    <img
                      src={previewSource}
                      alt="profile picture"
                      className="inline-block size-[150px] rounded-full object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="profilePic"
                    name="profilePic"
                    onChange={handleFileInputChange}
                    className="block text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                  />
                </div>
                {/* first & last name section */}
                {/* =========================================================== */}
                <div className="grid sm:flex gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="hs-floating-input-name"
                      className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) => (newPatient.first_name = e.target.value)}
                    />
                    <label
                      htmlFor="hs-floating-input-name"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="hs-floating-input-last"
                      className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) => (newPatient.last_name = e.target.value)}
                    />
                    <label
                      htmlFor="hs-floating-input-last"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                {/* username section */}
                {/* =========================================================== */}
                <div className="grid sm:flex gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="hs-floating-input-username"
                      className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) => (newPatient.username = e.target.value)}
                    />
                    <label
                      htmlFor="hs-floating-input-username"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Username
                    </label>
                  </div>
                </div>
                {/* String password section */}
                {/* =========================================================== */}
                <div className="w-full">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type="password"
                        id="hs-strong-password-with-indicator-and-hint-in-popover"
                        className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                        placeholder=""
                        onChange={(e) => (newPatient.password = e.target.value)}
                      />
                      <label
                        htmlFor="hs-floating-input-email"
                        className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                      >
                        Password
                      </label>
                      <div
                        id="hs-strong-password-popover"
                        className="hidden absolute z-10 w-1/2 bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 "
                      >
                        <div
                          id="hs-strong-password-in-popover"
                          data-hs-strong-password='{
            "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
            "hints": "#hs-strong-password-popover",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
            "minLength": "8",
            "mode": "popover"
          }'
                          className="flex mt-2 -mx-1"
                        ></div>

                        <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                          Your password must contain:
                        </h4>

                        <ul className="space-y-1 text-sm text-gray-500">
                          <li
                            data-hs-strong-password-hints-rule-text="min-length"
                            className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span data-uncheck>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </span>
                            Minimum number of characters is 8.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="lowercase"
                            className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span data-uncheck>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </span>
                            Should contain lowercase.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="uppercase"
                            className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span data-uncheck>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </span>
                            Should contain uppercase.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="numbers"
                            className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span data-uncheck>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </span>
                            Should contain numbers.
                          </li>
                          <li
                            data-hs-strong-password-hints-rule-text="special-characters"
                            className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                          >
                            <span className="hidden" data-check>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span data-uncheck>
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </span>
                            Should contain special characters.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Rest Inputs */}
                {/* =========================================================== */}
                <div className="relative">
                  <input
                    type="email"
                    id="hs-floating-input-email"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={(e) => (newPatient.email = e.target.value)}
                  />
                  <label
                    htmlFor="hs-floating-input-email"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="hs-floating-input-national-id"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={(e) => (newPatient.national_id = e.target.value)}
                  />
                  <label
                    htmlFor="hs-floating-input-national-id"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    National ID
                  </label>
                </div>

                <div className="grid sm:flex gap-3">
                  <div className="relative w-full">
                    <select
                      className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      onChange={(e) => (newPatient.gender = e.target.value)}
                    >
                      <option>-</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">
                      Gender
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="date"
                      id="hs-floating-input-date"
                      className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) => (newPatient.birth_date = e.target.value)}
                    />
                    <label
                      htmlFor="hs-floating-input-date"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Date of Birth
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex justify-center items-center w-14 border-blue-300 border-2 rounded-lg">
                    <h2 className="gradient-text font-bold">+20</h2>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="tel"
                      id="hs-floating-input-phone"
                      className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                      placeholder=""
                      onChange={(e) =>
                        (newPatient.phone_number = e.target.value)
                      }
                    />
                    <label
                      htmlFor="hs-floating-input-phone"
                      className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Phone Number{" "}
                      <span className="text-black opacity-45">
                        ( 1xx xxx xxxx )
                      </span>
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="hs-floating-input-address"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={(e) => (newPatient.address = e.target.value)}
                  />
                  <label
                    htmlFor="hs-floating-input-address"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Address{" "}
                    <span className="text-black opacity-45">
                      ( country / city / street )
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-task-created-alert"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </div>
          

          <div className="mt-7 flex justify-center gap-2">
            <h4 className="gradient-text font-medium">
              Already have an account ?
            </h4>
            <Link
              rel="stylesheet"
              to="/login"
              className="gradient-text font-bold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
