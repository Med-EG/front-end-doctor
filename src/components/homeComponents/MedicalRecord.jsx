import Secondary from "../common/Secondary";
import group from "../../assets/Group.svg";
import { useNavigate } from "react-router-dom";

function MedicalRecord() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/record");
  }
  const title = " Keep Updated With Your Health Tracks";
  const description =
    "Update your medical record and make sure it contain all the accurate information";
  const button = "Go to medical record";
  return (
    <Secondary
      src={group}
      title={title}
      description={description}
      onClick={handleClick}
      button={button}
    />
  );
}

export default MedicalRecord;
