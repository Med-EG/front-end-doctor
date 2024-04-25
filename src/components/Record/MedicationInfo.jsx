import Read from "../../assets/Read.svg";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import MedicineModal from "../common/MedicineModal";
import { useEffect } from "react";
import { deleteMedicine } from "@/services/Record";
import { Link } from "react-router-dom";
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
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

function MedicationInfo({ medications }) {
  const navigate = useNavigate();

  // Function to handle deletion of medicine
  const handleDelete = (medicineId) => {
    // Call the deleteMedicine function with the medicine ID
    deleteMedicine(medicineId)
      .then(() => {
        // Do something after successful deletion, e.g., update state or show a message
        window.location.reload();
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error("Error deleting medicine:", error);
      });
  };

  // Function to handle navigation to the Edit page
  const handleUpdate = (medicineId) => {
    // Navigate to the Edit page with the allergy ID as a parameter
    navigate(`/MedicineEdit/${medicineId}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl">
          Medication Information :
        </h2>
        <Link to={"/addMedicine"}>
          <button>
            <i
              class="fa-solid fa-circle-plus fa-2x"
              style={{ color: "#2d66c8" }}
            ></i>
          </button>
        </Link>
      </div>
      <ul className="pt-4">
        {medications &&
          medications.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  {item.medicine_name}
                </h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <MedicineModal
                  title="Medicines Info."
                  itemName={item.medicine_name}
                  notes={item.notes}
                  dose={item.dose}
                  frequency={item.frequency}
                />
                {/* Call handleUpdate function on button click */}
                <button onClick={() => handleUpdate(item.id)}>
                  <img src={Edit} alt="" className="w-1/8 aspect-square" />
                </button>{" "}
                {/* Pass a function reference to onClick */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    {" "}
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
    </>
  );
}

export default MedicationInfo;
