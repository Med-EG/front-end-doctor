import axios from "axios";
// // patient
// export async function getAllPatients() {
//   return await axios.get("https://api-medeg.online/api/medEG/patients");
// }
// export async function getPatientById(id) {
//   return await axios.get(`https://api-medeg.online/api/medEG/patients/${id}`);
// }
// export async function patientLogout(token) {
//   return await axios.post(`https://api-medeg.online/api/medEG/patient/logout`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }
export async function getAllAppointmentsForDoctor(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/appointments/doctor/${id}`);
}

// doctor
// =========================================================================
export async function getAllDoctors() {
  return await axios.get("https://api-medeg.online/api/medEG/doctor");
}
export async function getDoctorByID(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/doctor/${id}`);
}
export async function doctorLogout() {
  return await axios.post(`https://api-medeg.online/api/medEG/doctor/logout`);
}
export async function getDoctorContactNumbers(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/number/doctor/${id}`
  );
}
export async function getAllWorkingDaysForADoctor(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/day/doctor/${id}`);
}
export async function getAllWorkingHoursForADay(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/hour/day/${id}`);
}
export async function getAllAppointmentsForADoctor(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/appointment/doctor/${id}`
  );
}
//medicalRecord
export async function medicalRecordForPatient(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/record/${id}`);
}

//Chat
export async function getAllChatsForOneDoctor(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/chat/doctor/${id}`
  );
}
export async function getChatById(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/chat/${id}`);
}
export async function getAllMessagesForOneChat(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/message/chat/${id}`
  );
}

export async function getMessageCount(id) {
  return await axios.get(`https://api-medeg.online/api/medEG/message/count/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function sendMessage(selectedChat , sender , content) {
  const postData = {
    'chat_id': selectedChat,
    'sender': sender,
    'content': content
};
   return await axios.post(`https://api-medeg.online/api/medEG/message`,postData, {
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then(console.log("message sent successfuly"))
      .catch(console.log("message not sent"));
    
}
