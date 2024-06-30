import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { setNewAssistant } from "@/services/DoctorRegisterServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorAssistantCreate() {
    const doctorId = localStorage.getItem("id");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Call the API or perform the necessary action to create a new assistant
        await setNewAssistant(doctorId, name, email, password);
        navigate('/doctor/assistants');

      } catch (error) {
        console.log(error)
        setError(error);
      }
    };
    return (
      <>
        <Header />
        <div className="text-center w-full flex justify-center items-center m-auto">
            <h2 className="font-bold text-5xl gradient-text text-start py-5">New Assistant</h2>
        </div>
        <div className="text-center w-full flex justify-center items-center m-auto">
          {error.response ? <p className="font-bold gradient-text text-start py-5  text-rose-600"> {error.response.data.error.email[0]}</p> : null }
        </div>
        <div className="">
          <div className="p-4  lg:w-10/12 md:w-full md:px-20 sm:w-full sm:m-auto sm-p-0">
          
            <form method="POST">
            <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                    <label className=" text-sm mb-2 gradient-text font-bold dark:text-white">
                        Full Name                  
                    </label>
                    <div className="relative">
                        <input
                        type="text"
                        id="text"
                        name="text"
                        className=" border-2 py-3 px-4 block w-full border-blue-200 rounded-3xl bg-[#F1F3F5] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="text-error"
                        onChange={(e)=>setName(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                            className="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        </div>
                    </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <div>
                    <label className=" text-sm mb-2 gradient-text font-bold dark:text-white">
                        E-mail                  
                    </label>
                    <div className="relative">
                        <input
                        type="text"
                        id="text"
                        name="text"
                        className=" border-2 py-3 px-4 block w-full border-blue-200 rounded-3xl bg-[#F1F3F5] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="text-error"
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                            className="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        </div>
                    </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <div>
                    <label className=" text-sm mb-2 gradient-text font-bold dark:text-white">
                        Phone Number                 
                    </label>
                    <div className="relative">
                        <input
                        type="text"
                        id="text"
                        name="text"
                        className=" border-2 py-3 px-4 block w-full border-blue-200 rounded-3xl bg-[#F1F3F5] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="text-error"
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                            className="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        </div>
                    </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <div>
                    <label className=" text-sm mb-2 gradient-text font-bold dark:text-white">
                        Password                  
                    </label>
                    <div className="relative">
                        <input
                        type="password"
                        id="text"
                        name="text"
                        className=" border-2 py-3 px-4 block w-full border-blue-200 rounded-3xl bg-[#F1F3F5] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="text-error"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg
                            className="size-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        </div>
                    </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                {/* Error message */}
                <h2 className=" text-center text-red-700 font-semibold">
                </h2>

            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-80 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-3xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                    Add
                </button>
            </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  export default DoctorAssistantCreate