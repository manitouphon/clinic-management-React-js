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
import RateReviewIcon from '@material-ui/icons/RateReview';
import ComfirmDeleteMedicine from "./ComfirmDeleteMedicine";
import EditMedicine_info from "./EditMedicine_info";
import AddMedicine from "./AddMedicine";
import ViewMedicine from "./ViewMedicine";

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

function MedicineListTable({ open, setOpen ,setdata, Medicines }) {
  const [openForDelete, setOpenForDelete] = React.useState(false);
  const [openForEdit, setOpenForEdit] = React.useState(false);
  const [openForView, setOpenForView] = React.useState(false);
  const [dataforEdit, setDataforEdit] = React.useState({});
  const [DataforView, setDataforView] = React.useState({});
  const classes = useStyles();
  const [id, setId] = useState();
  const handleClickOpenEdit = (obj) => {
    setDataforEdit(obj)
    setOpenForEdit(true);
   
  };

  const handleClickDelete = () => {
    fetch('http://localhost:8000/Medicine/'+id,{
      method:'DELETE'
    })
    .then(
    () =>{
      fetch('http://localhost:8000/Medicine')
      .then((res) => res.json())
      .then(data => setdata(data))
    }
    )

  };
  const handleClikeView = (obj) =>{
    setDataforView(obj)
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
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Remark</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Buy_price</StyledTableCell>
              <StyledTableCell>Sell_price</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {Medicines.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell conponent="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Avatar alt="Cindy Baker" src={row.medicinePic} />
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.medicineName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.category}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.company}
                </StyledTableCell>
                <StyledTableCell align="left">{row.remark}</StyledTableCell>
                <StyledTableCell align="left">{row.qty}</StyledTableCell>
                <StyledTableCell align="left">{row.buyPrice}</StyledTableCell>
                <StyledTableCell align="left">{row.sellPrice}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
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
      <ComfirmDeleteMedicine open={openForDelete} setOpen={setOpenForDelete} handleDelete={handleClickDelete}/>
      <EditMedicine_info open={openForEdit} setOpen={setOpenForEdit} setdata={setdata} medicine={dataforEdit}  />
      <AddMedicine open={open} setOpen={setOpen} data={Medicines} setdata={setdata} />
      <ViewMedicine open={openForView} setOpen={setOpenForView} medicine={DataforView} />
    </>
  );
}

export default MedicineListTable;
