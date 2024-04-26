import axios from "axios";
// get all functions
export async function getAllMedicine() {
  return await axios.get("https://api-medeg.online/api/medEG/medication");
}

// get all functions using med_id
export async function getAllDiseases(med_id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/disease-info/rec/${med_id}`
  );
}

export async function getAllMedications(med_id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/medication-info/rec/${med_id}`
  );
}

export async function getAllOperations(med_id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/operation-info/rec/${med_id}`
  );
}

export async function getAllAllergies(med_id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/allergy-info/rec/${med_id}`
  );
}


// get all functions using id
export async function getAllergyById(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/allergy-info/${id}`
  );
}
export async function getOperationById(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/operation-info/${id}`
  );
}
export async function getDiseaseById(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/disease-info/${id}`
  );
}
export async function getMedicationById(id) {
  return await axios.get(
    `https://api-medeg.online/api/medEG/medication-info/${id}`
  );
}

// Delete functions
export async function deleteMedicine(id) {
  return await axios.delete(
    `https://api-medeg.online/api/medEG/medication-info/${id}`
  );
}
export async function deleteDisease(id) {
  return await axios.delete(
    `https://api-medeg.online/api/medEG/disease-info/${id}`
  );
}
export async function deleteAllergy(id) {
  return await axios.delete(
    `https://api-medeg.online/api/medEG/allergy-info/${id}`
  );
}
export async function deleteOperation(id) {
  return await axios.delete(
    `https://api-medeg.online/api/medEG/operation-info/${id}`
  );
}
// Edit Functions

export async function updateAllergy(id, allergyData) {
  const {
    medical_record_id,
    allergy_name,
    allergy_type,
    severity_level,
    body_response,
  } = allergyData;
  const postData = {
    medical_record_id: medical_record_id,
    allergy_name: allergy_name,
    allergy_type: allergy_type,
    severity_level: severity_level,
    body_response: body_response,
  };
  try {
    const response = await axios.put(
      ` https://api-medeg.online/api/medEG/allergy-info/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating allergy:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function updateDisease(id, DiseaseData) {
  const { medical_record_id, disease_name, notes } = DiseaseData;
  const postData = {
    medical_record_id: medical_record_id,
    disease_name: disease_name,
    notes: notes,
  };
  try {
    const response = await axios.put(
      ` https://api-medeg.online/api/medEG/disease-info/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating disease:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function updateOperation(id, DiseaseData) {
  const {
    complications,
    medical_record_id,
    operation_date,
    operation_name,
    operation_notes,
    surgeon_name,
  } = DiseaseData;
  const postData = {
    medical_record_id: medical_record_id,
    complications: complications,
    operation_date: operation_date,
    operation_name: operation_name,
    operation_notes: operation_notes,
    surgeon_name: surgeon_name,
  };
  try {
    const response = await axios.put(
      ` https://api-medeg.online/api/medEG/operation-info/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating operation:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function updateMedicine(id, MedicineData) {
  const { medical_record_id, medicine_name, dose, frequency, notes } =
    MedicineData;
  const postData = {
    medical_record_id: medical_record_id,
    medicine_name: medicine_name,
    dose: dose,
    frequency: frequency,
    notes: notes,
  };
  try {
    const response = await axios.put(
      ` https://api-medeg.online/api/medEG/medication-info/${id}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating medicine:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function updateFamily(FamilyData) {
  const {
    father,
    mother,
    second_degree,
    alcoholic,
    alcoholic_level,
    blood_type,
    height,
    job,
    marital_status,
    patient_id,
    smoker,
    smoking_level,
    weight,
  } = FamilyData;
  const postData = {
    father: father,
    mother: mother,
    second_degree: second_degree,
    alcoholic: alcoholic,
    alcoholic_level: alcoholic_level,
    blood_type: blood_type,
    height: height,
    job: job,
    marital_status: marital_status,
    patient_id: patient_id,
    smoker: smoker,
    smoking_level: smoking_level,
    weight: weight,
  };
  try {
    const response = await axios.put(
      `https://api-medeg.online/api/medEG/record/${localStorage.getItem(
        "med_id"
      )} `,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating family member:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
export async function updateProfile(ProfileData) {
  const {
    patient_id,
    username,
    phone_number,
    password,
    national_id,
    last_name,
    gender,
    first_name,
    email,
    birth_date,
    address,
  } = ProfileData;
  const postData = {
    patient_id: patient_id,
    username: username,
    phone_number: phone_number.toString(),
    password: password,
    national_id: national_id,
    last_name: last_name,
    gender: gender,
    first_name: first_name,
    email: email,
    birth_date: birth_date,
    address: address,
  };

  try {
    const response = await axios.put(
      `https://api-medeg.online/api/medEG/patients/${localStorage.getItem(
        "id"
      )}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
