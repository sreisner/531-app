import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';
import { PasswordInput } from '../passwordInput/passwordInput.component';
import { SignUpModalConsumer } from './signUpModalContext.component';

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
  eye: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
  },
  signUpButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordIsMasked: true,
      loading: false,
      error: '',
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, register, closeSignUpModal) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = this.state;

    this.setState({ loading: true });

    register(firstName, lastName, email, password)
      .then(() =>
        this.setState(
          {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordIsMasked: true,
            loading: false,
            error: '',
          },
          closeSignUpModal
        )
      )
      .catch(message =>
        this.setState({
          error: message,
          loading: false,
        })
      );
  };

  formIsValid = () => {
    const { firstName, lastName, email, password } = this.state;

    return firstName && lastName && email && password;
  };

  render() {
    const { classes } = this.props;
    const { error, loading, firstName, lastName, email, password } = this.state;

    return (
      <SignUpModalConsumer>
        {({ signUpModalIsOpen, closeSignUpModal }) => (
          <AuthConsumer>
            {({ register }) => (
              <Modal open={signUpModalIsOpen} onClose={closeSignUpModal}>
                <div className={classes.paper}>
                  <Typography
                    variant="display2"
                    color="inherit"
                    gutterBottom={true}
                  >
                    Sign Up
                  </Typography>
                  <form
                    className={classes.form}
                    onSubmit={e =>
                      this.handleSubmit(e, register, closeSignUpModal)
                    }
                  >
                    <TextField
                      label="First Name"
                      value={firstName}
                      name="firstName"
                      type="text"
                      onChange={this.handleChange}
                      margin="dense"
                    />
                    <TextField
                      label="Last Name"
                      value={lastName}
                      name="lastName"
                      type="text"
                      onChange={this.handleChange}
                      margin="dense"
                    />
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
                      className={classes.signUpButton}
                    >
                      Sign Up
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
      </SignUpModalConsumer>
    );
  }
}

SignUpModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpModal);
