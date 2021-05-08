import {
  AppBar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
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
import AdminToolBar from "../AdminPages/AdminPageConponents/AdminToolBar";
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import StreetviewIcon from '@material-ui/icons/Streetview';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
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
      textAlign: "center",
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

function AdminLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
  const Itemlist_clinic_management =[
    {
      text: "Bed Allotment",
      icon: <AirlineSeatFlatIcon color="secondary" />,
      path: "/admin/Clinic_management/Room_allotment",
    },
    {
      text: "Birth Report",
      icon: <PregnantWomanIcon color="secondary" />,
      path: "/admin/Clinic_management/Birth_Report",
    },
    {
      text: "Blood bag",
      icon: <InvertColorsIcon color="secondary" />,
      path: "/admin/Clinic_management/Blood_bag",
    },
    {
      text: "Death report",
      icon: <SentimentVeryDissatisfiedIcon  color="secondary" />,
      path: "/admin/Clinic_management/Death_Report",
    },
    {
      text: "Medicine",
      icon: <LocalHospitalIcon color="secondary" />,
      path: "/admin/Clinic_management/Medicine",
    },
    {
      text: "Oparation Report",
      icon: <StreetviewIcon color="secondary" />,
      path: "/admin/Clinic_management/Operation_Report",
    },
  ]
  return (
    <div className={classes.root}>
      {/* create app bar */}
      <AppBar
        className={classes.appbar}
        // elevation={0}
      >
        <Toolbar style={{ paddingLeft: "0px", paddingRight: "0px" }}>
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
        <Divider />
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
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Clinic management
            </ListSubheader>
          }
        >
          {Itemlist_clinic_management.map((item) => (
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

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Payroll (Placeholder)" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Create Payroll" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="View Payroll" />
              </ListItem>
              
            </List>
          </Collapse>
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
