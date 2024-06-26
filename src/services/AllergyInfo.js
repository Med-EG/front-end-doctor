import axios from "axios";

class Allergy {
  constructor() {
    this.medical_record_id = localStorage.getItem("med_id");
    this.doctor_id = null;
    this.allergy_name = null;
    this.allergy_type = null;
    this.severity_level = null;
    this.body_response = null;
  }

  async getAllAllergy() {
    return await axios.get("https://api-medeg.online/api/medEG/allergy");
  }

  async addAllergyByPatient(name, med_id) {
    const postData = {
      medical_record_id: med_id,
      doctor_id: localStorage.getItem("id"),
      allergy_name: name,
      allergy_type: this.allergy_type,
      severity_level: this.severity_level,
      body_response: this.body_response,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/allergy-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  
}

export default Allergy;
export async function getAllAllergiesInDB() {
  return await axios.get("https://api-medeg.online/api/medEG/allergy");
}
