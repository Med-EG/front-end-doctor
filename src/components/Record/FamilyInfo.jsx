import Edit from "../../assets/Edit.svg";
import Delete from "../../assets/Delete.svg";
import FamilyModal from "../common/FamilyModal";
import { useNavigate } from "react-router-dom";
import FatherEdit from "@/pages/FatherEdit";

function FamilyInfo({ father, mother, second }) {
  const navigate = useNavigate();
  
  return (
    <>
      <h2 className="text-start font-bold gradient-text text-3xl">
        Family Information :
      </h2>
      <ul className="pt-4">
        {father && (
          <>
            <li className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">Father</h2>
              </div>
              <div className="flex justify-end gap-3 w-1/4">
                <FamilyModal
                  title="Father's Info."
                  itemDiseases={father}
                  itemTitle="Father's Diseases"
                />
                
              </div>
            </li>
          </>
        )}
        {mother && (
          <>
            <li className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">Mother</h2>
              </div>
              <div className=" flex justify-end gap-3 w-1/4">
                <FamilyModal
                  title="Mother's Info."
                  itemDiseases={mother}
                  itemTitle="Mother's Diseases"
                />
              </div>
            </li>
          </>
        )}
        {second && (
          <>
            <li className="flex justify-between items-center py-1">
              <div>
                <h2 className="font-bold gradient-text text-xl">
                  Second Degree
                </h2>
              </div>
              <div className=" flex justify-end gap-3 w-1/4">
                <FamilyModal
                  title="Second Dergee's Info."
                  itemDiseases={second}
                  itemTitle="Second Dergee's  Diseases"
                />
              </div>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default FamilyInfo;
