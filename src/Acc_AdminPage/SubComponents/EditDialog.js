import React, { useState } from "react";
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


//Tansistion Section:--------------------------TRANSISTION--------------------------------
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
//End of Transistion Section:---------------




//Sub-Components Section:--------------------------SUB-COMPONENTS--------------------------------
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
    },
    btn_remove: {
        marginLeft: "25px",
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
//End of Sub-Compoenents Section:---------------






//Main Export Section:--------------------------EXPORT--------------------------------
export default function EditDailog({ open, setOpen, setdata,type,databaseLink }) {

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles()
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

    const handleSubmit = (e) => {
        e.preventDefault();

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
            fetch({ databaseLink }, {
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
                    console.log(res.status)
                    if (res.status === 201) {
                        fetch({ databaseLink })
                            .then(response => response.json())
                            .then(data => setdata(data))

                    }
                })
                .then(() => setNotify({
                    isOpen: true,
                    message: 'Submitted successfully',
                    type: 'success'
                }));
        }

    };

    return (

        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
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
                                    require
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

                                />
                            </Grid>
                            <Grid item sx={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    id="Sex"
                                    select
                                    style={{ width: 240 }}
                                    color="secondary"
                                    label="Sex"
                                    value={sex}
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
                                    value={blood_Group}
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
                                        Image Upload
                  </Button>
                                </Grid>
                                <Grid item sm={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.btn_remove}
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
//End of Main Export-----------------------------------------------------------------
