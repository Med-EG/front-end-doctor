import React from "react";
import { MdOutlineClose } from "react-icons/md"; // Import the close icon
import toast from "react-hot-toast";

const Notification = ({ title, text }) => {
  return (
    <div className="notificationWrapper">
      <div className="contentWrapper flex flex-row gap-4">
        <h1>{title}</h1>
        <div className="flex flex-col text-start">
        
        {text && typeof(text)=="string"? 
        <p>{text}</p>
        : text.map((item,index)=>(
          <p key={index}>{item}</p>
        ))}
        </div>
      </div>
      <MdOutlineClose className="closeIcon" onClick={() => toast.dismiss()} />
    </div>
  );
};
export default Notification;
