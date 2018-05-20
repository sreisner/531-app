import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Modal } from '@material-ui/core';
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

  handleSubmit = (event, login) => {
    event.preventDefault();

    const { onClose } = this.props;
    const { email, password } = this.state;

    this.setState({ loading: true });

    login(email, password)
      .then(user => {
        this.setState({
          loading: false,
          error: '',
        });

        onClose();
      })
      .catch(status =>
        this.setState({
          error: 'Login failed',
          loading: false,
        })
      );
  };

  render() {
    const { classes, open, onClose } = this.props;
    const { error, loading } = this.state;

    return (
      <AuthConsumer>
        {({ login }) => (
          <Modal open={open} onClose={onClose}>
            <div className={classes.paper}>
              <Typography
                variant="display2"
                color="inherit"
                gutterBottom={true}
              >
                5/3/1
              </Typography>
              <form
                className={classes.form}
                onSubmit={e => this.handleSubmit(e, login)}
              >
                <TextField
                  className={classes.input}
                  label="Email"
                  value={this.state.email}
                  name="email"
                  type="text"
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.input}
                  label="Password"
                  value={this.state.password}
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  className={classes.input}
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
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoginModal = withStyles(styles)(LoginModal);
export { LoginModal };
