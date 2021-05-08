import {
    AppBar,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {  HomeOutlined} from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
        Page: {
            background: '#f4f4f4',
            textAlign: `center`,
            padding: theme.spacing(3)
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
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar:{
            width:`calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        appbar_title:{
            flexGrow: 1
        }
    }

});

function ReceptionistLayout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: "Receptuionist Home",
            icon: <HomeOutlined color="secondary" />,
            path: '/Receptionist/mainPageReceptionist'
        },
        {
            text: "UserProfile",
            icon: <PersonOutlineOutlinedIcon  color="secondary" />,
            path: '/Receptionist/userProfile'
        },
        {
            text: "View Doctor",
            icon: <PersonOutlineOutlinedIcon  color="secondary" />,
            path: '/Receptionist/viewDoctorSchedule'
        }
    ];
    return (
        <div className={classes.root}>

            {/* create app bar */}
            <AppBar
            className={classes.appbar}
            // elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.appbar_title}>
                      Welcome to Receptionist Page 
                    </Typography>
                    <Typography>
                        Receptionist Name 
                    </Typography>
                    <Avatar src="" />
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
                        Receptionist drawer
          </Typography>
                </div>
                {/* list & link */}
                <List>
                    {menuItems.map(item => (
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

export default ReceptionistLayout;
