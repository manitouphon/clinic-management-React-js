import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { IconButton, makeStyles, Typography} from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';



//Transistion Section:--------------------------TRANSISTION--------------------------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyle = makeStyles({
  btn_agree:{
    backgroundColor:"#f50057"
  },
  btn_cancel:{
    backgroundColor:"#00e676"
  },
  titleIcon:{
    background:"#f8bbd0",
    color:"#c62828",
   
    '&:hover':{
      backgroundColor: "#f50057",
      cursor:'default'
    },
    '& .MuiSvgIcon-root':{
      fontSize:"8rem"
    },
  
  },
  titleText:{
    textAlign:"center"
  }
})
//End of Transistion Section:---------------



//Main Export Section:--------------------------EXPORT--------------------------------
export default function ComfirmDeleteDialog({open, setOpen}) {
  const classes=useStyle()

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle 
        id="alert-dialog-slide-title"
        className={classes.titleText}
        >
        <IconButton disableRipple className={classes.titleIcon}>
            <NotListedLocation />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="h4">
            Are you sure?
            </Typography>
           You won't not get back the information !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>setOpen(false)} variant="contained" className={classes.btn_cancel}>
            Cancel
          </Button>
        <Button onClick={() => setOpen(false) } variant="contained" className={classes.btn_agree} >
            Yes,I'm sure
          </Button>
       
        </DialogActions>
      </Dialog>
    </div>
  );
}
//End of Main Export Section:---------------