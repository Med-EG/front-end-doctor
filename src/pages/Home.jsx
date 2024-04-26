import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import DoctorAssistantSection from "@/components/homeComponents/DoctorAssistantSection";
import { useEffect } from "react";
import Faqs from "@/components/common/Faqs";
import MedicalRecord from "@/components/homeComponents/MedicalRecord";
import DoctorChat from "@/components/homeComponents/DoctorChat";
import Main1 from "@/components/homeComponents/Main1";
import MobileApp from "@/components/homeComponents/MobileApp";

const Home = () => {
  return (
    <div className="flex flex-col gap-14">
      <Header />

      <Main1 />

      {/* keep updated section */}
      <MedicalRecord />
      {/* chat with dr section */}
      <DoctorChat />
      {/* Frequently asked questions section */}
      <DoctorAssistantSection />
      <div className="w-10/12 flex justify-center flex-col self-center items-center pb-24 pt-10">
        <Faqs />
      </div>
      {/* download the mobile app section  */}
      <MobileApp />
      {/* <div className="container">
        <div className="max-w-md mx-auto bg-white  md:max-w-7xl">
          <div className="md:flex relative justify-between items-center">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48 absolute left-0 top-0"
              src={frame}
              alt="frame"
            />
            <div className="flex flex-col gap-2 pl-4">
              <h1 className="secondary-color primary-text-bold text-5xl max-w-lg">
                Download the Mobile App now
              </h1>
              <p className="blue-1 primary-text-thin text-2xl">
                & Don’t miss the medicine Alert
              </p>
              <button
                onClick={handleClick3}
                id="imageButton"
                // className="bg-blue-1 primary-text-bold offwhite px-3 py-2 text-md rounded-full max-w-52 "
              >
                <img src={google} alt="" />
              </button>
            </div>
            <img src={mobile} alt="" />
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
