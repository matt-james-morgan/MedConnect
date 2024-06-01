const db = require('../../connection');

const getAllAppointmentsByDoctorId = (doctorId) => {
    const value = [doctorId]
   
    const query = `
    SELECT appointments
    FROM appointments
    WHERE doctor_id = $1;
  `;

    return db.query(query, value)
        .then(results => {
            return results.rows;
        })
        .catch(error => console.log("getAllAppointmentsByDoctorId query error", error));
};

module.exports = { getAllAppointmentsByDoctorId }