import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  cssVariables: true,
  colorSchemes: { dark: true },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});
