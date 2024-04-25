import { useNavigate } from 'react-router-dom';
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import icon from '../../assets/face_id.svg';
function Face_ID() {

    const [image,setimage]=useState("");
    const [count,setCount] = useState(0);
    const navigate = useNavigate();

    const nextpage = () => {
        navigate('/medicalRecord/finish');
    };
    const backward = () => {
        navigate('/medicalRecord/family');
    };

    const webcamRef = useRef(null);

    const capture = async (e) => {
        e.preventDefault();
        setCount(count+1);
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = base64ToBlob(imageSrc, 'image/jpeg');
    
        // Create FormData object
        const formData = new FormData();
        formData.append('face_image', blob);
        formData.append('patient_id', localStorage.getItem("id")); // Assuming you have patientId stored somewhere
    
        try {
            const response = await fetch('https://api-medeg.online/api/medEG/face-id', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                console.log('Image uploaded successfully');
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
    // Function to convert base64 to Blob
    const base64ToBlob = (base64, mime) => {
        const byteChars = atob(base64.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteChars.length);
        const byteArray = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < byteChars.length; i++) {
            byteArray[i] = byteChars.charCodeAt(i);
        }
    
        return new Blob([arrayBuffer], { type: mime });
    };
    return (
        <>

            <section className="w-full h-full overflow-y-scroll ">
                {/* Progress Bar Component */}
                <div className="flex w-full h-3.5 bg-gray-200  overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                    <div className="flex flex-col justify-center overflow-hidden gradient-background text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" style={{ width: '100%' }}></div>
                </div>

                {/* The Form  */}
                {/* ============================ */}
                <div className="text-center lg:w-10/12 md:w-11/12 xs-width-full m-auto p-5">
                    <form className="w-full lg:p-10 md:p-0">
                        <div className="p-6 flex flex-col justify-center items-center gap-4 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                            <div className='mt-5 flex gap-5'>
                                <img src={icon} alt="" className='w-1/2' />
                                <h2 className="font-bold text-5xl gradient-text text-start py-5">FaceID</h2>
                            </div>

                            <div className='w-full h-full flex flex-col items-center justify-center'>

                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className='md:w-1/2 xs-width-full border-blue-600 border-8 rounded-lg'
                                />
                                <button onClick={capture} className='w-1/2 bg-blue-500 my-3 p-5 text-white rounded-lg' disabled={count==6}>Capture Photo</button>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-bold text-xl '>{count}/6</h2>
                        </div>
                    </form>
                    <div className="flex justify-between">
                        <button type="button" className="py-3 px-4 w-1/4 inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border-2  border-blue-300 bg-transparent text-blue-700  disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert" onClick={backward}>
                            back
                        </button>

                        <button type="button" className="py-3 px-4 w-1/4 inline-flex items-center justify-center mt-9 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert" onClick={nextpage}>
                            Finish
                        </button>

                    </div>
                </div>

            </section>

        </>
    );
}

export default Face_ID;