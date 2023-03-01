const PRIMARY = {
  main: "#212121",
};

const SECONDARY = {
  main: "#fafafa",
};

const INFO = {
  main: "#1890FF",
};

const SUCCESS = {
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
};

const WARNING = {
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
};

const ERROR = {
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
};

const palette = {
  mode: "light",
  common: { black: "#212121", white: "#fafafa" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  // background: { paper: '#fff', default: GREY[100], neutral: GREY[200] },
  action: {
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
