import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ButtonMenu({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (order) => {
    setAnchorEl(null);
    onClick(order);
  };

  return (
    <div>
      <Button
        id="button-button"
        aria-controls={open ? "button-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderRadius: 4,
          paddingX: 2,
          marginTop: {
            xs: 2,
            md: 0,
          },
        }}
      >
        Sort By
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="button-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "button-button",
        }}
      >
        <MenuItem onClick={() => handleClose("asc")}>Price Asc</MenuItem>
        <MenuItem onClick={() => handleClose("desc")}>Price Desc</MenuItem>
      </Menu>
    </div>
  );
}
