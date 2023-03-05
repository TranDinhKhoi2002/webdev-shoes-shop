import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function EmptyHistory() {
  return (
    <Box sx={{ textAlign: "center", marginY: 20 }}>
      <Typography variant="h3">No history found</Typography>
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

export default EmptyHistory;
