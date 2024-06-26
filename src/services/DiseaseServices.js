import axios from "axios";

class Disease {
  constructor() {
    this.medical_record_id = localStorage.getItem("med_id");
    this.doctor_id = null;
    this.disease_name = null;
    this.notes = "";
  }

  async addDisease(med_id,disease_name) {
    const postData = {
      medical_record_id: med_id,
      doctor_id: localStorage.getItem("id"),
      disease_name: disease_name,
      notes: this.notes,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/disease-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  

  async getAllDiseases() {
    return await axios.get("https://api-medeg.online/api/medEG/disease");
  }
}

export default Disease;

export async function getAllDiseasesInDB() {
  return await axios.get("https://api-medeg.online/api/medEG/disease");
}
