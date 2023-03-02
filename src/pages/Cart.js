import CartTable from "@/components/Cart/CartTable";
import { Container } from "@mui/material";

function Cart() {
  return (
    <Container sx={{ marginY: 8 }} maxWidth="xl">
      <CartTable />
    </Container>
  );
}

export default Cart;
