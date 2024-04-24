import Main from "../common/Main";
import medicalCase from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";

function Main1() {
  const navigate = useNavigate();
  const title = "Get Ready For Your Best Ever Medical Experience!";
  const button = "Show Appointment";

  function handleClick() {
    navigate("/doctors");
  }
  return (
    <>
    <div className="w-full">

    
      <Main
        title={title}
        button={button}
        onClick={handleClick}
        src={medicalCase}
        className={
          "border-blue-900 border-2 primary-text-bold offwhite py-3 w-1/2 text-sm text-blue-900  rounded-full  z-50 hover:bg-blue-900 hover:text-white"
        }
      />
      </div>
    </>
  );
}

export default Main1;
