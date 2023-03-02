import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

const rows = [
  {
    id: 1,
    imageUrl: "https://images.pexels.com/photos/6748706/pexels-photo-6748706.jpeg",
    name: "Example Website",
    votes: 5,
    votePeople: 15,
    price: 100,
  },
  {
    id: 2,
    imageUrl: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    name: "Google",
    votes: 2.5,
    votePeople: 25,
    price: 0,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    name: "Facebook",
    votes: 3.5,
    votePeople: 35,
    price: 50,
  },
  {
    id: 4,
    imageUrl: "https://images.pexels.com/photos/6748706/pexels-photo-6748706.jpeg",
    name: "Example Website",
    votes: 5,
    votePeople: 15,
    price: 100,
  },
  {
    id: 5,
    imageUrl: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg",
    name: "Google",
    votes: 2.5,
    votePeople: 25,
    price: 0,
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    name: "Facebook",
    votes: 3.5,
    votePeople: 35,
    price: 50,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 30,
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
    marginTop: "-10px",
    marginBottom: "-15px",
    marginLeft: "55%",
    borderRadius: "5px",
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
  return (
    <Box>
      <Typography variant="h3">Your History</Typography>
      <TableContainer component={Paper} className={classes.center}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell className={classes.imageOn}>
                  <img src={row.imageUrl} alt={row.name} className={classes.image} />
                </StyledTableCell>
                <StyledTableCell className={classes.name}>{row.name}</StyledTableCell>
                <StyledTableCell className={classes.price}>123</StyledTableCell>
                <StyledTableCell className={classes.amount}>2</StyledTableCell>
                <StyledTableCell className={classes.total}>2</StyledTableCell>
                <StyledTableCell className={classes.boughtAt}>{new Date().toLocaleString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
