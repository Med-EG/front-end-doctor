import axios from "axios";
import { redirect } from "react-router-dom";

var token = localStorage.getItem('token');


class Patient {
    constructor() {
        this.first_name="";
        this.last_name="";
        this.username="";
        this.email="";
        this.gender="";
        this.password="";
        this.national_id=null;
        this.address="";
        this.birth_date=null;
        this.phone_number=0;
        this.personal_image=null;
    }

    async login() {
        const postData = {
            "email": this.email,
            "password": this.password
        };
    
        // Make POST request
        return await axios.post('https://api-medeg.online/api/medEG/patient/login', postData);
    
    }

    async setNewPatient() {
        const postData = new FormData();

        postData.append("first_name", this.first_name);
        postData.append("last_name", this.last_name);
        postData.append("username", this.username);
        postData.append("email", this.email);
        postData.append("gender", this.gender);
        postData.append("password", this.password);
        postData.append("national_id", parseInt(this.national_id));
        postData.append("address", this.address);
        postData.append("birth_date", this.birth_date);
        postData.append("phone_number", parseInt(this.phone_number));
        postData.append("personal_image", this.personal_image);

        // Make POST request
        return await axios.post('https://api-medeg.online/api/medEG/patient/signup', postData);
    }

    async getPatient() {
        await axios.get(`https://api-medeg.online/api/medEG/patients/${localStorage.getItem("id")}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            this.first_name=response.data.first_name;
            this.last_name=response.data.last_name;
            this.username=response.data.username;
            this.email=response.data.email;
            this.gender=response.data.gender;
            this.password=response.data.password;
            this.national_id=response.data.national_id;
            this.address=response.data.address;
            this.birth_date=response.data.birth_date;
            this.phone_number=response.data.phone_number;
            this.personal_image=response.data.personal_image;
        })
        .catch((err)=>{throw(err)});
    }

    async UpdatePatient() {
        const postData = new FormData();
        postData.append("first_name", this.first_name);
        postData.append("last_name", this.last_name);
        postData.append("username", this.username);
        postData.append("email", this.email);
        postData.append("gender", this.gender);
        postData.append("password", this.password);
        postData.append("national_id", parseInt(this.national_id));
        postData.append("address", this.address);
        postData.append("birth_date", this.birth_date);
        postData.append("phone_number", parseInt(this.phone_number));
        postData.append("personal_image", this.personal_image);

        // Make POST request
        return await axios.put(`https://api-medeg.online/api/medEG/patients/${localStorage.getItem("id")}`, postData);
    }
}

export default Patient;






export async function getPatient() {
    return await axios.get(`https://api-medeg.online/api/medEG/patients/${localStorage.getItem("id")}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export async function UpdatePatient(formData, imageFile) {
    const postData = new FormData();
    for (const key in formData) {
        postData.append(key, formData[key]);
    }
    if (imageFile) {
        postData.append("personal_image", imageFile);
    }

    try {
        const response = await axios.put(`https://api-medeg.online/api/medEG/patients/${localStorage.getItem("id")}`, postData);
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
}