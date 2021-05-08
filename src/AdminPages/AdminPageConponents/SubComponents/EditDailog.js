import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Avatar, Grid, Slide, TextField } from "@material-ui/core";




//THEME: ----------------------------------------------------------------------------------
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
  const [sex, setSex] = React.useState("");
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
  Field: {
    marginTop: 20,
    marginBottom: 20,
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
    width: "200px",
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



























//Main Export: ============================================================================================
export default function EditDailog({ open, setOpen, setdata, staff, staffType, dbUrl }) {


  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleClose = () => {
    setOpen(false);
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
  const [place_of_birth, setPlace_Of_Birth] = useState("");
  const [birthday, setBirthday] = useState("");

  const [file, setfile] = useState(null);
  useEffect(() => {
    setFirstName(staff.first_name);
    setlast_name(staff.last_name);
    setSex(staff.sex);
    setblood_Group(staff.blood_Group);
    setAge(staff.age);
    setRemark(staff.remark);
    setPhone(staff.phone);
    setEmail(staff.email);
    setPlace_Of_Birth(staff.place_of_birth);
    setBirthday(staff.birthday);
    setprofile(staff.profile);
  }, [open]);
  const handlechange = (e) => {
    console.log(e.target.files[0].name);
    setfile(URL.createObjectURL(e.target.files[0]));
  };
  const handleRemoveFile = () => {
    setfile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      first_name,
      last_name,
      sex,
      blood_Group,
      profile,
      age,
      remark,
      phone,
      email,
      place_of_birth,
      birthday
    );

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
      place_of_birth &&
      birthday
    ) {
      fetch(dbUrl + staff.id, {
        method: "PUT",
        mode: "cors",
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
          place_of_birth,
          birthday,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json(); 

          fetch(dbUrl)
          .then((res) => res.json())
          .then((data) => setdata(data));

          setOpen(false);

        });
    }
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
          Update {staffType} Information
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
                  value={first_name}
                  // onChange={(e)=>setstate({firstname: e.target.value})}
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
                  value={last_name}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="Sex"
                  defaultValue={staff.sex}
                  select
                  style={{ width: 240 }}
                  color="secondary"
                  label="Sex"
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
                  value={age}
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setBirthday(e.target.value)}
                  id="Birthday"
                  type="Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  label="Birth Date"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  value={birthday}
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="Blood_Group"
                  select
                  style={{ width: 240 }}
                  color="secondary"
                  label="Blood Group"
                  onChange={handleChange_blood_type}
                  defaultValue={staff.blood_Group}
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
                  type="text"
                  label="Phone number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  value={phone}
                />
              </Grid>
              <Grid item sx={12} sm={12} md={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  value={email}
                />
              </Grid>
              <Grid item sx={12} sm={12} md={12}>
                <TextField
                  onChange={(e) => setPlace_Of_Birth(e.target.value)}
                  type="text"
                  label="Place of Birth"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  defaultValue={place_of_birth}
                />
              </Grid>

              <Grid item sx={12} sm={12}>
                <TextField
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  label="Remarks"
                  variant="outlined"
                  color="secondary"
                  rows={4}
                  multiline
                  fullWidth
                  required
                  value={remark}
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
                      type="file"
                      id="filename"
                      onChange={handlechange}
                    />
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
                  type="url"
                  label="Link url image"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={profile}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.btn_save}
                >
                  Update
                </Button>
              </Grid>
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
