import React from 'react';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-block',
      fontSize: 25,
      lineHeight: '20px',
      verticalAlign: 'middle',
    },
    star: {
      color: 'green',
      marginRight: 2,
    },
    emptyStar: {
      color: '#D7D7D9',
      marginRight: 2,
    },
  }));

export default function Rating({ value }) {
  const classes = useStyles();
  const rating = Math.round(value * 5) / 5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className={classes.star}>★</span>);
    } else {
      stars.push(<span key={i} className={classes.emptyStar}>★</span>);
    }
  }
  return <div className={classes.root}>{stars}</div>;
}