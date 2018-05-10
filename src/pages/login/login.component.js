import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
import { Typography } from 'material-ui';
import { LoginService } from '../../services/api/login/login.service';
import { SnackBar531 } from '../../core/snackBar531/snackBar531.component';

const styles = theme => ({
  root: theme.mixins.gutters({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    background: theme.palette.secondary,
  }),
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
  submit: {
    flexGrow: 1,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'shawn.reisner@gmail.com',
      password: 'password',
      loading: false,
      error: '',
      redirectToReferrer: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { onSuccess } = this.props;
    const { email, password } = this.state;

    event.preventDefault();

    this.setState({ loading: true });

    LoginService.login(email, password)
      .then(user => {
        this.setState({ redirectToReferrer: true });
        onSuccess(user);
      })
      .catch(status =>
        this.setState({
          error: 'Login failed',
          loading: false,
        })
      );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { classes } = this.props;
    const { redirectToReferrer, loading, error } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (redirectToReferrer || localStorage.isLoggedIn === 'true') {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <Typography variant="display4" color="inherit">
          5/3/1
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
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
            disabled={loading}
            type="submit"
          >
            Log In
          </Button>

          {error && <SnackBar531 message={error} />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

Login = withStyles(styles)(Login);
export { Login };
