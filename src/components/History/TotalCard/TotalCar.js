import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}));


export default function TotalCostCard(props) {
    const { totalCost } = props;
    const classes = useStyles();
    return (
      <Card>
        <CardContent className={classes.root}>
          <Typography variant="h6" gutterBottom align='right'>Total Cost: ${totalCost} </Typography>
        </CardContent>
      </Card>
      
    );
  }