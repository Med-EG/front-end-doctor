import axios from "axios";

class Medication {
  constructor() {
    this.medical_record_id = localStorage.getItem("med_id");
    this.doctor_id = null;
    this.medicine_name = null;
    this.dose = null;
    this.unit = null;
    this.frequency = null;
    this.notes = "";
  }

  async getAllMedicine() {
    return await axios.get("https://api-medeg.online/api/medEG/medication");
  }

  async addMedicineByPatient(name) {
    const postData = {
      medical_record_id: this.medical_record_id,
      doctor_id: null,
      medicine_name: name,
      dose: this.dose + " " + this.unit,
      frequency: this.frequency,
      notes: this.notes,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/medication-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  async addMedicineByDoctor(name) {
    const postData = {
      medical_record_id: this.medical_record_id,
      doctor_id: this.doctor_id,
      medicine_name: name,
      dose: this.dose + " " + this.unit,
      frequency: this.frequency,
      notes: this.notes,
    };

    return await axios.post(
      "https://api-medeg.online/api/medEG/medication-info",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default Medication;
export async function getAllMedicinesInDB() {
  return await axios.get("https://api-medeg.online/api/medEG/medication");
}
