import { Card, CardContent, Grid, Typography } from "@mui/material";
import { printPriceWithCommas } from "@/utils/printPriceWithCommas";

export default function TotalCostCard(props) {
  const { totalCost } = props;

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Your Total Spending
            </Typography>
            <Typography sx={{ fontSize: "2rem" }} color="text.secondary">
              {printPriceWithCommas(totalCost)}đ
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
