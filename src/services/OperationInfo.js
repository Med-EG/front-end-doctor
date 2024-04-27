import axios from "axios";

class Operation {
  constructor() {
    this.medical_record_id = localStorage.getItem("med_id");
    this.doctor_id = null;
    this.operation_name = null;
    this.surgeon_name = null;
    this.operation_date = null;
    this.operation_notes = null;
    this.complications = null;
  }

  async getAllOperation() {
    return await axios.get("https://api-medeg.online/api/medEG/operation");
  }

  async addOperationByPatient(name , med_id) {
    const postData = {
      medical_record_id: med_id,
      doctor_id: localStorage.getItem("id"),
      operation_name: name,
      surgeon_name: this.surgeon_name,
      operation_date: this.operation_date,
      operation_notes: this.operation_notes,
      complications: this.complications,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/operation-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  async addOperationByDoctor() {
    const postData = {
      medical_record_id: this.medical_record_id,
      doctor_id: this.doctor_id,
      operation_name: this.operation_name,
      surgeon_name: this.surgeon_name,
      operation_date: this.operation_date,
      operation_notes: this.operation_notes,
      complications: this.complications,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/operation-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default Operation;
export async function getAllOperationsInDB() {
  return await axios.get("https://api-medeg.online/api/medEG/operation");
}
