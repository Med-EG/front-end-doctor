import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Link } from "react-router-dom";
import { getAllAssistants } from "@/services/assistants";
import { useEffect, useState } from "react";

function DoctorAssistant() {
  const [assistants, setAssistants] = useState([]);
  useEffect(() => {
    getAllAssistants(localStorage.getItem("id"))
      .then((res) => {
        setAssistants(res.data);
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <Header />
      <div className="flex flex-row w-10/12 m-auto p-5  items-center space-x-2 gap-5">
        <h2 className="basis-1/2 font-bold text-3xl gradient-text text-start py-5">
          My Assistants
        </h2>
        <div className="basis-1/2 flex justify-end">
          <div className="border-blue-300 border-2 rounded-3xl">
            <Link
              to="/doctor/assistants/create"
              className="flex-none text-xl inline-block font-semibold focus:outline-none focus:opacity-80 p-3"
              aria-label="Preline"
            >
              <h2 className="basis-1/2 font-bold text-xl gradient-text text-start">
                New Assistant <i className="fa-solid fa-plus ml-2"></i>
              </h2>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xlg:mx-44 lg:mx-44 md:mx-32 mx-10 text-center mt-5 gap-4">
        <>
          {assistants.map((assistant) => {
            return (
              <div className="border-blue-300 border-2 rounded-lg">
                <h2 className="basis-1/3 font-bold text-xl gradient-text text-center p-3">
                  {assistant.assistant_name}
                </h2>
                <h2 className="basis-1/3 font-bold text-xl gradient-text text-center p-3">
                  {assistant.email}
                </h2>
                <h2 className="basis-1/3 font-bold text-xl gradient-text text-center p-3">
                  {assistant.phoneNumber}
                </h2>
              </div>
            );
          })}
        </>
      </div>
      <Footer />
    </>
  );
}
export default DoctorAssistant;
