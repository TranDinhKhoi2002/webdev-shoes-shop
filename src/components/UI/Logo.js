import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import sneakersLogo from "@/assets/images/sneakers.png";
// @mui
import { Box } from "@mui/material";

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = <Box component="img" src={sneakersLogo} sx={{ width: 40, height: 40, ...sx }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
