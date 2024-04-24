import { useEffect, useState } from "react";
import jsonData from "../../DB/governorates.json";
import DropDown from "../common/dropDown";
import { allSpecializations } from "@/services/doctors";
function Filter({ setArea , setSpecialization , setSearch }) {
    const [specializations, setspecialization] = useState([]);
    useEffect(() => {
        allSpecializations()
            .then(response => setspecialization(response.data))
    }, [])
    return (
        <>
            <section className="py-3 mb-5 w-11/12 m-auto">
                <div className='flex lg:flex-row md:flex-row sm:flex-col xs-flex-col gap-3 w-full border-2 border-blue-500 rounded-lg'>
                    {/* Area drop down */}
                    <div className="lg:w-4/12 md:w-4/12 sm:w-full xs-width-full">
                        <div className="relative w-full">
                            <select className="peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={null}  onChange={(e)=>setArea(e.target.value)}>
                                <option >{null}</option>
                                {jsonData.data && jsonData.data.map((item, index) => (
                                    <option key={index}>{item.governorate_name_en}</option>
                                ))}
                            </select>
                            <label className="absolute border-blue-300 gradient-text  text-lg top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text"><i className="fa-solid fa-earth-americas"> <span className="primary-text-semibold text-md px-2">Area</span></i></label>
                        </div>

                    </div>


                    {/* Specialization drop down */}
                    <div className="lg:w-4/12 md:w-4/12 sm:w-full xs-width-full">
                        <div className="relative w-full">
                            <select className="peer border-transparent p-4 pe-9 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={null} onChange={(e)=>setSpecialization(e.target.value)} >
                                <option >{null}</option>
                                {specializations.specializations && specializations.specializations.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                            <label className="absolute border-blue-300 gradient-text  text-lg top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text"><i className="fa-solid fa-capsules"> <span className="primary-text-semibold text-md px-2">Specialization</span></i></label>
                        </div>

                    </div>

                    {/* Specialization drop down */}
                    <div className="lg:w-4/12 md:w-4/12 sm:w-full xs-width-full">
                        <div className="relative w-full">
                            <input type="text" id="hs-floating-input-name" className="peer p-4 border-transparent block w-full border-blue-300  rounded-lg text-md text-blue-900  focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" placeholder="" onChange={(e)=>setSearch(e.target.value)}/>
                            <label htmlFor="hs-floating-input-name" className="gradient-text absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"><i className="fa-solid fa-magnifying-glass"></i>  Search</label>
                        </div>

                    </div>
                </div>
            </section>

        </>);
}

export default Filter;