import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { HomeOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PersonIcon from "@material-ui/icons/Person";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import AdminToolBar from "../Acc_AdminPage/MainComponents/AdminToolBar";



//Theme Section:--------------------------THEME--------------------------------
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    Page: {
      background: "#f4f4f4",

      // padding: theme.spacing(3),
      // minHeight: '100vh',
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
      textAlign:"center"
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    appbar_title: {
      flexGrow: 1,
      
    },
    arvata_syle: {
      margin: "5px",
    },
  };
});
//End of Theme Section:---------------









//Main Export Section:--------------------------EXPORT--------------------------------
function AdminLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlined color="secondary" />,
      path: "/admin/AdminHomePageDefualt",
    },
    {
      text: "Doctor",
      icon: <PersonOutlineOutlinedIcon color="secondary" />,
      path: "/admin/Doctor",
    },
    {
      text: "Pateint",
      icon: <PersonIcon color="secondary" />,
      path: "/admin/Pateint",
    },
    {
      text: "Pharmacist",
      icon: <LocalHospitalIcon color="secondary" />,
      path: "/admin/Pharmacist",
    },
    {
      text: "Receptionist",
      icon: <CardTravelIcon color="secondary" />,
      path: "/admin/Receptionist",
    },
  ];
  return (
    <div className={classes.root}>
      {/* create app bar */}
      <AppBar
        className={classes.appbar}
        // elevation={0}
      >
        <Toolbar style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          {/* <Typography className={classes.appbar_title}>
                      Welcome to Admin page  
                    </Typography>
                    <Avatar className={classes.arvata_syle}><ExitToAppIcon/></Avatar>
                    <Avatar className={classes.arvata_syle}><SearchIcon/></Avatar>
                    <Avatar className={classes.arvata_syle}><NotificationsIcon/></Avatar>
                    <Avatar className={classes.arvata_syle}></Avatar> */}
          <AdminToolBar />
        </Toolbar>
      </AppBar>

      {/* create drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Adminstator
          </Typography>
        </div>
        <Divider/>
        {/* list & link */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.Page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;


//End of Main Export Section:---------------