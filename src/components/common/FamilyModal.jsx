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

function FamilyModal({ title, itemDiseases, itemTitle }) {
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
          <h2 className="primary-text-medium text-2xl primary-color">
              {itemTitle} :
            </h2>
          <h2 className="text-lg font-semibold blue-1">
            {itemDiseases}
          </h2>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="py-3 px-5 rounded-xl shadow-slate-400 shadow-md">exit</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FamilyModal;
