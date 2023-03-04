import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <ShoppingCartIcon sx={{ width: 200, height: 200, fontWeight: "400" }} />
      <Typography sx={{ fontSize: "1.8rem" }}>No products found in your cart</Typography>
      <Link to="/">
        <Button
          variant="contained"
          sx={{ paddingX: 6, paddingY: 2, fontSize: "1.2rem", mt: 3, textTransform: "uppercase" }}
        >
          Shop Now
        </Button>
      </Link>
    </Box>
  );
}

export default EmptyCart;
