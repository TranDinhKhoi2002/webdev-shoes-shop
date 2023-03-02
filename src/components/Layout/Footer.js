import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@mui/styles";

import { Container, Grid, Typography } from "@mui/material";

import SocialIcons from "@/components/Layout/SocialIcons";

const routes = [
  { name: "Home", link: "/" },
  { name: "History", link: "/history" },
  { name: "Bought", link: "/bought" },
];

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: "relative",
    bottom: 0,
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 ",
    margin: "auto",
  },
  link: {
    fontSize: "1.25em",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: theme.palette.secondary.main,
    fontSize: "1em",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const path = routes;
  const location = useLocation();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {path.map(({ name, link }) => (
            <Grid item key={link}>
              <Link to={link}>
                <Typography
                  className={classes.link}
                  style={{
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
        <Grid container direction="row" sx={{ margin: "1.2em 0" }}>
          <SocialIcons />
        </Grid>
        <Grid
          item
          container
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href="https://satoruakiyama.com"
          style={{
            textDecoration: "none",
          }}
          sx={{ justifyContent: "center" }}
        >
          <Typography className={classes.copylight}>&copy; Little Shop</Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
