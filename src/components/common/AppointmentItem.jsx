const AppointmentItem = ({ time, reserved, onReserve }) => {
  return (
    <div
      className={`p-2 cursor-pointer ${
        reserved ? "bg-blue-500 text-white" : "bg-white text-blue-500"
      }`}
      onClick={() => !reserved && onReserve(time)}
    >
      {time}
    </div>
  );
};
export default AppointmentItem;
