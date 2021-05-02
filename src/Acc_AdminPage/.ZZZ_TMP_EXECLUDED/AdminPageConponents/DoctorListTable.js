import {
  Avatar,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddDoctorDialog from "./AddDoctorDialog";
import { Fetch_data } from "../../API/Fetch_data";
import ComfirmDeleteDialog from "./ComfirmDeleteDialog";
import Notification from "./Notification";
import EditDailog from "./EditDailog";
import RateReviewIcon from '@material-ui/icons/RateReview';
import ViewDoctor from "./ViewDoctor";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  btn_delete: {
    backgroundColor: "#f50057",
    marginLeft: "5px",
  },
  btn_edit: {
    backgroundColor: "#00e676",
    marginRight: "5px",
  },
  btn_view:{
      background:"#9c27b0",
      marginLeft: "5px"
  }
});

function DoctorListTable({ open, setOpen }) {
  const [openForDelete, setOpenForDelete] = React.useState(false);
  const [openForEdit, setOpenForEdit] = React.useState(false);
  const [openForView, setOpenForView] = React.useState(false);
  const classes = useStyles();
  const doctor = Fetch_data("http://localhost:8000/Doctor");

  const handleClickOpenEdit = (id) => {
    setOpenForEdit(true);
  };
  const handleClickDelete = (id) => {
    setOpenForDelete(true);
  };
  const handleClikeView = (id) =>{
    setOpenForView(true);
  }

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="Doctor-table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Sex</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Blood Group</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctor.data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell conponent="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Avatar alt="Cindy Baker" src={row.profile} />
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.fist_name} {row.last_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.sex}</StyledTableCell>
                <StyledTableCell align="left">{row.age}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.blood_Group}
                </StyledTableCell>
                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">NV</StyledTableCell>
                <StyledTableCell align="left">NV</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    variant="contained"
                    className={classes.btn_edit}
                    onClick={() => handleClickOpenEdit(row.id)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_delete}
                    onClick={() => handleClickDelete(row.id)}
                  >
                    <DeleteIcon />
               
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_view}
                    onClick={() => handleClikeView(row.id)}
                  >
                    <RateReviewIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ComfirmDeleteDialog open={openForDelete} setOpen={setOpenForDelete} />
      <EditDailog open={openForEdit} setOpen={setOpenForEdit} setdata={doctor.setdata}/>
      <AddDoctorDialog open={open} setOpen={setOpen} setdata={doctor.setdata} />
      <ViewDoctor open={openForView} setOpen={setOpenForView}/>
    </>
  );
}

export default DoctorListTable;
