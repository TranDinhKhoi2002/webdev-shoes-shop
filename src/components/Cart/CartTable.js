import { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  assignProductsToCart,
  fetchUpdateQuantity,
  fetchRemoveItemsFromCart,
  fetchCheckoutCart,
  addToCart,
  checkOut,
  removeFromCart,
  updateAmountOfProduct,
} from "@/redux/slices/cart";
import { selectCurrentUser } from "@/redux/slices/auth";
import * as _ from "lodash";
import Cookies from "js-cookie";

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
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const user = useSelector(selectCurrentUser);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (cartProducts || user) {
      console.log(cartProducts);
      setRows(cartProducts);
    }
  }, [cartProducts, user]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = cartProducts.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex(
      (item) => item.productId._id === row.productId._id && item.size === row.size
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
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

  const handleDelete = async () => {
    const currentRows = [...rows];
    const restRows = currentRows.filter(
      (row) => selected.findIndex((item) => item.productId._id === row.productId._id && item.size === row.size) === -1
    );
    setRows(restRows);
    setSelected([]);

    if (!Boolean(token)) {
      dispatch(assignProductsToCart({ cart: restRows }));
      return;
    }

    try {
      const removedItems = selected.map((item) => ({ productId: item.productId._id, size: item.size }));
      const { success } = await dispatch(fetchRemoveItemsFromCart({ items: removedItems })).unwrap();
      if (success) {
        toast.success("Removed items successfully!!");
      }
    } catch (error) {}
  };

  const isSelected = (row) =>
    selected.findIndex((item) => item.productId._id === row.productId._id && item.size === row.size) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cartProducts?.length) : 0;

  const handleCheckout = async () => {
    if (!Boolean(token)) {
      dispatch(checkOut());
      return;
    }

    try {
      const { success } = await dispatch(fetchCheckoutCart()).unwrap();
      if (success) {
        navigate("/");
        return toast.success("Ordered successfully!!");
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  // const handleIncreaseQuantity = async () => {

  // }

  const token = Cookies.get("token");
  const clickOnce = async (click, product, size, quantity, mode) => {
    console.log("here", quantity);
    if (!Boolean(token)) {
      if (mode === "dec") {
        dispatch(updateAmountOfProduct({ id: product._id, size, quantity }));
        return;
      }

      dispatch(addToCart({ productId: product, size, quantity }));
      return;
    }

    const { cart } = await dispatch(fetchUpdateQuantity({ productId: product._id, size, quantity })).unwrap();
    dispatch(assignProductsToCart({ cart }));

    setRows(cart);
    setClicks(click + 1);
  };

  const debouncedClick = useCallback(
    _.debounce(
      (clicks, product, size, quantity, mode) => {
        clickOnce(clicks, product, size, quantity, mode);
      },
      1000,
      { leading: true, trailing: false, maxWait: 1000 }
    ),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      {rows && rows.length > 0 && (
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
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="secondary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" align="center">
                            <img src={row.productId.image} width={100} height={100} alt="" />
                          </TableCell>
                          <TableCell align="center">{row.productId.name}</TableCell>
                          <TableCell align="center">{printPriceWithCommas(row.productId.price)}đ</TableCell>
                          <TableCell align="center">{printPriceWithCommas(row.size)}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                              <IconButton
                                onClick={() =>
                                  debouncedClick(
                                    clicks,
                                    row.productId,
                                    row.size,
                                    !Boolean(token) ? 1 : row.quantity + 1,
                                    "inc"
                                  )
                                }
                              >
                                <AddIcon />
                              </IconButton>
                              <Typography>{row.quantity}</Typography>
                              <IconButton
                                onClick={() => debouncedClick(clicks, row.productId, row.size, row.quantity - 1, "dec")}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            {printPriceWithCommas(row.productId.price * row.quantity)}đ
                          </TableCell>
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
              onClick={handleContinueShopping}
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

      {rows && rows?.length === 0 && <EmptyCart />}
    </Box>
  );
}
