import { Instagram, Facebook, GitHub, Home } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const socialMedia = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  github: "https://github.com/",
  homepage: "http://localhost:3000",
};

const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Social = ({ color }) => {
  const classes = useStyles();
  const { instagram, facebook, github, homepage } = socialMedia;

  return (
    <Grid item container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item component={"a"} target="_blank" rel="noreferrer noopener" href={homepage}>
        <Home className={classes.snsIcon} color={color ? "primary" : "secondary"} />
      </Grid>
      <Grid item component={"a"} target="_blank" rel="noreferrer noopener" href={facebook}>
        <Facebook className={classes.snsIcon} color={color ? "primary" : "secondary"} />
      </Grid>
      <Grid item component={"a"} target="_blank" rel="noreferrer noopener" href={instagram}>
        <Instagram className={classes.snsIcon} color={color ? "primary" : "secondary"} />
      </Grid>
      <Grid item component={"a"} target="_blank" rel="noreferrer noopener" href={github}>
        <GitHub className={classes.snsIcon} color={color ? "primary" : "secondary"} />
      </Grid>
    </Grid>
  );
};

export default Social;
