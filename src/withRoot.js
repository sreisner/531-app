import { grey, lightGreen } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Bowlby One SC',
    passwordInputFont: 'Ubuntu',
    subheading: {
      fontFamily: 'Ubuntu',
    },
    body1: {
      fontFamily: 'Ubuntu',
    },
  },
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: lightGreen[900],
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
