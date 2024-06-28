import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import {
  deleteWorkingDay,
  getAllWorkingDaysForADoctor,
  getAllWorkingHoursForADoctor,
} from "../services/DoctorRegisterServices";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import Read from "../assets/Read.svg";

import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

function AllWorkingDaysAndHours() {
  const TABLE_HEAD = [
    { id: "id", label: "#" },
    { id: "day_of_week", label: "Day" },
    { id: "start_time", label: "Start Time", width: 180 },
    { id: "end_time", label: "End Time", width: 180 },
    { id: "actions", label: "Actions", width: 88 },
  ];

  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);

  useEffect(() => {
    getAllWorkingHoursForADoctor().then((res) => {
      setWorkingHours(res.data);
      console.log(res.data);
    });
    getAllWorkingDaysForADoctor()
      .then((response) => {
        setWorkingDays(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  const handleClick = () => {
    navigate("/addNewWorkingDays");
  };
  const handleDelete = async (dayId) => {
    try {
      await deleteWorkingDay(dayId);
      setWorkingDays((prevDays) =>
        prevDays.filter((day) => day.working_day_id !== dayId)
      );
    } catch (error) {
      console.error("Error deleting working day:", error);
    }
  };
  return (
    <div className="container">
      <Header />
      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl mb-14">
          Doctor's Schedule Management :
        </h2>
        <Link to={"/EditWorkingDays"}>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            <i
              className="fa-solid fa-circle-plus fa-2x"
              style={{ color: "#2d66c8" }}
            ></i>
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {TABLE_HEAD.map((column) => (
                <th
                  key={column.id}
                  style={{ width: column.width }}
                  className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workingDays.map((day, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  {day.working_day_id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  {day.day_of_week}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  {workingHours.find(
                    (wh) => wh.working_day_id === day.working_day_id
                  )?.start_time || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  {workingHours.find(
                    (wh) => wh.working_day_id === day.working_day_id
                  )?.end_time || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleUpdate(day.working_day_id)}>
                      <img
                        src={Edit}
                        alt="Edit"
                        className="w-1/8 aspect-square"
                      />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button>
                          <img
                            src={Delete}
                            alt="Delete"
                            className="w-1/8 aspect-square"
                          />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this working day .
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 rounded p-3 text-white"
                            onClick={() => handleDelete(day.working_day_id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllWorkingDaysAndHours;
