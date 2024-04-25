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
import Read from "../../assets/Read.svg";

function MedicineModal({ title, itemName, notes, dose, frequency }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <img src={Read} alt="" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <h1 className="gradient-text primary-text-extrabold text-3xl text-center">
              {title}
            </h1>
          </AlertDialogHeader>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Medicine Name :{" "}
            </span>
            {itemName}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Dose :
            </span>
            {dose}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Frequency :
            </span>
            {frequency}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Notes :
            </span>
            {notes}
          </h2>

          <AlertDialogFooter>
            <AlertDialogCancel>
              <span className="text-red-500 text-lg">exit</span>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MedicineModal;
