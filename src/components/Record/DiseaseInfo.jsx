import Read from "../../assets/Read.svg";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import Modal from "../common/DiseaseModal";
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
import { deleteDisease } from "@/services/Record";

function DiseaseInfo({ diseases }) {
  const navigate = useNavigate();

  // Function to handle deletion of disease
  const handleDelete = (diseaseId) => {
    // Call the deleteDisease function with the disease ID
    deleteDisease(diseaseId)
      .then(() => {
        // Optionally, you can navigate to another page after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error("Error deleting disease:", error);
      });
  };

  // Function to handle navigation to the Edit page
  const handleUpdate = (diseaseId) => {
    // Navigate to the Edit page with the allergy ID as a parameter
    navigate(`/DiseaseEdit/${diseaseId}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl">
          Diseases Information :
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
        {diseases &&
          diseases?.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  {item.disease_name}
                </h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <Modal
                  title="Disease Info."
                  itemName={item.disease_name}
                  notes={item.notes}
                />
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
    </>
  );
}

export default DiseaseInfo;
