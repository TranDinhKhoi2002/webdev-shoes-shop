import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import CartTableHead from "./CartTableHead";
import CartTableToolbar from "./CartTableToolbar";
import { printPriceWithCommas } from "@/utils/printPriceWithCommas";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function createData(image, name, price, amount) {
  return {
    image,
    name,
    price,
    amount,
  };
}

const dataRows = [
  createData(
    "https://drake.vn/image/cache/catalog/Palladium/77357-001-M/77357-001-M_1-300x300.jpg",
    "PALLADIUM PAMPA HI 1",
    399000,
    2
  ),
  createData(
    "https://drake.vn/image/cache/catalog/Palladium/77357-001-M/77357-001-M_1-300x300.jpg",
    "PALLADIUM PAMPA HI 2",
    399000,
    2
  ),
  createData(
    "https://drake.vn/image/cache/catalog/Palladium/77357-001-M/77357-001-M_1-300x300.jpg",
    "PALLADIUM PAMPA HI 3",
    399000,
    2
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CartTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(dataRows);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    const currentRows = [...rows];
    const restRows = currentRows.filter((row) => !selected.includes(row.name));
    setRows(restRows);
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleCheckout = () => {
    navigate("/");
    return toast.success("Ordered successfully!!");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {rows.length > 0 && (
        <>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <CartTableToolbar numSelected={selected.length} onDelete={handleDelete} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
                <CartTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="secondary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row.name)}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" align="center">
                            <img src={row.image} width={100} height={100} alt="" />
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{printPriceWithCommas(row.price)}đ</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <IconButton>
                                <AddIcon />
                              </IconButton>
                              <Typography>{row.amount}</Typography>
                              <IconButton>
                                <RemoveIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">{printPriceWithCommas(row.price * row.amount)}đ</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{ paddingX: 8, paddingY: 2, fontSize: "1rem", borderRadius: 4, textTransform: "uppercase" }}
            >
              Shop Now
            </Button>
            <Button
              variant="contained"
              sx={{ paddingX: 8, paddingY: 2, fontSize: "1rem", borderRadius: 4, textTransform: "uppercase" }}
              onClick={handleCheckout}
            >
              Check Out
            </Button>
          </Stack>
        </>
      )}

      {rows.length === 0 && <EmptyCart />}
    </Box>
  );
}
