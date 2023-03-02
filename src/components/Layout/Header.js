import { Link, useNavigate } from "react-router-dom";
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
  AppBar,
  ListItemButton,
  Stack,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { makeStyles } from "@mui/styles";
import logo from "@/assets/images/sneakers.png";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import PopperButton from "../UI/PopperButton";

const routes = [
  { name: "Home", link: "/" },
  { name: "History", link: "/history" },
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
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  const location = useLocation();

  const path = routes;

  const tabs = (
    <Stack direction="row" spacing={8}>
      {path.map(({ name, link }) => (
        <Link to={link} key={link}>
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
      ))}
    </Stack>
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

  const popperButtonItems = [
    {
      title: "Đăng nhập",
      onClick: () => {
        navigate("/login");
      },
    },
    {
      title: "Đăng ký",
      onClick: () => {
        navigate("/signup");
      },
    },
  ];

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
              padding: matches ? "0 16px" : "18px",
            }}
          >
            <Stack direction="row" spacing={10} alignItems="center" justifyContent={"space-between"} width="100%">
              <Link to="/">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img src={logo} alt="" width={50} height={50} />
                  <Typography sx={{ fontSize: "1.8rem", color: "white" }}>Little Shop</Typography>
                </Stack>
              </Link>
              {matches ? drawer : tabs}
              {!matches && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PopperButton icon={<PersonIcon />} items={popperButtonItems} />
                  <Tooltip title="History">
                    <IconButton>
                      <ShoppingBagIcon />
                    </IconButton>
                  </Tooltip>
                  <Link to="/cart">
                    <Tooltip title="Cart">
                      <IconButton>
                        <ShoppingCartIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Stack>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMargin} />
    </>
  );
};
export default Header;
