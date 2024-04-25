import phone from "../../assets/phone.svg";
import locationIcon from "../../assets/locationIcon.svg";
import payment from "../../assets/Payment.svg";
function DetailsCard({
  src,
  name,
  specialization,
  description,
  phoneNumber,
  location,
  bio,
  price,
  scientificDegree,
  education,
  yearsOfExp,
  rating,
}) {
  return (
    <div className=" lg:w-9/12 md:w-9/12 sm:w-9/12 xs-width-full m-auto flex justify-center items-center ">
      <div className=" bg-white border flex lg:flex-row md:flex-col sm:flex-col xs-flex-col justify-center items-start rounded-xl shadow-2xl ">
        {/* image */}
        <div className=" lg:w-1/2 md:w-full sm:w-full xs-width-full overflow-hidden flex items-center justify-center p-7 ">
          <img className="object-cover aspect-square w-full rounded-xl" src={src} alt="Image Description" />
        </div>
        {/* doctor information */}
        <div className="flex flex-col md:gap-14 m-6 h-full gap-10">
          <div className="gap-4  flex flex-col justify-center h-full shadow-md shadow-gray-400 p-5 rounded-xl">
            <h1 className="text-4xl primary-text-extrabold secondary-color xs-text-center dark:text-white">
              {name}
            </h1>
            <div className="flex lg:flex-row md:flex-row sm:flex-col xs-flex-col  primary-text-regular text-xl  justify-between items-center">
              <h3 className="gradient-text">{specialization}</h3>
              <h3 className="gradient-text">{scientificDegree}</h3>
            </div>
          </div>
          <div className="flex  flex-col h-full">
            {
              bio &&
              <>
                <h2 className="primary-text-bold gradient-text  text-2xl">
                  Doctor Info
                </h2>
                <p className="mt-1 text-blue-900 opacity-40 max-w-lg text-lg">{bio}</p>
              </>

            }
          </div>
          <div className="flex justify-between items-start blue-1 gap-10 h-full text-lg">
            <ul className="max-w-xs flex flex-col items-start justify-center gap-6">
              <li className="flex items-center gap-4">
                <img src={phone} alt="" />
                <p>{phoneNumber}</p>
              </li>
              <li className="flex items-center gap-4">
                <img src={locationIcon} alt="" />
                <p>{location}</p>
              </li>
              <li className="flex items-center gap-4">
                <img src={payment} alt="" />
                <p>{price}</p>
              </li>
            </ul>
            <ul className="max-w-xs flex flex-col items-start justify-center gap-4">
              <li className="flex items-center gap-4">
                <p> Years Of Experience : {yearsOfExp}</p>
              </li>
              <li className="flex items-center gap-4">
                <p>Education : {education}</p>
              </li>
              <li className="flex items-center gap-4">
                <p>Rating : {rating}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsCard;
