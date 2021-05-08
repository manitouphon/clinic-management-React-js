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
import React, {  useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddStaffDialog from "./AddStaffDialog";
import ComfirmDeleteDialog from "./ComfirmDeleteDialog";
import EditDailog from "./EditDailog";
import RateReviewIcon from '@material-ui/icons/RateReview';
import ViewStaff from "./ViewStaff";





//THEME: -------------------------------------------------------------------------
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
    margin: "3px",
  },
  btn_edit: {
    backgroundColor: "#00e676",
    margin: "3px",
  },
  btn_view:{
      background:"#9c27b0",
      margin: "3px"
  }
});





















//Main Export: ====================================================================================
function StaffListTable({ open, setOpen ,setdata, staffData, staffType, dbUrl }) {
  const [openForDelete, setOpenForDelete] = React.useState(false);
  const [openForEdit, setOpenForEdit] = React.useState(false);
  const [openForView, setOpenForView] = React.useState(false);
  const [staffDataforEdit, setStaffDataforEdit] = React.useState({});
  const [staffDataforView, setStaffDataforView] = React.useState({});
  const classes = useStyles();
  const [id, setId] = useState();
  const handleClickOpenEdit = (obj) => {
    setStaffDataforEdit(obj)
    setOpenForEdit(true);
   
  };

  const handleClickDelete = () => {
    fetch(dbUrl+"/" + id,{
      method:'DELETE'
    })
    .then(
    (res) =>{
      fetch(dbUrl)
      .then((res) => res.json())
      .then(data => setdata(data))
    }
    )

  };
  const handleClikeView = (obj) =>{
    setStaffDataforView(obj)
    setOpenForView(true);
  }

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label= {{staffType} + "-table"} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Profile</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Sex</StyledTableCell>
              <StyledTableCell>Age</StyledTableCell>
              <StyledTableCell>Blood Group</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Place of birth</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell conponent="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Avatar alt="Cindy Baker" src={row.profile} />
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
                <StyledTableCell align="left">{row.place_of_birth}</StyledTableCell>
                <StyledTableCell align="left">{row.DisplayTodayDate}</StyledTableCell>
                <StyledTableCell align="left">{row.DisplayCurrentTime}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    variant="contained"
                    className={classes.btn_edit}
                    onClick={() => handleClickOpenEdit(row)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_delete}
                    onClick={() => setId(row.id) || setOpenForDelete(true)}
                  >
                    <DeleteIcon />
               
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn_view}
                    onClick={() => handleClikeView(row)}
                  >
                    <RateReviewIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ComfirmDeleteDialog open={openForDelete} setOpen={setOpenForDelete} handleDelete={handleClickDelete}/>
      <EditDailog staffType={staffType} dbUrl={dbUrl} open={openForEdit} setOpen={setOpenForEdit} setdata={setdata} staff={staffDataforEdit}  />
      <AddStaffDialog staffType={staffType} dbUrl={dbUrl} open={open} setOpen={setOpen} data={staffData} setdata={setdata} />
      <ViewStaff staffType={staffType} dbUrl={dbUrl} open={openForView} setOpen={setOpenForView} staff={staffDataforView} />
    </>
  );
}

export default StaffListTable;
