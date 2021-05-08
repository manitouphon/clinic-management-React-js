import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {
  Chip,
  Input,
  InputLabel,
  makeStyles,
  Select,
  Slide,
  TextField,
  useTheme,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
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
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  roomTypeAndBedNum: {
    width: "197px",
    marginTop: "20px",
    marginRight: "10px",
  },
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getStyles(name, careTakerName, theme) {
  return {
    fontWeight:
      careTakerName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

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
    label: "Non_Ac",
  },
  {
    value: "VIP",
    label: "VIP",
  },
];

export default function ComfirmBadAllotment({ open, setOpen,Pateint,setPatients}) {
  const classes = useStyles();
  const theme = useTheme();
  const [roomType, setRoomtype] = useState("");
  const [bedNum, setBedNum] = useState("");
  const [careTakerName, setcareTakerName] = useState([]);

  const handleChangeCareTaker = (event) => {
    setcareTakerName(event.target.value);
  };
  const handleChangeRoomtype = (e) => {
    setRoomtype(e.target.value);
  };
  const handleChangeBedNum = (e) => {
    setBedNum(e.target.value);
  };
   
  
  const hanldeSubmit = (e) => {
    e.preventDefault();
    
    
    if(
      roomType && 
      bedNum && 
      careTakerName
      
    ){
    
      let objPush = {...Pateint,  pateint_bed: {bed_number: bedNum, type:roomType, care_Taker: careTakerName}};
      console.log(objPush)
      fetch("http://localhost:8000/Patient/"+ Pateint.id ,{
        method:"PUT",
        mode: "cors",
        headers:{"Content-Type": "application/json" },
        body: JSON.stringify(objPush),
      })
      .then((res) => res.json())
      .then(() =>{

        fetch("http://localhost:8000/Patient")
        .then((res) => res.json())
        .then((data) => setPatients(data));

        setOpen(false);
      });

    }

  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCareTaker = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseCareTaker}
        >
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off" onSubmit={hanldeSubmit}>
            <FormControl>
              <InputLabel id="demo-mutiple-chip-label">Care Taker</InputLabel>
              <Select
                color="secondary"
                fullWidth
                required
                multiple
                style={{ width: "400px" }}
                rows={3}
                value={careTakerName}
                onChange={handleChangeCareTaker}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, careTakerName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <TextField
                className={classes.roomTypeAndBedNum}
                required
                select
                label="Room Type"
                value={roomType}
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

              <TextField
                required
                className={classes.roomTypeAndBedNum}
                label="Bed number"
                value={bedNum}
                onChange={handleChangeBedNum}
                variant="outlined"
                color="secondary"
              />
            </div>
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              style={{ marginTop: "20px", float: "right", marginRight: "5px" }}
            >
              ok
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
