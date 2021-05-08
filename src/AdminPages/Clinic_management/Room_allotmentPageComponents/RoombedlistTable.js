import {
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
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ComfirmDelete from "./ComfirmDelete";
import AddAllotment from "./AddAllotment";
import EditAllotment from "./EditAllotment";

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
     margin: "2px",
  },
  btn_edit: {
    backgroundColor: "#00e676",
     margin: "2px",
  },
  btn_view: {
    background: "#9c27b0",
    // marginLeft: "5px",
  },
});

function RoombedlistTable({ open, setOpen, setPatients, Patients }) {
  const [openForDelete, setOpenForDelete] = React.useState(false);
  const [openForEdit, setOpenForEdit] = React.useState(false);
  const [patientBedDataEdit, setPatientBedDataEdit] = React.useState({});
  const  [PatientDataFull ,setPatientDataFull] = useState();
  const classes = useStyles();

  const [patientDelete, setPatientDelete] = useState();
  const handleClickOpenEdit = (obj) => {
    setPatientBedDataEdit(obj);
    setOpenForEdit(true);
  };
  
  let objPush = {...patientDelete,pateint_bed:{} }
  const handleClickDelete = () => {
    fetch("http://localhost:8000/Patient/" +patientDelete.id, {
      method: "PUT",
      mode: "cors",
      headers:{"Content-Type": "application/json" },
      body: JSON.stringify(objPush),
    }).then(() => {
      fetch(" http://localhost:8000/Patient")
        .then((res) => res.json())
        .then((data) => setPatients(data));
    });
  };
  console.log(Patients);
  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="Doctor-table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Bed Number</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Patient Name</StyledTableCell>
              <StyledTableCell>Allotment Date</StyledTableCell>
              <StyledTableCell>Allotment Time</StyledTableCell>
              <StyledTableCell>Discharge Date</StyledTableCell>
              <StyledTableCell>Discharge time</StyledTableCell>
              <StyledTableCell>Care taker</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>
            </TableRow>
          </TableHead>

          {Patients.map((row) => ( row.pateint_bed.bed_number &&
            <TableBody>
              <StyledTableRow key={row.id}>
                <StyledTableCell conponent="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.pateint_bed.bed_number}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.pateint_bed.type}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.first_name} {row.last_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.allotment_date}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.allotment_time}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.pateint_bed.disChargeTime}
                </StyledTableCell>
                <StyledTableCell align="left">
                   {row.pateint_bed.disChargeDate}
                </StyledTableCell>
                <StyledTableCell align="left">
                {row.pateint_bed.care_Taker}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    variant="contained"
                    className={classes.btn_edit}
                    onClick={() => handleClickOpenEdit(row.pateint_bed) || setPatientDataFull(row)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_delete}
                    onClick={() => setPatientDelete(row) || setOpenForDelete(true)}
                  >
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
      <ComfirmDelete
        open={openForDelete}
        setOpen={setOpenForDelete}
        handleClickDelete={handleClickDelete}
      />
      <AddAllotment
        open={open}
        setOpen={setOpen}
        setPatients={setPatients}
        Patients={Patients}
      />
      <EditAllotment open={openForEdit} setOpen={setOpenForEdit} PateintBed={patientBedDataEdit} PatientDataFull={PatientDataFull} setPatients={setPatients}/>
    </>
  );
}

export default RoombedlistTable;
