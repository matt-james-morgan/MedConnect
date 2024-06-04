const db = require('../../connection');

const addAvailbility = (availability) => {

    console.log("database query", availability);
    const value = [null, availability.doctor_id, null, availability.doctor_name, availability.start_time, availability.end_time, availability.clinic_id, false, availability.clinic_name]

   
    const query = `
    INSERT INTO appointments (patient_id, doctor_id, patient_name, doctor_name, start_time, end_time, clinic_id, status, clinic_name )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

    return db.query(query, value)
        .then(results => {
            console.log(results.row);
            return results.rows;
        })
        .catch(error => console.log("getAllAppointmentsByDoctorId query error", error));
};

module.exports = { addAvailbility }

