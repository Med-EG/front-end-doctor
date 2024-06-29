import axios from "axios";

export async function getAllAssistants(id){
    return await axios.get(`https://api-medeg.online/api/medEG/assistant/doctor/${id}`)
}