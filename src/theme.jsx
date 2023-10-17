import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
  palette: {
    primary: {
      main: "#181C32",
    },
    secondary: {
      main: "#A1A5B7",
    },
  },
  typography: {
    "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
  }
  // components: {
  //   MuiTypography: {
  //     defaultProps: {
  //       fontFamily: "'Bellefair', serif",
  //       fontSize: 18,
  //     },
  //   },
  //   MuiButtonBase: {
  //     defaultProps: {
  //       disableRipple: true,
  //     },
  //   },
  //   MuiMenu: {
  //     defaultProps: {
  //       disableScrollLock: true,
  //     },
  //   },
  // },
});