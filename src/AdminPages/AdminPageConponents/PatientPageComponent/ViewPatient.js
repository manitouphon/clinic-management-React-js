import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Avatar, DialogContent, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  Field: {
    marginTop: 20,
    marginBottom: 10,
    display: "block",
    marginRight:30
  },
  content_container:{
    padding:"-10px"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewPatient({open,setOpen,doctor  }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Patient Information
            </Typography>
          </Toolbar>
        </AppBar>
       <DialogContent className={classes.content_container} >
         <Grid container spacing={2} >
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={doctor.first_name}
                  type="text"
                  variant="outlined"
                  label="First name"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={doctor.last_name}
                  type="text"
                  label="Last name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {2} >
            <Avatar
            src = {doctor.profile}
            variant="rounded"
            style={{width:"200px", height:"200px", marginLeft:"30px",position:"absolute"}} 
            className={classes.Field}
            ></Avatar>
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={doctor.sex}
                  type="text"
                  label="Sex"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={doctor.age}
                  type="text"
                  label="Age"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={doctor.birthday}
                  type="text"
                  label="Birth Date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={doctor.blood_Group}
                  type="text"
                  label="Blood Group"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
            
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={doctor.phone}
                  type="text"
                  label="Phone Number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
            
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={doctor.email}
                  type="text"
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={doctor.place_of_birth}
                  type="text"
                  label="Place of birth"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={doctor.remark}
                  type="text"
                  label="Remark"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  multiline
                  rows={4}
                />
           </Grid>
         </Grid>
       </DialogContent>
      </Dialog>
    </>
  );
}
