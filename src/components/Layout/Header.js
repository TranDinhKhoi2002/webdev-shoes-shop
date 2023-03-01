import { Link } from "react-router-dom";
import React, { useState } from "react";

import {
  useTheme,
  useMediaQuery,
  Typography,
  SwipeableDrawer,
  List,
  ListItemText,
  IconButton,
  Toolbar,
  Grid,
  AppBar,
  ListItemButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";

const routes = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  // { name: "path name", link: "link url" }, like this
];

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: `5em`,
    // [theme.breakpoints.down("md")]: {
    //   marginBottom: "4em",
    // },
    // [theme.breakpoints.down("xs")]: {
    //   marginBottom: "2em",
    // },
  },
  logo: {
    color: theme.palette.secondary.main,
    width: "max-content",
    fontSize: "1.5rem",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: `50px`,
    width: `50px`,
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      height: `40px`,
      width: `40px`,
    },
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0 6em",
  },
  link: {
    fontSize: "1.25em",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const location = useLocation();

  const path = routes;

  const tabs = (
    <>
      <Grid container spacing={4} sx={{ justifyContent: "flex-end" }}>
        {path.map(({ name, link }) => (
          <Grid item key={link}>
            <Link to={link}>
              <Typography
                className={classes.link}
                sx={{
                  fontWeight: location.pathname === link && "bold",
                  borderBottom: location.pathname === link && "1px solid #757ce8",
                }}
              >
                {name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
  const drawer = (
    <>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {path.map(({ name, link }) => (
            <ListItemButton
              key={link}
              divider
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText disableTypography>
                <Link to={link}>
                  <Typography
                    style={{
                      color: location.pathname === link ? "primary" : "rgb(107 107 107)",
                      fontWeight: location.pathname === link && "bold",
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar
            disableGutters
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              width: "100%",
              padding: matches ? "0 16px" : "24px",
            }}
          >
            <Link to="/">
              <Typography className={classes.logo}>Little Shop</Typography>
            </Link>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;
