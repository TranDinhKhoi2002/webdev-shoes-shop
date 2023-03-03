import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import TotalCostCard from "@/components/History/TotalCard/TotalCar";
import { useState } from "react";

const rows = [
  {
    id: 1,
    imageUrl: "https://images.pexels.com/photos/6748706/pexels-photo-6748706.jpeg",
    name: "Example Website",
    price: 100,
    amount: 10,
    total: 100,
    boughtAt: "2023-3-3",
  },
  {
    id: 2,
    imageUrl: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    name: "Google",
    price: 10,
    amount: 100,
    total: 10,
    boughtAt: "2023-3-3",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    name: "Facebook",
    price: 100,
    amount: 10,
    total: 100,
    boughtAt: "2023-3-3",
  },
  {
    id: 4,
    imageUrl: "https://images.pexels.com/photos/6748706/pexels-photo-6748706.jpeg",
    name: "Example Website",
    price: 10,
    amount: 100,
    total: 100,
    boughtAt: "2023-3-3",
  },
  {
    id: 5,
    imageUrl: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    name: "Google",
    price: 100,
    amount: 100,
    total: 10,
    boughtAt: "2023-3-3",
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    name: "Facebook",
    price: 5,
    amount: 100,
    total: 100,
    boughtAt: "2023-3-3",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "2%",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    fontSize: 25,
    lineHeight: "20px",
    verticalAlign: "middle",
  },
  center: {
    color: theme.palette.secondary.white,
    width: "100%",
    fontSize: "1.5rem",
    margin: "auto",
    marginTop: "3%",
  },
  image: {
    width: "60px",
    height: "60px",
    marginTop: "-5%",
    marginBottom: "-6%",
    marginRight: "1%",
    borderRadius: "5px",
    float: "right",
  },
  imageOn: {
    width: "15%",
  },
  name: {
    width: "20%",
    align: "left",
  },
  price: {
    width: "15%",
    fontSize: "10px",
    color: "gray",
  },
  amount: {
    width: "15%",
    textAlign: "center",
  },
  total: {
    width: "15%",
    textAlign: "center",
  },
  boughtAt: {
    width: "20%",
    textAlign: "center",
  },
}));

export default function HistoryTables() {
  const classes = useStyles();
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  return (
    <Box>
      <Typography variant="h3">Your History</Typography>
      <TableContainer component={Paper} className={classes.center}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">BoughtAt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell className={classes.imageOn}>
                  <img src={row.imageUrl} alt={row.name} className={classes.image} />
                </StyledTableCell>
                <StyledTableCell className={classes.name}>{row.name}</StyledTableCell>
                <StyledTableCell className={classes.price}>${row.price}</StyledTableCell>
                <StyledTableCell className={classes.amount}>{row.amount}</StyledTableCell>
                <StyledTableCell className={classes.total}>${row.total}</StyledTableCell>
                <StyledTableCell className={classes.boughtAt}>{new Date().toLocaleString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TotalCostCard totalCost={total} />
      </div>
    </Box>
  );
}
