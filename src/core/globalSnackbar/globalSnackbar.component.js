import { IconButton, Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React from 'react';
import { SnackbarConsumer } from '../../context/snackbarContext.component';

const styles = theme => ({});

class GlobalSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <SnackbarConsumer>
        {({ snackbarIsOpen, message, closeSnackbar }) => (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbarIsOpen}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            message={message}
            action={[
              <IconButton
                key="close"
                color="inherit"
                className={classes.close}
                onClick={closeSnackbar}
              >
                <Close />
              </IconButton>,
            ]}
          />
        )}
      </SnackbarConsumer>
    );
  }
}

export default withStyles(styles)(GlobalSnackbar);
