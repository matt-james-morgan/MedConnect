import axios from "axios";
import { useContext } from "react";
import { UserSignedIn } from "../../App";

const RegisterWithDoctor = (props) => {
  const {clinicInfo, doctors} = props;
  const { userState, dispatch } = useContext(UserSignedIn);

  const filteredDoctors = doctors.filter(doctor => {
    // Only show the Clinic's doctors that are accepting patients
    return doctor.clinic_id === clinicInfo.clinic_id && doctor.number_of_patients
  })

  const handleRegister = (id) => {
    const userId = sessionStorage.getItem('user_id');
  

   console.log("userID", userId)
   console.log("userState", userState)
  }

  return (
    <div>
      <h3>{clinicInfo.clinic_name}</h3>
      <p>{clinicInfo.clinic_address}</p>
      {filteredDoctors.map(doctor => {
        return (
          <div key={doctor.id}>
            <p>Accepting {doctor.number_of_patients} more patients</p>
            <p>{doctor.name}</p>
            <p>{doctor.qualifications}</p>
            <img src={`./assets/images/${doctor.photo_url}`} alt={doctor.name}/>
            <button onClick={() => handleRegister(doctor.id)}>Register</button>
          </div>
        )
      })}
    </div>
  )
}

export default RegisterWithDoctor;