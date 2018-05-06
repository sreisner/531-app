import React from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/home.component';
import { Login } from './pages/login/login.component';
import { CalculateLifts } from './pages/calculateLifts/calculateLifts.component';
import { PrivateRoute } from './core/privateRoute/privateRoute.component';
import { UsersService } from './services/api/users/users.service';
import { LoginRoute } from './core/loginRoute/loginRoute.component';

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }

    componentDidMount() {
        UsersService.getCurrentUser()
            .then(user => this.setState({ loading: false, user }))
            .catch(() => this.setState({ loading: false }));
    }

    handleSuccessfulLogin(user) {
        this.setState({ user });
    }

    render() {
        const { classes } = this.props;
        const { loading, user } = this.state;

        if (loading) {
            return <h1>Loading...</h1>
        }

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <LoginRoute exact path="/login" component={Login} onSuccess={this.handleSuccessfulLogin} user={user} />
                    <PrivateRoute exact path="/" component={Home} user={user} />
                    <PrivateRoute exact path="/calculate-lifts" component={CalculateLifts} user={user} />
                </div>
            </BrowserRouter>
        );
    }
}

export default withRoot(withStyles(styles)(App));
