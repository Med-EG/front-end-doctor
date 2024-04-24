import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "@/components/common/Notification";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

function BasicMedical(props) {
    const navigate = useNavigate();

    const handleNavigateToDisease = () => {
        navigate("/medicalRecord/disease");
    };

    const [errorMessages, setErrorMessages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.record
            .check()
            .then((response) => {
                const record_id = response.data.medical_record_id;
                return props.record.updateRecord(record_id)
                    .then((response) => {
                        localStorage.setItem("med_id", response.data.medical_record_id);
                        navigate("/medicalRecord/disease");
                    });
            })
            .catch((error) => {

                props.record
                    .setNewRecord()
                    .then((response) => {
                        localStorage.setItem("med_id", response.data.medical_record_id);
                        navigate("/medicalRecord/disease");
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

                        // Update the errorMessages state variable with the extracted error messages
                        setErrorMessages(extractedErrorMessages);
                        // Now, after saving all error messages, show the notification
                        handleShowNotification(extractedErrorMessages, false);
                    });
            });
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

    return (
        <>
            <section className="w-full h-full overflow-scroll">
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
                        style={{ width: "15%" }}
                    ></div>
                </div>

                {/* The Form  */}
                {/* ============================ */}
                <div className="text-center lg:w-10/12 md:w-11/12 xs-width-full  flex justify-center items-center m-auto ">
                    <form className="w-full p-10">
                        <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                            <h2 className="font-bold text-5xl gradient-text text-start py-5">Basic Medical Info</h2>
                            <div className="mt-2 space-y-3">
                                {/* Wight and HEight */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex md:gap-10 xs-gap-3">
                                    <div className="relative flex items-center gap-3 md:w-1/2 xs-width-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={props.record.height !== 0 ? props.record.height : null} onChange={(e) => props.record.height = e.target.value} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Height</label>
                                        <h2 className="gradient-text font-bold">CM</h2>
                                    </div>
                                    <div className="relative md:w-1/2 xs-width-full flex items-center gap-3">
                                        <input type="text" id="hs-floating-input-last" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={props.record.weight !== 0 ? props.record.weight : null} onChange={(e) => props.record.weight = e.target.value} />
                                        <label htmlFor="hs-floating-input-last" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Weight</label>
                                        <h2 className="gradient-text font-bold">KG</h2>
                                    </div>
                                </div>
                                {/* blood type */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3">
                                    <div className="relative w-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={props.record.blood_type !== "none" ? props.record.blood_type : ""} onChange={(e) => props.record.blood_type = e.target.value} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Blood Type</label>
                                    </div>
                                </div>
                                {/* smoking */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3 h-full w-full">
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.smoker = e.target.value == "Yes" ? true : false}>
                                            <option >--</option>
                                            <option >Yes</option>
                                            <option>No</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Smoker :</label>
                                    </div>
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.smoking_level = e.target.value}>
                                            <option >--</option>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Smoking Level :</label>
                                    </div>
                                </div>
                                {/* Alcohol */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3 h-full w-full">
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.alcoholic = e.target.value == "Yes" ? true : false}>
                                            <option >--</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Alcoholic :</label>
                                    </div>
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.alcoholic_level = e.target.value}>
                                            <option >--</option>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Alcoholic Level :</label>
                                    </div>
                                </div>

                                {/* Job and marital status section */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3">
                                    <div className="relative md:w-8/12 xs-width-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={props.record.job !== "none" ? props.record.job : ""} onChange={(e) => props.record.job = e.target.value} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Job</label>
                                    </div>
                                    <div className="relative md:w-4/12 xs-width-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.marital_status = e.target.value}>
                                            <option >--</option>
                                            <option>Single</option>
                                            <option>Married</option>
                                            <option>Divorced</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Marital status :</label>
                                    </div>
                                </div>
                                {/* sleeping */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3 h-full w-full">
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"-"} onChange={(e) => props.record.sleeping_hours = e.target.value}>
                                            <option  >--</option>
                                            <option>Less than 4</option>
                                            <option>4-6</option>
                                            <option>6-8</option>
                                            <option>8-10</option>
                                            <option>More than 10</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Sleeping Hours :</label>
                                    </div>
                                    <div className="relative w-full">
                                        <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={"--"} onChange={(e) => props.record.sleeping_quality = e.target.value}>
                                            <option >--</option>
                                            <option>Bad</option>
                                            <option>Medium</option>
                                            <option>Good</option>
                                            <option>great</option>
                                            <option>I don't Know</option>
                                        </select>
                                        <label className="absolute border-blue-300 gradient-text  text-md top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">Sleeping Quality :</label>
                                    </div>
                                </div>
                                {/* Past Fractures */}
                                {/* =========================================================== */}
                                <div className="grid sm:flex gap-3">
                                    <div className="relative w-full">
                                        <input type="text" id="hs-floating-input-name" className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={props.record.past_fracrues !== "none" ? props.record.past_fracrues : ""} onChange={(e) => props.record.past_fracrues = e.target.value} />
                                        <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500">Past Fractures</label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                {/* <Link to={"medicalRecord/disease"}> */}
                                <button type="button" className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert" onClick={handleSubmit}>
                                    Next
                                </button>
                                {/* </Link> */}

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
                    </form>
                </div>
            </section>
        </>
    );
}

export default BasicMedical;
