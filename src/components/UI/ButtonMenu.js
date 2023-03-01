import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/styles";

export default function ButtonMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="button-button"
        aria-controls={open ? "button-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: `${theme.palette.secondary.main}`,
          border: `1px solid ${theme.palette.secondary.main}`,
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
        <MenuItem onClick={handleClose}>Price Asc</MenuItem>
        <MenuItem onClick={handleClose}>Price Desc</MenuItem>
      </Menu>
    </div>
  );
}
