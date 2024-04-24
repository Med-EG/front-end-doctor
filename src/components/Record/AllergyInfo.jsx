import React from "react";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import AllergyModal from "../common/AllergyModal";
import { deleteAllergy } from "@/services/Record";
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
function AllergyInfo({ allergy }) {
  const navigate = useNavigate();

  // Function to handle deletion of allergy
  const handleDelete = (allergyId) => {
    // Call the deleteAllergy function with the allergy ID
    deleteAllergy(allergyId)
      .then(() => {
        // Optionally, you can navigate to another page after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error("Error deleting allergy:", error);
      });
  };

  // Function to handle navigation to the Edit page
  const handleUpdate = (allergyId) => {
    // Navigate to the Edit page with the allergy ID as a parameter
    navigate(`/AllergyEdit/${allergyId}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl">
          Allergy Information :
        </h2>
        <Link to={"/addAllergy"}>
          <button>
            <i
              class="fa-solid fa-circle-plus fa-2x"
              style={{ color: "#2d66c8" }}
            ></i>
          </button>
        </Link>
      </div>
      <ul className="pt-4">
        {allergy &&
          allergy.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  {item.allergy_name}
                </h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <AllergyModal
                  title="Allergy Info."
                  itemName={item.allergy_name}
                  allergyType={item.allergy_type}
                  bodyResponse={item.body_response}
                  severityLevel={item.severity_level}
                />
                {/* Call handleUpdate function on button click */}
                <button onClick={() => handleUpdate(item.id)}>
                  <img src={Edit} alt="" className="w-1/8 aspect-square" />
                </button>
                {/* Pass a function reference to onClick */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button>
                      <img
                        src={Delete}
                        alt=""
                        className="w-1/8 aspect-square"
                        // onClick={() => handleDelete(item.id)}
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

export default AllergyInfo;
