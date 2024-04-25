import axios from "axios";


class Record {
    constructor() {
        this.Patient_id = parseInt(localStorage.getItem("id"));
        this.weight =null;
        this.height =null;
        this.blood_type = null;
        this.alcoholic = null;
        this.alcoholic_level = null;
        this.smoker = null;
        this.smoking_level = null;
        this.job = null;
        this.marital_status = null;
        this.past_fracrues = null;
        this.sleeping_hours = null;
        this.sleeping_quality = null;
        this.father = null;
        this.mother = null;
        this.second_degree = null;
    }
    status;

    async check() {
        
            return await axios.get(`https://api-medeg.online/api/medEG/record/${this.Patient_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

        
    }
    

    async setNewRecord() {
        const postData = {
            'patient_id': this.Patient_id,
            'weight': this.weight,
            'height': this.height,
            'blood_type': this.blood_type,
            'alcoholic': this.alcoholic,
            'alcoholic_level': this.alcoholic_level,
            'smoker': this.smoker,
            'smoking_level': this.smoking_level,
            'job': this.job,
            'marital_status': this.marital_status,
            'past_fracrues': this.past_fracrues,
            'sleeping_hours': this.sleeping_hours,
            'sleeping_quality': this.sleeping_quality,
            'father': this.father,
            'mother': this.mother,
            'second_degree': this.second_degree,
        };
            // console.log()
            return await axios.post('https://api-medeg.online/api/medEG/record', postData
            );
    }

    async updateRecord(record_id) {
        const putData = {
            'patient_id': this.Patient_id,
            'weight': this.weight,
            'height': this.height,
            'blood_type': this.blood_type,
            'alcoholic': this.alcoholic,
            'alcoholic_level': this.alcoholic_level,
            'smoker': this.smoker,
            'smoking_level': this.smoking_level,
            'job': this.job,
            'marital_status': this.marital_status,
            'past_fracrues': this.past_fracrues,
            'sleeping_hours': this.sleeping_hours,
            'sleeping_quality': this.sleeping_quality,
            'father': this.father,
            'mother': this.mother,
            'second_degree': this.second_degree,
        };

        return await axios.put(`https://api-medeg.online/api/medEG/record/${record_id}`, putData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        
    }
}
export default Record



