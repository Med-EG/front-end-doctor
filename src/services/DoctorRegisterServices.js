import axios from "axios";

export async function setNewDoctor({
  first_name,
  last_name,
  email,
  password,
  confirm_password,
  gender,
  specialization,
  education,
  license_id,
  country,
  city,
  street,
  scientific_degree,
  doctor_image,
  price,
  rating,
  years_of_experience,
}) {
  try {
    const postData = new FormData();

    postData.append("first_name", first_name);
    postData.append("last_name", last_name);
    postData.append("email", email);
    postData.append("password", password);
    postData.append("confirm_password", confirm_password);
    postData.append("gender", gender);
    postData.append("specialization", specialization);
    postData.append("education", education);
    postData.append("license_id", parseInt(license_id));
    postData.append("country", country);
    postData.append("city", city);
    postData.append("street", street);
    postData.append("scientific_degree", scientific_degree);
    postData.append("doctor_image", doctor_image);
    postData.append("price", price);
    postData.append("rating", parseInt(rating));
    postData.append("years_of_experience", parseInt(years_of_experience));

    const response = await axios.post(
      "https://api-medeg.online/api/medEG/doctor/signup",
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  const postData = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/doctor/login",
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function setWorkingDays(day_of_week) {
  const postData = {
    doctor_id: localStorage.getItem("id"),
    day_of_week: day_of_week,
  };

  const authToken = localStorage.getItem("token");
  console.log(authToken);

  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/day",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function setWorkingHours(start_time, end_time, working_day_id) {
  const postData = {
    doctor_id: localStorage.getItem("id"),
    working_day_id: working_day_id,
    start_time: start_time,
    end_time: end_time,
  };
  try {
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/hour",
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getAllWorkingDaysForADoctor() {
  return axios.get(
    `https://api-medeg.online/api/medEG/day/doctor/${localStorage.getItem(
      "id"
    )}`
  );
}
export async function getAllWorkingHoursForADoctor() {
  return axios.get(
    `https://api-medeg.online/api/medEG/hour/doctor/${localStorage.getItem(
      "id"
    )}`
  );
}
export async function getWorkingHoursByDay($id) {
  return axios.get(`https://api-medeg.online/api/medEG/hour/day/${$id}`);
}
