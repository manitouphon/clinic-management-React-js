import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { createMuiTheme } from '@material-ui/core/styles';

import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Slide,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MoneyTwoTone } from "@material-ui/icons";

//TEST-THEME

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00AFFF'
    },
    

  }
  
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (

    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles({
  roomTypeAndBedNum: {
    width: 250,
    marginTop: "20px",
 
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const RoomType = [
  {
    value: "Common",
    label: "Common",
  },
  {
    value: "Ac",
    label: "Ac",
  },
  {
    value: "Non-Ac",
    label: "Non-Ac",
  },
  {
    value: "VIP",
    label: "VIP",
  },
];

export default function EditAllotment({ open, setOpen,PateintBed,PatientDataFull,setPatients }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [type, setRoomtype] = useState({});
  const [bed_number, setbed_number] = useState("");
  const [care_Taker, setCare_taker] = useState("");
  const [selectedTime, setSelectedTime] = React.useState(
    new Date()
  );
  const [realTimePush, setRealTimePush]= useState(moment().format("hh:mm a"));
  const [realDatePush, setrealDatePush] = React.useState(
    moment().format("DD-MM-YYYY")
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() =>{
     setRoomtype(PateintBed.type)
     setbed_number(PateintBed.bed_number)
     setCare_taker(PateintBed.care_Taker)
  },[open])
  const handleChangeRoomtype = (e) => {
    setRoomtype(e.target.value);
  };
  const handleChangeBedNum = (e) => {
    setbed_number(e.target.value);
  };

  const [state, setState] = React.useState({
    checkedB: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if(state.checkedB === false){
      setRealTimePush(null)
      setSelectedDate(null)
      setSelectedTime(null)
      setrealDatePush(null)

    }
  };
  const handleDateChange = (date,value) => {
    setSelectedDate(date);
    setrealDatePush(value);
  };
  

  const handleTimeChange = (date,value) => {
    setSelectedTime(date);
    setRealTimePush(value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(realTimePush)
    console.log()
  
  let pateint_bed_info = {
    bed_number:bed_number,
    type:type,
    care_Taker:care_Taker,
    disChargeTime:realTimePush,
    disChargeDate:realDatePush
  };
  let objPush = {...PatientDataFull, pateint_bed:pateint_bed_info};
    fetch(" http://localhost:8000/Patient/"+ PatientDataFull.id ,{
      method:"PUT",
      mode: "cors",
      headers:{"Content-Type": "application/json" },
      body: JSON.stringify(objPush),
    })
    .then((res) => res.json())
    .then(() =>{
      fetch(" http://localhost:8000/Patient")
      .then((res) => res.json())
      .then((data) => setPatients(data));

      setOpen(false)
      setState(false)

    })
   
      

   }
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Bed allotment
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container specing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={(e) => setCare_taker(e.target.value)}
                  type="text"
                  label="Care Taker"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  defaultValue={care_Taker}
                 
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.roomTypeAndBedNum}
                  required
                  select
                  defaultValue={type}
                  label="Room Type"
                  value={type}
                  onChange={handleChangeRoomtype}
                  variant="outlined"
                  color="secondary"
                >
                  {RoomType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  className={classes.roomTypeAndBedNum}
                  label="Bed number"
                  value={bed_number}
                  onChange={handleChangeBedNum}
                  variant="outlined"
                  color="secondary"
                  defaultValue={bed_number}
                />
                 
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Discharng Mrs/Mr: Patient_Name"
                />
              </Grid>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      autoOk
                      color="secondary"
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      disabled={!state.checkedB}
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <KeyboardTimePicker
                      autoOk
                      color="secondary"
                      margin="normal"
                      id="time-picker"
                      mask="__:__ _M"
                      label="Time picker"
                      disabled={!state.checkedB}
                      value={selectedTime}
                      onChange={handleTimeChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      style={{ marginTop: "20px", float: "right", marginRight: "5px" }}
                      >
                        OK
                      </Button>
                  </Grid>
               
              </MuiPickersUtilsProvider>
              </ThemeProvider>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
