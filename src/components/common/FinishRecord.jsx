import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
function FinishRecord() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <>
      <section className="w-full h-full overflow-hidden flex justify-center items-center">
        {/* Progress Bar Component */}
        <div className="z-0 w-3/4 m-auto h-1/2 flex flex-col justify-center gap-10">
          <div
            className="rounded-full m-auto bg-gray-200"
            style={{ width: "250px" }}
          >
            <Player
              autoplay
              loop
              src="https://lottie.host/7adc677f-1bfc-49b1-ad3d-5880854859a1/hhSJJZIhHx.json"
              className="w-full h-full"
            ></Player>
          </div>
          <div>
            <h2 className="font-bold text-5xl gradient-text text-center pb-3">
              Your medical Record has been createed succefully
            </h2>
            <div className="text-center">
              <button
                onClick={handleClick}
                type="button"
                className="py-3 px-4 md:w-1/4 inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-task-created-alert"
              >
                let's Get Statred
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FinishRecord;
