import { useNavigate } from "react-router-dom";
import Hero from "../common/Hero";
import chat from "../../assets/chatwithdrsection.svg";

function DoctorChat() {
  const navigate = useNavigate();
  const title = "Don’t miss any detail with your doctor ";
  const button = "Chat with Doctor Now ";
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <Hero title={title} button={button} onClick={handleClick} src={chat} />
  );
}

export default DoctorChat;
