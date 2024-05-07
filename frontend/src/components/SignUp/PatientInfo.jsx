import React from "react";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useContext } from "react";
import { UserSignedIn } from "../../App";
import { Snackbar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputLabel} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


/* 
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


*/

export default function PatientInfo() {

  const { userState, dispatch } = useContext(UserSignedIn);

  


  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    DOB: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  // Change handler to update state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const validate = (formData) => {
    const errors = {};

    for (const key in formData) {
      console.log(key);
      if (!formData[key]) {
        errors[key] = `${key} is required`
      }
    }

    console.log(errors);

    // You can add more complex validation rules here

    return errors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const formErrors = validate(formData);
    if (Object.keys(formErrors).length === 0) {
      dispatch({ type: "NEW_USER_INFO", payload: formData })
    } else {
      setErrors(formErrors);
      setOpenSnackbar(true);
    }


  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >

          <Typography component="h1" variant="h5">
            Patient Info
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  error={!!errors.name}
                  autoComplete="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.gender}
                  name="gender"
                  label="Gender"
                  id="gender"
                  autoComplete="gender"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.health_card}
                  name="health_card"
                  label="Health Card"
                  id="health_card"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Date Of Birth</InputLabel>
                <DatePicker onChange={handleChange}/>
              </Grid>
       
             
              <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit Info
            </Button>
            </Grid>
            </Grid>
           
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message="Please correct the errors and resubmit the form."
            />
          </form>
        </div>
        <Box mt={5}>

        </Box>
      </Container>
    </LocalizationProvider>
  );
}