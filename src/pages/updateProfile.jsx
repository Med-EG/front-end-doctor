import Header from "@/components/common/Header";
import { updateProfile } from "@/services/Record";
import { getPatient } from "@/services/Register";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi"; // Import the check and x circle icons

function UpdateProfile() {
  useRequireAuth();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    patient_id: localStorage.getItem("id"),
    username: "",
    phone_number: "",
    password: "",
    national_id: "",
    last_name: "",
    gender: "",
    first_name: "",
    email: "",
    birth_date: "",
    address: "",
  });
  useEffect(() => {
    getPatient().then((res) => {
      setPatient(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone_number") {
      // Ensure phone number is treated as a string
      setPatient((prevData) => ({
        ...prevData,
        [name]: String(value),
      }));
    } else {
      setPatient((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      await updateProfile(patient);
      console.log("patient updated successfully!");
      handleShowNotification("patient updated successfully!", true);
    } catch (error) {
      console.error("Error updating Profile:", error);
      const addressError =
        error.response.data.error && error.response.data.error.address;
      const emailError =
        error.response.data.error && error.response.data.error.email;
      const phoneNumberError =
        error.response.data.error && error.response.data.error.phone_number;
      const usernameError =
        error.response.data.error && error.response.data.error.username;

      if (addressError) {
        handleShowNotification(addressError, false);
      }
      if (emailError) {
        handleShowNotification(emailError, false);
      }
      if (phoneNumberError) {
        handleShowNotification(phoneNumberError, false);
      }
      if (usernameError) {
        handleShowNotification(usernameError, false);
      }

      // If no specific error message exists, display a generic error message
      if (!addressError && !emailError && !phoneNumberError && !usernameError) {
        handleShowNotification(
          "An error occurred while updating the profile.",
          false
        );
      }
    }
  };

  return (
    <>
      <Header />
      <div className="text-center p-10">
        <form onSubmit={handleSubmit}>
          <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
            <div className="mt-2 space-y-3">
              {/* username section */}
              {/* =========================================================== */}
              <div className="grid sm:flex gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={handleChange}
                    value={patient?.username}
                  />
                  <label
                    htmlFor="username"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Username
                  </label>
                </div>
              </div>

              {/* Rest Inputs */}
              {/* =========================================================== */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  onChange={handleChange}
                  value={patient?.email}
                />
                <label
                  htmlFor="email"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Email
                </label>
              </div>

              <div className="flex gap-3">
                <div className="flex justify-center items-center w-14 border-blue-300 border-2 rounded-lg">
                  <h2 className="gradient-text font-bold">+20</h2>
                </div>
                <div className="relative w-full">
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    value={patient?.phone_number}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="phone_number"
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
                  id="address"
                  name="address"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={patient?.address}
                  onChange={handleChange}
                />
                <label
                  htmlFor="address"
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

          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Update Profile{" "}
            </button>
            <Toaster />
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
