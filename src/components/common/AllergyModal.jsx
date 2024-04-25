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

function AllergyModal({
  title,
  itemName,
  allergyType,
  bodyResponse,
  severityLevel,
}) {
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
              Allergy Name :
            </span>{" "}
            {itemName}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Allergy Type :
            </span>{" "}
            {allergyType}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Severity Level :
            </span>{" "}
            {severityLevel}
          </h2>
          <h2 className="text-lg font-semibold blue-1">
            <span className="primary-text-medium text-2xl primary-color">
              Body Response :
            </span>{" "}
            {bodyResponse}
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

export default AllergyModal;
