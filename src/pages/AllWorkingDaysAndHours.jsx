import Header from "@/components/common/Header";
import { useEffect, useState } from "react";
import {
  getAllWorkingDaysForADoctor,
  getAllWorkingHoursForADoctor,
} from "../services/DoctorRegisterServices";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import Read from "../assets/Read.svg";

import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  useEffect(() => {
    getAllWorkingDaysForADoctor()
      .then((response) => {
        setWorkingDays(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  function handleClick($dayid) {
    navigate(`/workingDayDetails/${$dayid}`);
  }
  return (
    <div className="container">
      <Header />

      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl">
          Doctor's Schedule Management :
        </h2>
        <Link to={"/addDisease"}>
          <button>
            <i
              class="fa-solid fa-circle-plus fa-2x"
              style={{ color: "#2d66c8" }}
            ></i>
          </button>
        </Link>
      </div>

      <ul className="pt-4">
        {workingDays &&
          workingDays?.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  {item.day_of_week}
                </h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <button
                  onClick={() => {
                    handleClick(item.working_day_id);
                  }}
                >
                  <img src={Read} alt="" />
                </button>
                {/* Call handleUpdate function on button click */}
                <button onClick={() => handleUpdate(item.id)}>
                  <img src={Edit} alt="" className="w-1/8 aspect-square" />
                </button>{" "}
                {/* Pass a function reference to onClick */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button>
                      <img
                        src={Delete}
                        alt=""
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
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={"bg-red-600"}
                        onClick={() => handleDelete(item.id)}
                      >
                        continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AllWorkingDaysAndHours;
