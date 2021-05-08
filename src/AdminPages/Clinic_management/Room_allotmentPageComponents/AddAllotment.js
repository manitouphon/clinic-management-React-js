import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  Avatar,
  Button,
  DialogContent,
  fade,
  InputBase,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useFetch from "../../../API/useFetch";
import Table from "@material-ui/core/Table";
import ComfirmBadAllotment from "./ComfirmBadAllotment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  Field: {
    marginTop: 20,
    marginBottom: 10,
    display: "block",
    marginRight: 30,
  },
  content_container: {
    padding: "-10px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),

    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAllotment({ open, setOpen, setPatients, Patients }) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (e) => {
    fetch("http://localhost:8000/Patient?first_name_like=" + e.target.value)
      .then((res) => res.json())
      .then((data) => setPatients(data));
  };
  const [openBedAlloment, setOpenBedAlloment] = useState(false);

  const handleClickOpen = (obj) => {
    setOpenBedAlloment(true);
    setPatient(obj);
  };

  const [Pateint, setPatient] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const isDisable = (keycheck) => {
    if (keycheck) {
      return true;
    }else{
      return false;
    }
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Bed Allotment
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.content_container}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              backgroundColor="#e0e0e0"
              variant="Outlined"
              onChange={handleSearch}
              style={{
                borderRadius: "10px",
                border: "solid 1px gray",
                padding: "7px",
                width: "550px",
                paddingLeft: "48px",
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <TableContainer component={Paper} style={{ marginTop: "10px" }}>
            <Table className={classes.Table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="left">Profile</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Sex</StyledTableCell>
                  <StyledTableCell align="left">Age</StyledTableCell>
                  <StyledTableCell align="left">Blood Group</StyledTableCell>
                  <StyledTableCell align="left">Phone number</StyledTableCell>
                  <StyledTableCell align="left">Address</StyledTableCell>
                  <StyledTableCell align="left">Allotment Time</StyledTableCell>
                  <StyledTableCell align="left">Allotment Date</StyledTableCell>
                  <StyledTableCell align="left">Option</StyledTableCell>
                </TableRow>
              </TableHead>

              {Patients.map((row) => (
                <TableBody>
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Avatar src={row.profile} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.first_name} {row.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.sex}</StyledTableCell>
                    <StyledTableCell align="left">{row.age}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.blood_Group}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.phone}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.place_of_birth}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.allotment_date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.allotment_time}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        disabled={isDisable(row.pateint_bed.bed_number)}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleClickOpen(row)}
                      >
                        +Allot
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <ComfirmBadAllotment
        open={openBedAlloment}
        setOpen={setOpenBedAlloment}
        Pateint={Pateint}
        setPatients={setPatients}
      />
    </>
  );
}
