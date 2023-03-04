import { useState, useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function TotalCostCard(props) {
  const { totalCost } = props;
  const classes = useStyles();

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Your Total Spending
            </Typography>
            <Typography sx={{ fontSize: "2rem" }} color="text.secondary">
              $1000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
