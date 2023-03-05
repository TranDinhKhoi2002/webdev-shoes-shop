import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import TotalCostCard from "@/components/History/TotalCostCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGetUserHistory } from "@/redux/slices/data";
import { useState } from "react";
import EmptyHistory from "./EmptyHistory";
import { printPriceWithCommas } from "@/utils/printPriceWithCommas";

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

export default function HistoryTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const { receipts } = await dispatch(fetchGetUserHistory()).unwrap();
      console.log(receipts);
      setHistory(receipts);
    };

    getHistory();
  }, [dispatch]);

  const historyProducts = [];
  history.forEach((item) => historyProducts.push(...item.products));
  console.log(historyProducts);

  const total = historyProducts.reduce((sum, cur) => sum + cur.quantity * +cur.unitPrice, 0);
  console.log(total);

  return (
    <Box>
      <Typography variant="h3">Your History</Typography>
      {history.length > 0 && (
        <>
          <TableContainer component={Paper} className={classes.center}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="right">
                    Image
                  </StyledTableCell>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="left">
                    Name
                  </StyledTableCell>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="left">
                    Price
                  </StyledTableCell>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="center">
                    Amount
                  </StyledTableCell>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="center">
                    Total
                  </StyledTableCell>
                  <StyledTableCell sx={{ textTransform: "uppercase" }} align="center">
                    Bought At
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyProducts.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell className={classes.imageOn}>
                      <img src={row.imageUrl} alt={row.name} className={classes.image} />
                    </StyledTableCell>
                    <StyledTableCell className={classes.name}>{row.name}</StyledTableCell>
                    <StyledTableCell className={classes.price}>{printPriceWithCommas(row.unitPrice)}đ</StyledTableCell>
                    <StyledTableCell className={classes.amount}>{row.quantity}</StyledTableCell>
                    <StyledTableCell className={classes.total}>
                      {printPriceWithCommas(row.quantity * +row.unitPrice)}đ
                    </StyledTableCell>
                    <StyledTableCell className={classes.boughtAt}>{new Date().toLocaleString()}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TotalCostCard totalCost={total} />
        </>
      )}
      {history.length === 0 && <EmptyHistory />}
    </Box>
  );
}
