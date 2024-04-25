import NavLink from "./NavLink";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import user from "../../assets/user-128.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  patientLogout,
  getDoctorByID,
} from "../../services/homeServices";

const Header = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState([]);
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    const today = new Date();
    const birthDateObj = new Date(profileInfo?.patient?.birth_date);
    const diff = today - birthDateObj;
    const ageDate = new Date(diff);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    setAge(calculatedAge);
  };
  useEffect(() => {
    calculateAge();
  }, [profileInfo]);

  useEffect(() => {
    getDoctorByID(10)
      .then((res) => {
        setProfileInfo(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  function edit() {
    navigate("/updateProfile");
  }
  function medicalrecord() {
    navigate("/record");
  }
  // function logout() {}
  const logout = async () => {
    patientLogout(localStorage.getItem("token"))
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("med_id");
        localStorage.removeItem("role");
        window.location.href = "http://medeg-eg.com/login";
      })
      .catch((e) => {
        console.log(e);
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
      to: "/records",
    },
    {
      label: "Chat",
      to: "/chat",
    },
    {
      label: "Appointments",
      to: `/myAppointments/${localStorage.getItem("id")}`,
    },
  ];

  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-100 w-full py-7">
        <nav
          className="relative max-w-screen-xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4  md:px-8 mx-auto"
          aria-label="Global"
        >
          <div className="md:col-span-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              aria-label="Preline"
            >
              <img src={logo} alt="logo"  className="w-40"/>
            </Link>
            {/* End Logo */}
          </div>

          {/* Button Group */}
          <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={`https://api-medeg.online/${profileInfo?.patient?.personal_image}`}
                  alt={user}
                  className="rounded-full w-12 h-12 primary-color bg-blue-1"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl  ">
                <DropdownMenuItem className="px-8">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col items-center">
                      <h2 className="primary-color primary-text-semibold text-base">
                        {profileInfo?.patient?.username}
                      </h2>
                      <div className="primary-color secondary-text-semibold">
                        {age} Years old
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2 items-center">
                        <div className="blue-1 secondary-text-regular">
                          {profileInfo.height}
                          <sub className="secondary-color secondary-text-regular pl-1">
                            CM
                          </sub>
                        </div>
                        <h4 className="secondary-color secondary-text-regular">
                          Height
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <div className="blue-1 secondary-text-regular">
                          {profileInfo.weight}
                          <sub className="secondary-color secondary-text-regular pl-1">
                            KG
                          </sub>
                        </div>
                        <h4 className="secondary-color secondary-text-regular">
                          Weight
                        </h4>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
                  <button onClick={edit}>edit profile</button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
                  <button onClick={medicalrecord}>medical record</button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center  text-red-500 secondary-text-semibold  focus:bg-red-400 focus:text-white">
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
          {/* End Button Group */}

          {/* Collapse */}
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
                    className="relative inline-block text-blue-900 font-medium before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 "
                    aria-current="page"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
    </>
    // <header className="container px-14 flex justify-between items-center py-8 primary-text-semibold">
    //   {/* logo */}
    //   <DropdownMenu>
    //     <DropdownMenuTrigger >
    //       <img src={logo} alt="logo" onClick={()=>{navigate("/")}} />
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent className="sm:hidden flex-col">
    //       {navlinks.map((link, index) => (
    //         <div key={index}>
    //           <DropdownMenuItem>
    //             <NavLink to={link.to} label={link.label} />
    //           </DropdownMenuItem>
    //           {index !== navlinks.length - 1 && <DropdownMenuSeparator />}
    //         </div>
    //       ))}
    //     </DropdownMenuContent>
    //   </DropdownMenu>

    //   <div className="flex items-center justify-between md:gap-12 sm:gap-3 ">
    //     {/* navlinks */}
    //     <div className="sm:flex justify-between items-center max-w-full md:gap-12 sm:gap-4 hidden ">
    //       {navlinks.map((link, index) => (
    //         <NavLink key={index} to={link.to} label={link.label} />
    //       ))}
    //     </div>
    //     {/* profileMenu */}

    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <img
    //           src={`https://api-medeg.online/${profileInfo?.patient?.personal_image}`}
    //           alt={user}
    //           className="rounded-full w-12 h-12 primary-color bg-blue-1"
    //         />
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent className="rounded-xl  ">
    //         <DropdownMenuItem className="px-8">
    //           <div className="flex flex-col justify-center items-center gap-4">
    //             <div className="flex flex-col items-center">
    //               <h2 className="primary-color primary-text-semibold text-base">
    //                 {profileInfo?.patient?.username}
    //               </h2>
    //               <div className="primary-color secondary-text-semibold">
    //                 {age} Years old
    //               </div>
    //             </div>

    //             <div className="flex gap-6">
    //               <div className="flex flex-col gap-2 items-center">
    //                 <div className="blue-1 secondary-text-regular">
    //                   {profileInfo.height}
    //                   <sub className="secondary-color secondary-text-regular pl-1">
    //                     CM
    //                   </sub>
    //                 </div>
    //                 <h4 className="secondary-color secondary-text-regular">
    //                   Height
    //                 </h4>
    //               </div>
    //               <div className="flex flex-col gap-2 items-center">
    //                 <div className="blue-1 secondary-text-regular">
    //                   {profileInfo.weight}
    //                   <sub className="secondary-color secondary-text-regular pl-1">
    //                     KG
    //                   </sub>
    //                 </div>
    //                 <h4 className="secondary-color secondary-text-regular">
    //                   Weight
    //                 </h4>
    //               </div>
    //             </div>
    //           </div>
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
    //           <button onClick={edit}>edit profile</button>
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem className="flex justify-center primary-color secondary-text-semibold">
    //           <button onClick={medicalrecord}>medical record</button>
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem className="flex justify-center  text-red-500 secondary-text-semibold  focus:bg-red-400 focus:text-white">
    //           <button onClick={logout}>Log Out</button>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    // </header>
  );
};

export default Header;
