const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
};

const PRIMARY = {
  main: "#e7e7e7",
};

const SECONDARY = {
  main: "#212121",
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
  background: { paper: "#fafafa", default: GREY[100], neutral: GREY[200] },
  action: {
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
