import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import useRequireAuth from "@/custom hooks/useRequireAuth";
import Notification from "@/components/common/Notification";
import toast, { Toaster } from "react-hot-toast";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { getDoctorByID } from "@/services/homeServices";
import { updateProfile } from "@/services/DoctorRegisterServices";

function DoctorUpdateProfile() {
  useRequireAuth();

  const [doctor, setDoctor] = useState({
    doctor_id: localStorage.getItem("id"),
    email: "",
    country: "",
    city: "",
    street: "",
    scientific_degree: "",
    price: "",
    years_of_experience: "",
  });

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const res = await getDoctorByID(localStorage.getItem("id"));
        setDoctor(res?.data?.doctor);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    }
    fetchDoctorData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(doctor);
      console.log("Doctor updated successfully!");
      handleShowNotification("Doctor updated successfully!", true);
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response && error.response.data && error.response.data.error) {
        const {
          email,
          country,
          city,
          street,
          scientific_degree,
          price,
          years_of_experience,
        } = error.response.data.error;

        if (email) handleShowNotification(email, false);
        if (country) handleShowNotification(country, false);
        if (city) handleShowNotification(city, false);
        if (street) handleShowNotification(street, false);
        if (scientific_degree) handleShowNotification(scientific_degree, false);
        if (price) handleShowNotification(price, false);
        if (years_of_experience)
          handleShowNotification(years_of_experience, false);

        if (
          !email &&
          !country &&
          !city &&
          !street &&
          !scientific_degree &&
          !price &&
          !years_of_experience
        ) {
          handleShowNotification(
            "An error occurred while updating the profile.",
            false
          );
        }
      } else {
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
              <div className="grid sm:flex gap-3">
                <div className="relative w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    placeholder=""
                    onChange={handleChange}
                    value={doctor.email}
                  />
                  <label
                    htmlFor="email"
                    className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  onChange={handleChange}
                  value={doctor.country}
                />
                <label
                  htmlFor="country"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Country
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={doctor.city}
                  onChange={handleChange}
                />
                <label
                  htmlFor="city"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  City
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={doctor.street}
                  onChange={handleChange}
                />
                <label
                  htmlFor="street"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Street
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="scientific_degree"
                  name="scientific_degree"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={doctor.scientific_degree}
                  onChange={handleChange}
                />
                <label
                  htmlFor="scientific_degree"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Scientific Degree
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="years_of_experience"
                  name="years_of_experience"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={doctor.years_of_experience}
                  onChange={handleChange}
                />
                <label
                  htmlFor="years_of_experience"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Years Of Experience
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="peer p-4 block w-full border-blue-300 border-2 rounded-lg text-md text-blue-900 placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                  placeholder=""
                  value={doctor.price}
                  onChange={handleChange}
                />
                <label
                  htmlFor="price"
                  className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  Price
                </label>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-4 w-full inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Update Profile
            </button>
            <Toaster />
          </div>
        </form>
      </div>
    </>
  );
}

export default DoctorUpdateProfile;
