import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#94C94A',
    },
    background: {
      default: '#232324',
      paper: '#2C2C2C',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
});

export default theme;
