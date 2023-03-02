import { Container } from "@mui/material";
import HistoryTable from "../components/History/HistoryTable";

function Bought() {
  return (
    <Container sx={{ marginY: 8 }} maxWidth="xl">
      <HistoryTable />
    </Container>
  );
}

export default Bought;
