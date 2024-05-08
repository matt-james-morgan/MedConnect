import './App.css';
import { useEffect, useState, createContext } from 'react';
import NavBar from './components/NavBar';
import PatientScheduler from './components/Scheduling/PatientScheduler';
import useApplicationData from './hooks/useApplicationData';
import PatientInfo from './components/SignUp/PatientInfo';
import UserProfile from './components/UserProfile/UserProfile';

import SignUp from './components/SignUp/SignUpForm';
import LoginForm from './components/LoginForm';
import ClinicSignUpInfo from './components/SignUp/ClinicSignUpInfo';
import AvailableDoctors from './components/AvailableDoctors';
import ClinicProfile from './components/UserProfile/ClinicProfile';
import AvailableDoctorsRoute from './routes/AvailableDoctorsRoute';

export const UserSignedIn = createContext();


function App() {

  const { userState, dispatch } = useApplicationData();
  const [SignInDisplay, setSignInDisplay] = useState(false);
  const [LoginDisplay, setLoginDisplay] = useState(false);

  const getUserInfoForSession = async (userId) =>{
   
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
      console.log(responseData);
     
      dispatch({ type: "USER_INFO", payload: responseData});

    } catch (error) {
      console.error('error getting user app.js:', error);
      
    }
  }
  

  useEffect(() => {

    const userId = sessionStorage.getItem('user_id');
    console.log(userId);
    if (userId) {

      dispatch({ type: "USER_SESSION", payload: true })
      console.log(userId);
      getUserInfoForSession(userId);

     
    } else {
      console.log("else statment hit");
      dispatch({ type: "USER_SESSION", payload: false })

    }
  }, []);

  console.log("userState", userState);

  return (

    <div className="App" >

      <UserSignedIn.Provider value={{ userState, dispatch }}>
        <PatientInfo />
        <NavBar setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} LoginDisplay={LoginDisplay} setLoginDisplay={setLoginDisplay} />
        {SignInDisplay && (<>
          < SignUp setSignInDisplay={setSignInDisplay} SignInDisplay={SignInDisplay} />

        </>)}
        {LoginDisplay && <LoginForm />}




         <PatientScheduler />
        {/* <ClinicSignUpInfo />  */}
        {/* <AvailableDoctorsRoute /> */}
      </UserSignedIn.Provider>

    </div>

  );
}

export default App;
