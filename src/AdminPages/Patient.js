import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Button, fade, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import useFetch from "../API/useFetch";
import PatientListTable from "./AdminPageConponents/PatientPageComponent/PatientListTable";
const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    // marginTop:"30px",
    fontSize: "40px",
  },
  Add_doctor_btn: {
    margin: "20px",
    padding: "8px",
    marginRight: "100px",
  },
  textFiel: {
    width: "350px",
    marginLeft: "20px",
    padding: `10px, 10px`,
  },
  SearchIcon: {
    // marginTop:"30px",
    fontSize: "60px",
  },
  flex_item: {
    flexGrow: 1,
  },
  see_more_btn: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px",
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));



















//Main Export: ====================================================================================
function Patient() {
  
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const {data:Patients, isPanding, error , setdata} = useFetch('http://localhost:8000/Patient');
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className={classes.page}>
        <ArrowForwardIosIcon color="secondary" className={classes.arrow} />
        <h1>Patient</h1>
      </div>
      <hr />
      <div className={classes.page}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search???"
            backgroundColor="#e0e0e0"
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

        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="secondary"
          className={classes.Add_doctor_btn}
        >
          <AddBoxIcon style={{ marginRight: "3px" }} />
          Add Patient
        </Button>

        <hr />
      </div>
      {/* table for doing list doctor */}
      <div className="Doctor">
        {error && <div>{error}</div>}
        {isPanding && <div>Loading...</div>}
        {Patients && <PatientListTable open={open} setOpen={setOpen} PatientData={Patients} setdata={setdata}/>}
        
      </div>
      
    </div>
  );
}

export default Patient;
