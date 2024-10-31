import { createTheme } from '@mui/material';

export const theme = createTheme({
  spacing: 4,

  palette: {
    background: {
      paper: '#fafafa',
    },
  },

  typography: {
    monospace: {
      fontFamily: 'monospace',
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          monospace: 'p',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },

    MuiPaper: {
      defaultProps: {
        sx: {
          padding: 5,
        },
      },
    },
  },
});
