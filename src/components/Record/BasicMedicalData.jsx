function BasicMedicalData({ record }) {
    const calculateAge = () => {
        const today = new Date();
        const birthDateObj = new Date(record?.patient?.birth_date);
        const diff = today - birthDateObj;
        const ageDate = new Date(diff);
        const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

        return (calculatedAge);
    }
    return (

        <>
            {
                record && record.patient && (
                    <>
                        <div className="flex gap-5 lg:flex-row sm:flex-col xs-flex-col xs-text-center justify-between md:items-top sm:items-center xs-items-center primary-text-bold">
                            <div className="image-section lg:w-1/2 md:w-3/4 xs-width-full md:text-start sm:text-center  lg:order-1 sm:order-2 xs-order-2 flex justify-start ">
                                <div className="flex lg:flex-col justify-between items-center lg:gap-0 gap-10">
                                    <div className="pb-8 text-start">
                                        <h2 className="text-4xl flex">{record.patient.first_name.toUpperCase()} {record.patient.last_name.toUpperCase()}</h2>
                                        <h2 className="text-3xl"><span className="text-blue-500">{calculateAge()}</span> Years Old</h2>
                                    </div>
                                    <div className="secondary-text-semibold text-start">
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Height : <span className="text-blue-500">{record.height}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Weight : <span className="text-blue-500">{record.weight}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Blood type : <span className="text-blue-500">{record.blood_type}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Alcoholic : <span className="text-blue-500">{record.alcoholic == 1 ? "true" : "false"}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Alcoholic level : <span className="text-blue-500">{record.alcoholic_level == "None" ? "-" : record.alcoholic_level}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Somker : <span className="text-blue-500">{record.smoker == 1 ? "true" : "false"}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Smoking level : <span className="text-blue-500">{record.smoking_level == "None" ? "-" : record.smoking_level}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Job : <span className="text-blue-500">{record.job}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Marital status : <span className="text-blue-500">{record.marital_status}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Sleeping hours : <span className="text-blue-500">{record.sleeping_hours} Hours</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Sleeping quality: <span className="text-blue-500">{record.sleeping_quality}</span></h2>
                                        <h2 className="lg:text-xl md:text-lg sm:text-base pt-1">Past fracrues: <span className="text-blue-500">{record.past_fracrues}</span></h2>
                                    </div>
                                </div>

                            </div>

                            <div className=" w-1/2 order-1 xs-order-1 flex justify-end">
                                <img src={`https://api-medeg.online/${record.patient.personal_image}`} alt="" className="w-3/4 m-auto aspect-square object-cover rounded-lg" />
                            </div>
                        </div>
                    </>
                )
            }

        </>
    );
}

export default BasicMedicalData;