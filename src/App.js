import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors'

import ForgotPasswordPage from './HomePages/ForgotPasswordPage'
import SignIn from './HomePages/SignIn'

import ReceptionistLayout from './Layouts/ReceptionistLayout'
import MainPageReceptionist from './Acc_ReceptionistPage/MainPageReceptionist'
import UserProfile from './Acc_ReceptionistPage/UserProfile'
import ViewDoctorSchedule from './Acc_ReceptionistPage/ViewDoctorSchedule'

import AdminLayout from './Layouts/AdminLayout'
import AdminHomePageDefualt from './Acc_AdminPage/AdminHomePageDefualt'
import Staff from './Acc_AdminPage/MainComponents/Staff'
import Patient from './Acc_AdminPage/MainComponents/Patient'

// import DoctorImageUpload from './AdminPages/AdminPageConponents/DoctorImageUpload'




//Prep Variables:

const Doctor = <Staff type="Doctor" databaseLink="http://localhost:8000/Doctor"/>
const Pharmacist = <Staff type="Pharmacist" databaseLink="http://localhost:8000/Pharmacist"/>
const Receptionist = <Staff type="Receptionist" databaseLink="http://localhost:8000/Receptionist"/>






//Theme Section:--------------------------THEME--------------------------------
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: lightBlue,


  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }

})
//End of Theme Section:---------------









//Theme Section:--------------------------THEME--------------------------------
function App() {
  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Switch>


          <Route exact path="/">
            <SignIn />

          </Route>
          <Route path="/forgotpassword">
            <ForgotPasswordPage />
          </Route>
        </Switch>


        {/* Receptionist route */}
        <Route path="/Receptionist">
          <ReceptionistLayout>
            <Switch>
              <Route path="/Receptionist/mainPageReceptionist" >
                <MainPageReceptionist />
              </Route>
              <Route path="/Receptionist/userProfile">
                <UserProfile />
              </Route>
              <Route path="/Receptionist/viewDoctorSchedule">
                <ViewDoctorSchedule />
              </Route>
            </Switch>
          </ReceptionistLayout>
        </Route>



        {/* Admin route */}
        <Route path="/admin">
          <AdminLayout>
            <Switch>
              <Route path="/admin/AdminHomePageDefualt">
                <AdminHomePageDefualt />
              </Route>
              <Route path="/admin/Doctor">
                {Doctor}
              </Route>
              <Route path="/admin/Pateint">
                {Patient}
              </Route>
              <Route path="/admin/Pharmacist">
                {Pharmacist}
                {/* <SignIn/> */}
              </Route>
              <Route path="/admin/Receptionist">
                {Receptionist}
              </Route>

            </Switch>
          </AdminLayout>

        </Route>



      </Router>
    </ThemeProvider>


  );
}

export default App;

//End of Main Export Section:---------------