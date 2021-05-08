import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { lightBlue} from '@material-ui/core/colors'
import ForgotPasswordPage from './HomePages/ForgotPasswordPage'
import ReceptionistLayout from './Layouts/ReceptionistLayout'
import MainPageReceptionist from './ReceptionistPages.js/MainPageReceptionist'
import UserProfile from './ReceptionistPages.js/UserProfile'
import ViewDoctorSchedule from './ReceptionistPages.js/ViewDoctorSchedule'
import AdminLayout from './Layouts/AdminLayout'
import AdminHomePageDefualt from './AdminPages/AdminHomePageDefualt'
import SignIn from './HomePages/SignIn'
import Doctor from './AdminPages/Doctor'
import Receptionist from './AdminPages/Receptionist'
import Patient from './AdminPages/Patient'
import Pharmacist from './AdminPages/Pharmacist'
import Birth_Report from './AdminPages/Clinic_management/Birth_Report'
import Blood_bag from './AdminPages/Clinic_management/Blood_bag'
import Death_Report from './AdminPages/Clinic_management/Death_Report'
import Medicine from './AdminPages/Clinic_management/Medicine'
import Operation_Report from './AdminPages/Clinic_management/Operation_Report'
import Room_allotment from './AdminPages/Clinic_management/Room_Allotment'
import DoctorLayout from './Layouts/DoctorLayout'
import ViewPatient from './DoctorPage/ViewPatient'


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

function App() {
  return (

    <ThemeProvider theme={theme}>
     <Router>
          <Switch>
            <Route exact path="/">
              <SignIn/>
              
            </Route>
            <Route path="/forgotpassword">
              <ForgotPasswordPage/>
            </Route>
          </Switch>
     
      
      {/* Receptionist route */}
        <Route path="/Receptionist">
          <ReceptionistLayout>
              <Switch>
                <Route path = "/Receptionist/mainPageReceptionist" >
                  <MainPageReceptionist/>
                </Route>
                <Route path = "/Receptionist/userProfile">
                  <UserProfile/>
                </Route>
                <Route path = "/Receptionist/viewDoctorSchedule">
                  <ViewDoctorSchedule/>
                </Route>
              </Switch>
          </ReceptionistLayout>
        </Route>

        {/* Doctor route */}
        <Route path="/Doctor">
          <DoctorLayout>
            <Switch>
              <Route path="/Doctor/ViewPatient">
                <ViewPatient />
              </Route>
            </Switch>
          </DoctorLayout>
        </Route>

         {/* Admin route */}
         <Route path="/admin">
            <AdminLayout>
              <Switch>
                <Route path= "/admin/AdminHomePageDefualt">
                  <AdminHomePageDefualt/>
                  
                </Route>
                <Route path= "/admin/Doctor">
                  <Doctor/>
                </Route>
                <Route path= "/admin/Pateint">
                <Patient/>
                </Route>
                <Route path= "/admin/Pharmacist">
                  <Pharmacist/>
                </Route>
                <Route path= "/admin/Receptionist">
                  <Receptionist/>
                </Route>
                <Route path= "/admin/Clinic_management/Birth_Report">
                  <Birth_Report/>
                </Route>
                <Route path= "/admin/Clinic_management/Blood_bag">
                  <Blood_bag/>
                </Route>
                <Route path= "/admin/Clinic_management/Death_Report">
                  <Death_Report/>
                </Route>
                <Route path= "/admin/Clinic_management/Medicine">
                  <Medicine/>
                </Route>
                <Route path= "/admin/Clinic_management/Operation_Report">
                  <Operation_Report/>
                </Route>
                <Route path= "/admin/Clinic_management/Room_allotment">
                  <Room_allotment/>
                </Route>
              </Switch>
            </AdminLayout>
            
        </Route>
        </Router>
      </ThemeProvider>   
    
    
  );
}

export default App;
