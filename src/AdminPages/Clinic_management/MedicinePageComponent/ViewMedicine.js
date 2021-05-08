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

export default function ViewMedicine({open,setOpen,medicine  }) {
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
              Medicine Information
            </Typography>
          </Toolbar>
        </AppBar>
       <DialogContent className={classes.content_container} >
         <Grid container spacing={2} >
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={medicine.medicineName}
                  type="text"
                  variant="outlined"
                  label="Medicine Name"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={medicine.category}
                  type="text"
                  label="Category"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {2} >
            <Avatar
            src = {medicine.medicinePic}
            variant="rounded"
            style={{width:"200px", height:"200px", marginLeft:"30px",position:"absolute"}} 
            className={classes.Field}
            ></Avatar>
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={medicine.company}
                  type="text"
                  label="Company"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={medicine.qty}
                  type="text"
                  label="Qty"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={medicine.buyPrice}
                  type="text"
                  label="Buy Price"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                 value={medicine.sellPrice}
                  type="text"
                  label="Sell Price"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
            
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={medicine.DisplayTodayDate}
                  type="text"
                  label="Arrival Date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {5}>
           <TextField
                  className={classes.Field}
                  value={medicine.DisplayCurrentTime}
                  type="text"
                  label="Arrival Time"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
            
           </Grid>
           
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={medicine.status}
                  type="text"
                  label="Status"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  type="text"
                  label="Remark"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  multiline
                  rows={3}
                  value={medicine.remark}
                />
           </Grid>
           <Grid item sx={12} sm= {10}>
           <TextField
                  className={classes.Field}
                  value={medicine.description}
                  type="text"
                  label="Description"
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
