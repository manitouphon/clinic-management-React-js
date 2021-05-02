import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Avatar, Box, DialogContent, Grid, TextField } from '@material-ui/core';
import { Height } from '@material-ui/icons';

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
    width:"70%",
    margin:"auto"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewDoctor({open,setOpen}) {
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
              Doctor Information
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
       <DialogContent className={classes.content_container} >
         <Grid container spacing={2} >
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={"Ngann"}
                  type="text"
                  label="First name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={"Koemchhuy"}
                  type="text"
                  label="Last name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {2} >
            <Avatar
            variant="rounded"
            style={{width:"200px", height:"200px", display:"flex", justifyContent:"center", marginLeft:"30px",position:"absolute"}} 
            className={classes.Field}
            ></Avatar>
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={"M"}
                  type="text"
                  label="First name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={"33"}
                  type="Sex"
                  label="Age"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={"34/04/2013"}
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
                 value={"AB+"}
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
                  value={"012 34523235"}
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
                  value={"testing@gmail.com"}
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
                  value={"stress 24th Phnom Penh"}
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
                  value={"blah blahh....."}
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
