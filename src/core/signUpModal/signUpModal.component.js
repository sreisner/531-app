import { Button, Modal, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../context/authContext.component';

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
  input: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  eye: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    zIndex: 1,
    color: theme.palette.primary.light,
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

  handleSubmit = (event, register) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = this.state;

    this.setState({ loading: true });

    register(firstName, lastName, email, password)
      .then(() =>
        this.setState(
          {
            error: '',
            loading: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordIsMasked: true,
          },
          this.props.onClose()
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
    const { classes, open, onClose } = this.props;
    const { error, loading, passwordIsMasked } = this.state;

    return (
      <AuthConsumer>
        {({ register }) => (
          <Modal open={open} onClose={onClose}>
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
                onSubmit={e => this.handleSubmit(e, register)}
              >
                <TextField
                  className={classes.input}
                  label="First Name"
                  value={this.state.firstName}
                  name="firstName"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.input}
                  label="Last Name"
                  value={this.state.lastName}
                  name="lastName"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.input}
                  label="Email"
                  value={this.state.email}
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <RemoveRedEye
                    onClick={() => this.togglePasswordMask()}
                    className={classes.eye}
                  />
                  <TextField
                    className={classes.input}
                    label="Password"
                    value={this.state.password}
                    name="password"
                    type={passwordIsMasked ? 'password' : 'text'}
                    onChange={this.handleChange}
                  />
                </div>
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={loading || !this.formIsValid()}
                  className={classes.input}
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
    );
  }
}

SignUpModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpModal);
