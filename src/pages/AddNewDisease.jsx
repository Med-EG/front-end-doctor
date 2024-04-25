import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Disease from "../services/DiseaseServices";
import MyCombobox from "../components/common/ComboBox";
import Header from "@/components/common/Header";
import useRequireAuth from "@/custom hooks/useRequireAuth";

function AddNewDisease() {
  useRequireAuth();
  const navigate = useNavigate();
  const [diseaseInfo, setDiseaseInfo] = useState(new Disease());
  const [allDiseases, setAllDiseases] = useState([]);
  const [name, setName] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    diseaseInfo
      .getAllDiseases()
      .then((response) => setAllDiseases(response.data));
  }, []);

  const handleNavigateToDisease = () => {
    navigate("/medicalRecord/medication");
  };
  const handleNavigateToBasic = () => {
    navigate("/medicalRecord");
  };

  const handlesubmit = (e) => {
    e.preventDefault();

        diseaseInfo.addDiseaseByPatient(name)
        .then(navigate("/record"))
        .catch(setError("please enter disease name"));
        var inputs = document.getElementsByClassName("disease_info");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = ""; 
        }
    }
    return (
        <>

        <Header/>
            <section className="w-full h-full overflow-y-scroll ">
               

                {/* The Form  */}
                {/* ============================ */}
                <div className="text-center lg:w-10/12 md:w-11/12 sm:w-full xs-width-full flex justify-center items-center m-auto">
                    <form className="w-full p-10">
                        <div className="py-6 first:pt-0 last:pb-0 lg:w-3/4 md:w-3/4 sm:w-full xs-width-full m-auto first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                            <h2 className="font-bold text-5xl gradient-text text-start py-5">Disease Information</h2>
                            <div className="mt-2 space-y-3">

                                <MyCombobox options={allDiseases} setName={setName} placeholder={"Disease Name"} />
                                

                {/* Notes */}
                <div className="relative">
                  <textarea
                    id="hs-floating-textarea"
                    className="disease_info peer p-4 block w-full border-blue-300 border-2 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                    rows="3"
                    placeholder="This is a textarea placeholder"
                    onChange={(e) => (diseaseInfo.notes = e.target.value)}
                  ></textarea>
                  <label
                    htmlFor="hs-floating-textarea"
                    className="absolute top-0 start-0 p-4 h-full gradient-text text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                  >
                    Notes
                  </label>
                </div>
                <h2>{error}</h2>
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
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddNewDisease;
