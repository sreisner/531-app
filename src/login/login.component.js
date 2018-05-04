import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import loginService from '../api/login/login.service';
import { Redirect } from 'react-router-dom';
import SnackBar531 from '../core/snackBar531/snackBar531.component';
import { Typography } from 'material-ui';

const styles = theme => ({
    root: theme.mixins.gutters({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        background: theme.palette.secondary
    }),
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        maxWidth: '300px'
    },
    input: {
        marginBottom: theme.spacing.unit * 2
    },
    submit: {
        flexGrow: 1
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
            loginSuccessful: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.setState({ loading: true });

        loginService
            .login(this.state.email, this.state.password)
            .then(() => this.setState({ loginSuccessful: true }))
            .catch(status => this.setState({ error: 'Login failed' }))
            .finally(() => this.setState({ loading: false }));
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { classes } = this.props;
        const { loginSuccessful, loading, error } = this.state;

        if (loginSuccessful) {
            return <Redirect to="/" />
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
                        onChange={this.handleChange} />
                    <TextField
                        className={classes.input}
                        label="Password"
                        value={this.state.password}
                        name="password"
                        type="password"
                        onChange={this.handleChange} />
                    <Button
                        variant="raised"
                        color="primary"
                        disabled={loading}
                        type="submit">Log In</Button>

                    {error &&
                    <SnackBar531 message={error} />
                    }
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Login);