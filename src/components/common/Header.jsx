import NavLink from "./NavLink";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import user from "../../assets/user-128.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorByID, doctorLogout } from "../../services/homeServices";

const Header = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState([]);
  const role = localStorage.getItem("role");

  const [loading, setLoading] = useState(true); // Start with true

  useEffect(() => {
    getDoctorByID(localStorage.getItem("id"))
      .then((res) => {
        setProfileInfo(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function edit() {
    navigate("/updateProfile");
  }

  function medicalrecord() {
    navigate("/allWorkingDays");
  }

  const logout = async () => {
    doctorLogout(localStorage.getItem("token"))
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        window.location.href = "http://localhost:5173/login";
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navLinks = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Medical Records",
      to: "/MedicalRecord",
    },
    {
      label: "Chat",
      to: "/chat",
    },
    {
      label: "Appointments",
      to: `/Appointments/${localStorage.getItem("id")}`,
    },
    {
      label: "Doctor Assistants",
      to: "/doctor/assistants",
    },
  ];

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-100 w-full py-7">
          <nav
            className="relative max-w-screen-xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto"
            aria-label="Global"
          >
            <div className="md:col-span-3">
              <Link
                to="/"
                className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                aria-label="Preline"
              >
                <img src={logo} alt="logo" className="w-40" />
              </Link>
            </div>
            <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={`https://api-medeg.online/${profileInfo?.doctor?.doctor_image}`}
                    alt={user}
                    className="rounded-full w-12 h-12 primary-color bg-blue-1"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl">
                  <DropdownMenuItem className="px-5 py-8">
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="primary-color primary-text-semibold text-center">
                          {profileInfo?.doctor?.first_name}{" "}
                          {profileInfo?.doctor?.last_name}
                        </h2>
                        <h2 className="primary-color primary-text-semibold text-center">
                          {profileInfo?.doctor?.specialization}
                        </h2>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
                    <button onClick={edit}>Edit Profile</button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
                    <button onClick={medicalrecord}>
                      Edit Working Days & Hours
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex justify-center text-red-500 secondary-text-semibold focus:bg-red-400 focus:text-white">
                    <button onClick={logout}>Log Out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="md:hidden">
                <button
                  type="button"
                  className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={toggleCollapse}
                  aria-label="Toggle navigation"
                >
                  <svg
                    className={
                      isCollapsed
                        ? "hs-collapse-open:hidden flex-shrink-0 size-4"
                        : "hs-collapse-open:block hidden flex-shrink-0 size-4"
                    }
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
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              id="navbar-collapse-with-animation"
              className={`hs-collapse ${
                isCollapsed ? "hidden" : ""
              } overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6`}
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    <Link
                      to={link.to}
                      className="relative inline-block text-blue-900 font-medium before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1"
                      aria-current="page"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
