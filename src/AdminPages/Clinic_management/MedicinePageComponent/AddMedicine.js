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
  inputTagStyle: {
    paddin: "10px",
  },
});

const Medicine_category = [
  {
    value: " ",
    label: " ",
  },
  {
    value: "Mouth",
    label: "Mouth",
  },
  {
    value: "Injection",
    label: "Injection",
  },
  {
    value: "Sachet",
    label: "Sachet",
  },
  {
    value: "Nasal",
    label: "Nasal",
  },
  {
    value: "Rectal",
    label: "Rectal",
  },

];

const StatusSelection = [
  {
    value: " ",
    label: " ",
  },
  ,
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Unavailable",
    label: "Unavailable",
  },
];

export default function AddMedicine({ open, setOpen, setdata }) {
  const handleClose = () => {
    setOpen(false);
    setfile(null);
  };
  const classes = useStyles();
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const hadleChangeMedicineCategory = (event) => {
    setCategory(event.target.value);
  };

  const [medicineName, setMedicineName,] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [status, setStatus] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [remark, setRemark] = useState("");
  const [description, setDescription] = useState("");
  const [medicinePic , setMedicinePic] = useState("");

  const [file, setfile] = useState(null);

  const handlechange = (e) => {
    console.log(e.target.files[0].name);

    setfile(URL.createObjectURL(e.target.files[0]));
  };
  const handleRemoveFile = () => {
    setfile(null);
  };
  const values = {
    someDate: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const showDate = new Date();
    const DisplayTodayDate =
      showDate.getDate() +
      " / " +
      (showDate.getMonth() + 1) +
      " / " +
      showDate.getFullYear();
    const DisplayCurrentTime =
      showDate.getHours() +
      " : " +
      showDate.getMinutes() +
      " : " +
      showDate.getSeconds();

    fetch("http://localhost:8000/Medicine", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        medicineName,
        category,
        company,
        qty,
        buyPrice,
        sellPrice,
        remark,
        status,
        medicinePic,
        description,
        DisplayTodayDate,
        DisplayCurrentTime,
      }),
    }).then((res) => {
      handleClose();
      res.json();
      // fetch data from api again
      // it will return response data
      // and set it here
      fetch("http://localhost:8000/Medicine")
        .then((res) => res.json())
        .then((data) => setdata(data));

      setStatus("");
      setCategory("");
    });
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
          Add Medicine
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setMedicineName(e.target.value)}
                  type="text"
                  label="Medicine Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="Category"
                  select
                  style={{ width: 260 }}
                  color="secondary"
                  label="Category"
                  value={category}
                  onChange={hadleChangeMedicineCategory}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {Medicine_category.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                  label="Company"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setQty(e.target.value)}
                  type="number"
                  label="Qty"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) =>  setBuyPrice(e.target.value)}
                  id="BuyPrice"
                  type="text"
                  label="Buy Price"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  
                />
              
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setSellPrice(e.target.value)}
                  id="SellPrice"
                  type="text"
                  label="Sell Price"
                  variant="outlined"
                  color="secondary"
                  step=".01"
                  fullWidth
                  required
                  
                />
              </Grid>
              <Grid item sx={12} sm={12}>
                <TextField
                  variant="outlined"
                  id="Status"
                  select
                  style={{ width: 550 }}
                  color="secondary"
                  label="Status"
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {StatusSelection.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item sx={12} sm={12}>
                <TextField
                  onChange={(e) => setRemark(e.target.value)}
                  type="text"
                  label="Remarks"
                  variant="outlined"
                  color="secondary"
                  rows={3}
                  multiline
                  fullWidth
                  required
                />
              </Grid>
              <Grid item sx={12} sm={12}>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  label="Description"
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
                  onChange={(e) => setMedicinePic(e.target.value)}
                  type="url"
                  label="Link url image"
                  variant="outlined"
                  color="secondary"
                  fullWidth
              
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
