import './App.css';
import { useEffect, useState, createContext } from 'react';
import NavBar from './components/NavBar';
import PatientScheduler from './components/Scheduling/PatientScheduler';
import useApplicationData from './hooks/useApplicationData';
import PatientInfo from './components/SignUp/PatientInfo';
import UserProfile from './components/UserProfile/UserProfile';
import { Grid, Modal } from '@mui/material';
import SignUp from './components/SignUp/SignUpForm';
import LoginForm from './components/LoginForm';
import ClinicSignUpInfo from './components/SignUp/ClinicSignUpInfo';
import AvailableDoctors from './components/AvailableDoctors';
import PatientAppointments from '../../frontend/src/components/Scheduling/PatientAppointments'

import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterWithDoctor from './components/DoctorsList/RegisterWithDoctor';
import LandingPage from './components/LandingPage';
import RequiredInformation from './components/SignUp/RequiredInformation';
import BasicModal from './components/GeneralComponents/BasicModal';

export const UserSignedIn = createContext();


function App() {

  const { userState, dispatch } = useApplicationData();
  // const [SignInDisplay, setSignInDisplay] = useState(false);
  const [LoginDisplay, setLoginDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserInfoForSession = async (userId) => {

    try {

      const response = await fetch(`http://localhost:8080/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const responseData = await response.json();



      dispatch({ type: "USER_INFO", payload: responseData });

      return responseData;
    } catch (error) {
      console.error('error getting user app.js:', error);
    }
  }


  useEffect(() => {

    const userId = sessionStorage.getItem('user_id');

    if (userId) {

      dispatch({ type: "USER_SESSION", payload: true })



      getUserInfoForSession(userId);




    } else {
      console.log("else statment hit");
      dispatch({ type: "USER_SESSION", payload: false })
    }
  }, []);

  (userState.userInfo.id && loading) && setLoading(false);


  return (
    <div className="App">
      <UserSignedIn.Provider value={{ userState, dispatch }}>
        {/* <PatientAppointments /> */}
        {/* <PatientInfo /> */}
        <NavBar LoginDisplay={LoginDisplay} setLoginDisplay={setLoginDisplay} loading={loading} />
        {/* {SignInDisplay && (<>
          < SignUp setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} />

        </>)} */}


        {/* <PatientScheduler /> */}
        {/* <ClinicSignUpInfo />  */}

        <BasicModal />

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/availabledoctors' element={<AvailableDoctors />} />
          <Route path='/register' element={<RegisterWithDoctor />} />
          <Route path='/profile' element={!loading && <UserProfile />} />
          <Route path='/signup' element={<SignUp setLoginDisplay={setLoginDisplay} />} />
          <Route path='/required_information' element={<RequiredInformation />} />
        </Routes>

      </UserSignedIn.Provider>
    </div>
  );
}

export default App;
