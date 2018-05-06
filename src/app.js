import React, { Component } from 'react';
import withRoot from './withRoot';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/home/home.component';
import { Login } from './pages/login/login.component';
import { CalculateLifts } from './pages/calculateLifts/calculateLifts.component';
import Redirect from 'react-router-dom/Redirect';

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loggedIn: true
        };
    }

    render() {
        const { classes } = this.props;
        const { loading, loggedIn } = this.state;

        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <Route path="/" render={() => (
                        !loading && !loggedIn && <Redirect to="/login" />
                    )} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/calculate-lifts" component={CalculateLifts} />
                </div>
            </BrowserRouter>
        );
    }
}

export default withRoot(withStyles(styles)(App));
