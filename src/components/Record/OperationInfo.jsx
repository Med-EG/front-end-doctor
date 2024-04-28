import React from "react";
import Read from "../../assets/Read.svg";
import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import OperationModal from "../common/OperationModal";
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
import { useEffect } from "react";
import { deleteOperation } from "@/services/Record";
import { Link } from "react-router-dom";
import AddNewOperation from "@/pages/AddNewOperation";
import OperationEditPage from "@/pages/OperationEditPage";

function OperationInfo({ operation , forceRerender ,med_id}) {

  // Function to handle deletion of operation
  const handleDelete = (operationId) => {
    // Call the deleteOperation function with the operation ID
    deleteOperation(operationId)
      .then(() => {
        // Optionally, you can navigate to another page after successful deletion
        // window.location.reload();
        forceRerender();
      })
      .catch((error) => {
        // Handle error if deletion fails
        console.error("Error deleting operation:", error);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-start font-bold gradient-text text-3xl">
          Operation Information :
        </h2>
        <AddNewOperation med_id={med_id} forceRerender={()=>forceRerender()}/>
      </div>
      <ul className="pt-4">
        {operation &&
          operation.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  {item.operation_name}
                </h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <OperationModal
                  title="Operation Info."
                  itemName={item.operation_name}
                  surgeonName={item.surgeon_name}
                  opDate={item.operation_date}
                  complications={item.complications}
                  notes={item.operation_notes}
                />
                {/* Call handleUpdate function on button click */}
                <OperationEditPage med_id={med_id} item={item} forceRerender={()=>forceRerender()} />

                {/* Pass a function reference to onClick */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button>
                      {
                        <img
                          src={Delete}
                          alt=""
                          className="w-1/8 aspect-square"
                          // onClick={() => handleDelete(item.id)}
                        />
                      }
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
                        className={"bg-red-600 py-3 px-5 rounded-xl primary-text-semibold text-white "}
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

export default OperationInfo;
