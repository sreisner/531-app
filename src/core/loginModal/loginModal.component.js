import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';
import { PasswordInput } from '../passwordInput/passwordInput.component';
import { LoginModalConsumer } from './loginModalContext.component';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: '300px',
  },
  loginButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'shawn.reisner@gmail.com',
      password: 'password',
      loading: false,
      error: '',
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, login, closeLoginModal) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.setState({ loading: true });

    login(email, password)
      .then(() => {
        this.setState(
          {
            loading: false,
          },
          closeLoginModal
        );
      })
      .catch(message =>
        this.setState({
          error: 'Username/password is incorrect.',
          loading: false,
        })
      );
  };

  formIsValid = () => {
    const { email, password } = this.state;

    return email && password;
  };

  render() {
    const { classes } = this.props;
    const { error, loading, email, password } = this.state;

    return (
      <LoginModalConsumer>
        {({ loginModalIsOpen, closeLoginModal }) => (
          <AuthConsumer>
            {({ login }) => (
              <Modal open={loginModalIsOpen} onClose={closeLoginModal}>
                <div className={classes.paper}>
                  <Typography
                    variant="display2"
                    color="inherit"
                    gutterBottom={true}
                  >
                    Log In
                  </Typography>
                  <form
                    className={classes.form}
                    onSubmit={e => this.handleSubmit(e, login, closeLoginModal)}
                  >
                    <TextField
                      label="Email"
                      value={email}
                      name="email"
                      type="email"
                      onChange={this.handleChange}
                      margin="dense"
                    />
                    <PasswordInput
                      label="Password"
                      value={password}
                      name="password"
                      onChange={this.handleChange}
                      margin="dense"
                    />
                    <Button
                      variant="raised"
                      color="primary"
                      type="submit"
                      disabled={loading || !this.formIsValid()}
                      className={classes.loginButton}
                    >
                      Log In
                    </Button>
                    {error && (
                      <Typography variant="caption" color="error">
                        {error}
                      </Typography>
                    )}
                  </form>
                </div>
              </Modal>
            )}
          </AuthConsumer>
        )}
      </LoginModalConsumer>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginModal);
