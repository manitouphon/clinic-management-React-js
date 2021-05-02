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
import { Avatar, Grid, makeStyles, Slide, TextField } from "@material-ui/core";
// import Notification from "./Notification";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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
const useStyles = makeStyles({
  Field: {
    marginTop: 0,
    marginBottom: 0,
    padding: "10px",
    display: "block",
  },
  page: {
    backgroundColor: "#512da8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 300,
    width: 300,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  heading: {
    textAlign: "center",
  },
  btn_upload: {
    marginTop: "50px",
    width:"200px",
    
  },
  btn_remove: {
    marginLeft: "55px",
    marginTop: "10px",
  },
  btn_save: {
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "10px",
    paddingBottom: "10px",
    width: "200px",
  },
  sex_and_Blood_field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",

  },
  inputTagStyle:{
    paddin:"10px"
  }
});

const Blood_Group = [
  {
    value: " ",
    label: " ",
  },
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A-",
    label: "A-",
  },
  {
    value: "AB+",
    label: "AB-",
  },
  {
    value: "B+",
    label: "B+",
  },
  {
    value: "O+",
    label: "O+",
  },
  {
    value: "O-",
    label: "O-",
  },
];

const Sex = [
  {
    value: " ",
    label: " ",
  },
  ,
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Famale",
  },
];

export default function AddPharmacisttDialog({ open, setOpen, setdata }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleClose = () => {
    setOpen(false);
    setfile(null);
  };
  const classes = useStyles();
  const handleChange = (event) => {
    setSex(event.target.value);
  };

  const handleChange_blood_type = (event) => {
    setblood_Group(event.target.value);
  };

  const [first_name, setFirstName] = useState("");
  const [last_name, setlast_name] = useState("");
  const [sex, setSex] = React.useState("");
  const [blood_Group, setblood_Group] = React.useState("");
  const [profile, setprofile] = useState("");
  const [age, setAge] = useState("");
  const [remark, setRemark] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddres] = useState("");

  const [first_nameError, setFirstNameError] = useState(false);
  const [last_nameError, setlast_nameError] = useState(false);
  const [sexError, setSexError] = useState(false);
  const [blood_GroupError, setblood_GroupError] = React.useState(false);
  const [profileError, setprofileError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [file, setfile] = useState(null);

  const handlechange = (e) => {
    console.log(e.target.files[0].name);

    setfile(URL.createObjectURL(e.target.files[0]));
  };
  const handleRemoveFile = () => {
    setfile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstNameError(false);
    setlast_nameError(false);
    setSexError(false);
    setblood_GroupError(false);
    setAgeError(false);
    setRemarkError(false);
    setPhoneError(false);
    setEmailError(false);
    setAddressError(false);
    setprofileError(false);

    if (first_name == "") {
      setFirstNameError(true);
    }
    if (last_name == "") {
      setlast_nameError(true);
    }
    if (sex == "") {
      setSexError(true);
    }
    if (blood_Group == "") {
      setblood_GroupError(true);
    }
    if (profile == "") {
      setprofileError(true);
    }
    if (age == "") {
      setAgeError(true);
    }
    if (remark == "") {
      setRemarkError(true);
    }
    if (phone == "") {
      setPhoneError(true);
    }

    if (email == "") {
      setEmailError(true);
    }
    if (address == "") {
      setAddressError(true);
    }

    if (
      first_name &&
      last_name &&
      sex &&
      blood_Group &&
      profile &&
      age &&
      remark &&
      phone &&
      email &&
      address
    ) {
      fetch("http://localhost:8000/Doctor", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          sex,
          blood_Group,
          profile,
          age,
          remark,
          phone,
          email,
          address,
        }),
      })
        .then((res) => {
          handleClose();
          console.log(res.status);
          if (res.status === 201) {
            fetch("http://localhost:8000/Doctor")
              .then((response) => response.json())
              .then((data) => setdata(data));
          }
        })
        .then(() =>
          setNotify({
            isOpen: true,
            message: "Submitted successfully",
            type: "success",
          })
        );
    }
    // setdata(NewDoctorDator.data)
  };
  return (


    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add {staffType}
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sx={12} sm={6}>
                <TextField

                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  label="First name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={first_nameError}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField

                  onChange={(e) => setlast_name(e.target.value)}
                  type="text"
                  label="Last name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={last_nameError}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField

                  variant="outlined"
                  id="Sex"
                  select
                  style={{ width: 260 }}
                  color="secondary"
                  label="Sex"
                  value={sex}
                  error={sexError}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {Sex.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField

                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  label="Age"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={ageError}
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField

                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  label="Birth Date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={remarkError}
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField

                  variant="outlined"
                  id="Blood_Group"
                  select
                  style={{ width: 260 }}
                  color="secondary"
                  label="Blood Group"
                  value={blood_Group}
                  error={blood_GroupError}
                  onChange={handleChange_blood_type}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {Blood_Group.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item sx={12} sm={12} md={12}>
                <TextField

                  onChange={(e) => setPhone(e.target.value)}
                  error={phoneError}
                  type="text"
                  label="Phone number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={12} md={12}>
                <TextField

                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  type="email"
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={12} md={12}>
                <TextField

                  onChange={(e) => setAddres(e.target.value)}
                  error={addressError}
                  type="text"
                  label="Place of Birth"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item sx={12} sm={12}>
                <TextField
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  error={remarkError}
                  label="Remarks"
                  variant="outlined"
                  color="secondary"
                  rows={4}
                  multiline
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <Avatar
                  variant="rounded"
                  src={file}
                  style={{ width: 200, height: 200 }}
                />
              </Grid>
              <Grid item sx={12} sm={6}>

                <Grid item sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn_upload}
                  >
                    <input
                    className={classes.inputTagStyle}
                      type="file" id="filename"
                      onChange={handlechange} />
                  </Button>
                </Grid>
                <Grid item sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn_remove}
                    onClick={handleRemoveFile}
                  >
                    Remove
                    </Button>
                </Grid>
              </Grid>

              <Grid item sx={12} sm={12} md={12}>
                <TextField
                  onChange={(e) => setprofile(e.target.value)}
                  error={profileError}
                  type="url"
                  label="Link url image"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.btn_save}
                >
                  Save
                  </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent >
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
