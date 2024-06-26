//////////////////////////////////////////////////////////////////
/*
TO DO
1)Divide user picked time into appointments
2)error handle if user chooses start time after end time and vice versa

*/
import { useEffect, useState, useContext} from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    MenuItem
} from '@mui/material';
import { useGet, usePut } from "../../hooks/useAPI";
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import { UserSignedIn } from "../../App";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import GlobalStyles from '@mui/material/GlobalStyles';

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
 

 

const StyledBox= styled(Box)({
  minWidth: 275,
  margin: "20px",
});

const StyledTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: "bold",
  marginBottom: 10,
});

const CreateAvailibility = ({availabilityDisplay, setAvailabilityDisplay, appointment}) => {
  
  

  const { userState } = useContext(UserSignedIn);
  const {getData, get} = useGet();
  const {getPut, put} = usePut();
  const [events, setEvents] = useState([]);
  const [errors, setErrors ] = useState([])
  const [availibility, setAvailibility] = useState({
    doctor_id: {
      value: '',
      error: false
    },
    doctor_name: {
      value: '',
      error: false
    },
    start_time: {
      value: null,
      error: false
    },
    end_time:  {
      value: null,
      error: false
    },
    clinic_id: userState.userInfo.id,
    status: false,
    created_at: new Date(),
    clinic_address: userState.userInfo.address,
    clinic_name: userState.userInfo.name
  });

  const [doctors, setDoctors ] = useState([]);

  
  const getDoctors = async (clinic_id) =>{
    try {
      const response = await fetch(`http://localhost:8080/doctors/${clinic_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      ;
      const responseData = await response.json();
      
      const filtererdData = responseData.map((doctor)=>{
        return doctor.name;
      })
      // Assuming the response contains some information about the newly registered user
      // You can handle the response data as needed
      
      return filtererdData;
      
    } catch (error) {
      // Handle error
    }
  }
  
  

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }
  
      return true;
    } catch (error) {
      // Handle error
      console.error('Error deleting appointment:', error);
    }
  };

  

  useEffect(()=>{

    const fetchDoctors = async () => {
      const response = await getDoctors(availibility.clinic_id);
      setDoctors(response);
    };

    fetchDoctors();

  },[]);

  useEffect(()=>{

   
    if(availibility.doctor_id.value){
      get(
        'appointments/doctors',
        availibility.doctor_id.value
      )
  
    }
   
    
  },[availibility.doctor_id.value]);

  useEffect(() => {
    if (getData) {
      const formattedData = getData.map((appointment) => {
        
       if(appointment.status){
        return {
          start: appointment.start_time,
          end: appointment.end_time,
          title: appointment.patient_name,
        };
       } 
       return {
          start: appointment.start_time,
          end: appointment.end_time,
          title: "Available",
       }
      });
      setEvents(formattedData);
    }
  }, [getData]);

  
  const handleDelete = async () => {
    const success = await deleteAppointment(appointment.id);
  }

  const handleSave = async () => {

    let newErrors = {};
    const availibilityDates = [];

    for (const [key, value] of Object.entries(availibility)) {
      
      if (value.hasOwnProperty("value") && !value.value) {
        
        setAvailibility(prev => ({
          ...prev,
          [key]: { ...prev[key], error: true } // Correct syntax to update the error property
        }));
        newErrors[key] = true;
      }
    }

  
    

    setErrors(newErrors);
    
    //Send data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        ...availibility,
        id: availibility.doctor_id.value,
        doctor_id: availibility.doctor_id.value,
        doctor_name: availibility.doctor_name.value,
        start_time: availibility.start_time.value,
        end_time: availibility.end_time.value,
      };
        put(
          'appointments/availability',
          payload
        )
    
      
      
    }

    const data = {
      start_time: availibility.start_time.value,
      end_time: availibility.end_time.value,
      clinic_name: availibility.clinic_name,
      doctor_name: availibility.doctor_name.value,
      patient_id: null,
      patient_name: null,
      status: false
    };
    

  };

  const handleCancel = () => {
   
    setAvailabilityDisplay(!availabilityDisplay);
    // Reset edited appointment to original appointment
    
  };



  const handleDoctorChange = (e) => {
    const selectedDoctor = userState.doctors.find((doc) => doc.name === e.target.value);
    const doctor_id = selectedDoctor ? selectedDoctor.id : null;
    setAvailibility(prev =>({ ...prev, doctor_name:{...prev.doctor_name, value: e.target.value}, doctor_id: {...prev.doctor_id, value: doctor_id} }));
  };

  

  const handleAvailibilty = (info) => {
    setAvailibility(prev =>({ ...prev, start_time: {...prev.start_time, value: info.startStr}, end_time: {...prev.end_time, value: info.endStr} }));
  }

  const handleClear = () =>{
    setAvailibility(prev =>({ ...prev, start_time: {...prev.start_time, value: ""}, end_time: {...prev.end_time, value: ""}, doctor_name:{...prev.doctor_name, value: ""}, doctor_id: {...prev.doctor_id, value: ""} }));

  }
  

  return (
  <Box 
  component="form"
  noValidate >
    <CardContent>
      <StyledTypography variant="h5">
        Create Open Availibility Between Selected Time Frame
      </StyledTypography>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <GlobalStyles styles={{
       '.MuiClockPicker-root .MuiClockPicker-clock, .MuiClockPicker-root .MuiClockPicker-arrowSwitcher': {
         '&::-webkit-scrollbar': {
           width: '12px',
           height: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'red',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'red',
            },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'red',
          },
        },
      }} />
          <Box>
            <Grid container spacing={2}>
             {availibility.doctor_name.value && (
  <Grid item xs={12}>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay' // Buttons to switch between views
      }}
      selectable
      selectMirror
      editable={true}
      unselectAuto={false}
      initialView="timeGridWeek"
      allDaySlot={false}
      slotMinTime={"9:00"}
      slotMaxTime={"18:00"}
      events={events}
      slotDuration="00:30:00"
      eventOverlap={false}
      select={handleAvailibilty}
    />
  </Grid>
)}

            </Grid>
          </Box>
        </LocalizationProvider>
        {doctors && doctors.length > 0 && (
          <TextField
            select
            name="doctor_name"
            label="Doctor"
            onChange={handleDoctorChange}
            fullWidth
            error={availibility.doctor_name.error}
  
            margin="normal"
          >
            {doctors.map((doctor, index) => (
              <MenuItem key={index} value={doctor} >
                {doctor}
                
  
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          
          name="clinic_name"
          label="Clinic"
          value={availibility.clinic_name}
          fullWidth
          margin="normal"
          ></TextField>
          
      
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      
    </CardContent>
  </Box>
);
};



export default CreateAvailibility;