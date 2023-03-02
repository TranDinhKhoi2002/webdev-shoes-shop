import { Box, Fade, IconButton, List, ListItem, ListItemText, Paper, Popper } from "@mui/material";
import { useState } from "react";

function PopperButton({ icon, items }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition sx={{ zIndex: 10000 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                {items.map((item) => (
                  <ListItem
                    key={item}
                    onClick={item.onClick}
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e6e6e6" } }}
                  >
                    <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
      <IconButton onClick={handleClick}>{icon}</IconButton>
    </Box>
  );
}

export default PopperButton;
