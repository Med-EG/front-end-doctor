import Main from "../common/Main";
import { useNavigate } from "react-router-dom";
import mobile from "../../assets/mobile-phone.svg";
import google from "../../assets/google.svg";

function MobileApp() {
  const navigate = useNavigate();
  const title = "Download the Mobile App now";
  const button = <img src={google} alt="Google Icon" />;
  function handleClick() {
    navigate("/mobileApp");
  }
  return (
    <>
      <Main title={title} button={button} onClick={handleClick} src={mobile} mobileClassName={"w-1/2 m-auto"} />
    </>
  );
}

export default MobileApp;
