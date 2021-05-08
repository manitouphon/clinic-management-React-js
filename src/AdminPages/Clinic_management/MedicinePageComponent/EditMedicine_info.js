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


const Medicine_category = [
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

export default function EditMedicine_info({ open, setOpen, setdata, medicine }) {
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
    setStatus(event.target.value);
  };
  const hadleChangeMedicineCategory = (event) => {
    setCategory(event.target.value);
  };

  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = React.useState("");
  const [qty, setQty] = React.useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [status, setStatus] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [remark, setRemark] = useState("");
  const [description, setDescription] = useState("");
  const [medicinePic, setMedicinePic] = useState("");

  const [file, setfile] = useState(null);
  useEffect(() => {
    setMedicineName(medicine.medicineName)
    setCategory(medicine.category);
    setCompany(medicine.company);
    setQty(medicine.qty);
    setBuyPrice(medicine.buyPrice);
    setStatus(medicine.status);
    setSellPrice(medicine.sellPrice);
    setRemark(medicine.remark);
    setDescription(medicine.description)
    setMedicinePic(medicine.medicinePic)
    setfile(medicine.medicinePic);
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

    fetch("http://localhost:8000/Medicine/" + medicine.id, {
      method: "PUT",
      mode: "cors",
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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json();

      fetch("http://localhost:8000/Medicine")
        .then((res) => res.json())
        .then((data) => setdata(data));

      setOpen(false);
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
          Update Medicine Information
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
                  defaultValue={medicine.medicineName}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="Category"
                  select
                  style={{ width: 240 }}
                  color="secondary"
                  label="Category"
                  value={category}
                  defaultValue={medicine.category}
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
                  defaultValue={medicine.company}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setQty(e.target.value)}
                  type="text"
                  label="Qty"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  defaultValue={medicine.qty}
                />
              </Grid>

              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setBuyPrice(e.target.value)}
                  id="BuyPrice"
                  type="number"
                  label="Buy Price"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  defaultValue={medicine.buyPrice}
                />
              </Grid>
              <Grid item sx={12} sm={6}>
                <TextField
                  onChange={(e) => setSellPrice(e.target.value)}
                  id="SellPrice"
                  type="number"
                  label="Sell Price"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  defaultValue={medicine.sellPrice}
                />
              </Grid>
              <Grid item sx={12} sm={12}>
                <TextField
                  variant="outlined"
                  id="Status"
                  select
                  style={{ width: 500 }}
                  color="secondary"
                  label="Status"
                  defaultValue={medicine.status}
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
                  defaultValue={medicine.remark}
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
                  defaultValue={medicine.description}
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
                  required
                  defaultValue={medicine.medicinePic}
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
