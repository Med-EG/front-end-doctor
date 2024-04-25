import { checkAvailability,checkAvailabilityForHours, getWorkingHours } from "@/services/AppointmentServices";
import { useState , useEffect } from "react";

function WorkingHours({ dayID , setAppointmentTime , date , doctor}) {
    const [selectedTime, setSelectedTime] = useState(null);
    const [workingHours, setWorkingHours] = useState([]);
    const [BookedHours, setBookedHours] = useState([]);

    function incrementHalfHour(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let nextHour = hours;
        let nextMinute = minutes + 30;
        
        if (nextMinute >= 60) {
          nextHour = (nextHour + 1) % 24;
          nextMinute -= 60;
        }
        
        return `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        getWorkingHours(dayID)
        .then(res => {
            const startTime = formatTime(res.data.working_hours[0].start_time);
            const endTime = formatTime(res.data.working_hours[0].end_time);
            settingHours(startTime, endTime);
            checkingTime();
        });
    }, [date]);

    function settingHours(start, end) {
        let arr = [];
        let current = start;

        while (current <= end) {
            arr.push(current);
            // Increment current time by half an hour
            current = incrementHalfHour(current);
        }

        setWorkingHours(arr);
    }
    function format_12_Time(timeString) {
        const [hours, minutes] = timeString.split(':');
        let formattedHours = parseInt(hours);
        const ampm = formattedHours >= 12 ? 'PM' : 'AM';
        formattedHours = formattedHours % 12 || 12; // Convert hours to 12-hour format
        return `${formattedHours}:${minutes} ${ampm}`;
      }

      function checkingTime(){
        checkAvailabilityForHours(date,doctor)
        .then(response=>setBookedHours(response))
        .catch(err=>{throw err});
      }

    return (
        <>
            <section className="w-full p-5 flex justify-center mb-10">
                <div className="grid text-center grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6 w-full">
                    {workingHours && workingHours.map((time,index)=>(
                        BookedHours && !BookedHours.includes(time)?
                         <button 
                         className={`p-3 md:p-4 bg-gray-100 rounded-full border-2 border-blue-900 shadow-gray-300 dark:bg-neutral-800 ${
                             selectedTime == time ? 'gradient-background text-white' : '' // Change background color if selected
                         }`}
                         key={index} 
                         onClick={() => {
                            setSelectedTime(time);
                            setAppointmentTime(time);
                         }}
                     >
                        <h2 className={`font-bold text-lg gradient-text
                        ${
                            selectedTime == time ? ' text-white' : '' // Change background color if selected
                        }
                        `}>{format_12_Time(time)}</h2>
                      </button>
                      :
                      <button 
                      className={`p-3 md:p-4 bg-gray-100 rounded-full border-2 border-blue-900 shadow-gray-300 dark:bg-neutral- opacity-20 cursor-not-allowed ${
                          selectedTime == time ? 'bg-blue-500 text-white' : '' // Change background color if selected
                      }`}
                      key={index} 
                      onClick={() => {
                         setSelectedTime(time);
                         setAppointmentTime(time);
                      }}
                      disabled={true}
                  >
                     <h2 className="font-bold text-lg gradient-text">{format_12_Time(time)}</h2>
                   </button>

                    ))}
                </div>
            </section>
        </>
    ); 
}

export default WorkingHours;
