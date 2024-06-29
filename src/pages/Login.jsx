import logo from "../assets/logo.svg";
import logoIcon from "../assets/LogoIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/DoctorRegisterServices";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "http://localhost:5173/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "/";
      let path = window.location.pathname;
      const response = await login(email, password);
      if (response.doctor) {
        localStorage.setItem("id", `${response.doctor.doctor_id}`);
        localStorage.setItem("role", "doctor");
      }
      else {
        localStorage.setItem("id", `${response.assistant.doctor_id}`);
        localStorage.setItem("role", "assistant");
      }
      localStorage.removeItem("token");
      localStorage.setItem("token", response.token);
      
      if (path == "/doctor/assistant/login"){
        url = `/Appointments/${localStorage.getItem("id")}`;
      }
      navigate(url);
      window.location.reload();

    } catch (error) {
      setPassError("Invalid Email Or Password");
    }
  };
  return (
    <>
      <section className="dark:bg-slate-900 flex w-screen h-screen items-center justify-center relative">
        <img
          src={logoIcon}
          alt=""
          className="lg:opacity-10 md:opacity-0 sm:opacity-0 mr-5 w-full h-screen mb-50 absolute lg:bottom-1/6 lg:right-1/4 opacity-faded"
        />

        <div className="m-10 absolute lg:right-0 lg:w-1/2 z-10 lg:flex lg:justify-end  md:w-full md:m-auto   ">
          <div className="p-4  lg:w-3/4 md:w-full md:px-20 sm:w-full sm:m-auto sm-p-0 ">
            <div className="text-center flex justify-center items-center">
              <img src={logo} alt="" className=" p-5" />
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 gradient-text font-bold dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      name="email"
                      className=" border-2 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                      aria-describedby="email-error"
                      onChange={(e) => setEmail(e.target.value)}
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

                <div className=" mb-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 gradient-text font-bold dark:text-white"
                    >
                      Password
                    </label>
                    <a
                      className="text-sm gradient-text  decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="../examples/html/recover-account.html"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    id="hs-toggle-password-with-checkbox"
                    type="password"
                    value={password}
                    className="py-3 px-4 block w-full border-gray-200 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex mt-4">
                    <input
                      data-hs-toggle-password='{"target": "#hs-toggle-password-with-checkbox"}'
                      id="hs-toggle-password-checkbox"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                    <label
                      htmlFor="hs-toggle-password-checkbox"
                      className="text-sm text-gray-500 ms-3 dark:text-gray-400"
                    >
                      Show password
                    </label>
                  </div>

                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>
                {/* Error message */}
                <h2 className=" text-center text-red-700 font-semibold">
                  {passError}
                </h2>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Login
                </button>

                <div className="text-center">
                  <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                    Or
                  </div>

                  <p className="mt-2 text-sm gradient-text  dark:text-gray-400">
                    Don't have an account yet?
                    <a
                      className="gradient-text mx-1 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/signup"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
