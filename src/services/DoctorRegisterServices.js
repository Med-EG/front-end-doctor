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
  bio,
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
    postData.append("bio", bio);

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
  // Retrieve doctor_id from localStorage
  const doctor_id = localStorage.getItem("id");

  // Prepare POST data
  const postData = {
    doctor_id: doctor_id,
    day_of_week: day_of_week,
  };

  // Retrieve authToken (token) from localStorage
  const authToken = localStorage.getItem("token");

  try {
    // Make a POST request to the API endpoint
    const response = await axios.post(
      "https://api-medeg.online/api/medEG/day",
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authToken in Authorization header
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    // Throw error for handling at the caller level
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
    if (error.response) {
      // Handle specific error cases based on server response
      if (error.response.status === 400) {
        // Handle specific error message related to working_day_id
        if (
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.working_day_id
        ) {
          throw new Error(error.response.data.error.working_day_id[0]);
        }
        // Generic error message for other 400 errors
        throw new Error("Bad request: " + error.response.data.message);
      }
      // Handle other response statuses (e.g., 401 Unauthorized)
      throw new Error("Server responded with status " + error.response.status);
    } else if (error.request) {
      // Handle request made but no response received
      throw new Error("No response from server");
    } else {
      // Handle other errors in setting up the request
      throw new Error("Error setting up the request: " + error.message);
    }
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
export async function getWorkingHoursByDay(id) {
  return axios.get(`https://api-medeg.online/api/medEG/hour/day/${id}`);
}
export async function deleteWorkingDay(id) {
  return axios.delete(`https://api-medeg.online/api/medEG/day/${id}`);
}
export async function updateProfile(ProfileData) {
  const {
    doctor_id,
    email,
    country,
    city,
    street,
    scientific_degree,
    price,
    years_of_experience,
  } = ProfileData;
  const postData = {
    doctor_id: doctor_id,
    email: email,
    country: country,
    city: city,
    street: street,
    scientific_degree: scientific_degree,
    price: price,
    years_of_experience: years_of_experience,
  };

  try {
    const response = await axios.put(
      `https://api-medeg.online/api/medEG/doctor/${ProfileData.doctor_id}
      )}`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
