import axios from "axios";

export async function getAllDoctors(page){
    return await axios.get(`${page}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
);
}


export async function allSpecializations(){
    return await axios.get("https://api-medeg.online/api/medEG/doctorSpecialization");
}
