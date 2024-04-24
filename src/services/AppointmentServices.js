import axios from "axios";

export async function getWorkingDays(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/day/doctor/${id}`);
}

export async function getWorkingHours(dayID) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/hour/day/${dayID}`
  );
}

export async function checkAvailability(date, doctor) {
  const postData = {
    doctor_id: doctor,
    appointment_day: date,
  };
  return await axios.post(
    "https://api-medeg.online/api/medEG/check-availability",
    postData
  );
}

export async function checkAvailabilityForHours(date, doctor) {
  try {
    // Call the checkAvailability function to get appointments for the date and doctor
    const response = await checkAvailability(date, doctor);

    // Extract the appointments from the response data
    const appointments = response.data.appointments;

    // If appointments are found, extract the appointment times
    if (appointments && appointments.length > 0) {
      const booked = appointments.map(
        (appointment) => appointment.appointment_time
      );
      return booked;
    } else {
      return [];
    }
  } catch (error) {
    // Handle errors here
    throw error;
  }
}
export async function bookAppointment(appointmentData) {
  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/add-appointment",
      appointmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}

export async function checkChat(chatData) {
  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/check-chat",
      chatData
    );
    return response.data.message;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}

export async function makeChat(chatData) {
  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/chat",
      chatData
    );
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}
