import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "200px",
    height: "50px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
    marginTop: "15px",
  },
  input: {
    width: "100%",
    textAlign: "center",
    border: "none",
  },
  iconButton: {
    width: "30px",
    height: "30px",
    color: "#666",
  },
});

function NumberBox(props) {
  const { value, onChange, max, min } = props;
  const classes = useStyles();
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (event) => {
    let newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    let newValue = localValue + 1;
    if (newValue <= max) {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    let newValue = localValue - 1;
    if (newValue >= min) {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleDecrement} disabled={localValue <= min} className={classes.iconButton} >
          <RemoveIcon />
      </IconButton>
      <Input
        value={localValue}
        onChange={handleInputChange}
        type="number"
        inputProps={{
          min,
          max,
          className: classes.input,
        }}
      />
      <IconButton onClick={handleIncrement} disabled={localValue >= max} className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default NumberBox;