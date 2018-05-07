import React from 'react';
import PropTypes from 'prop-types';
import { AppBar531 } from '../../core/appBar531/appBar531.component';
import { withStyles } from 'material-ui';

const styles = theme => ({});

class Home extends React.Component {
    render() {
        return (
            <div>
                <AppBar531 title="Home" />
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

Home = withStyles(styles)(Home);
export { Home };