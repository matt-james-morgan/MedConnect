import DoctorsListItem from "./DoctorsListItem";

const DUMMY_DOCTORS = [
  {
    id: 1,
    clinic_id: 1,
    name: "Dr. Medici",
    qualifications: "Very qualified, we promise",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 4
  },
  {
    id: 2,
    clinic_id: 1,
    name: "Dr. Doom",
    qualifications: "Not a villain",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 2
  },
  {
    id: 3,
    clinic_id: 1,
    name: "Dr. Who",
    qualifications: "Timey-Wimey Stuff",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 0
  },
  {
    id: 4,
    clinic_id: 2,
    name: "Dr. Oldguy",
    qualifications: "Been around the block a few times",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 4
  },
  {
    id: 5,
    clinic_id: 2,
    name: "Dr. Newbie",
    qualifications: "Fresh out of school!",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 10
  },
  {
    id: 6,
    clinic_id: 3,
    name: "Dr. Mysterio",
    qualifications: "Who even is he?",
    photo_url: "http://placekitten.com/100/100",
    number_of_patients: 0
  }
]

const DoctorsList = (props) => {
  const {clinic_id, renderClinic} = props;

  const mapAndFilterDoctors = DUMMY_DOCTORS.filter(doctor => {
      // Only show the Clinic's doctors that are accepting patients
      return doctor.clinic_id === clinic_id && doctor.number_of_patients
    })
    .map(doctor => {
      return <DoctorsListItem
              key={doctor.id}
              name={doctor.name}
              qualifications={doctor.qualifications}
              photo={doctor.photo_url}
              patients={doctor.number_of_patients}
            />
    });
    
    renderClinic(mapAndFilterDoctors.length > 0);
  return(
    <ul>
      {mapAndFilterDoctors}
    </ul>
  )
}

export default DoctorsList;