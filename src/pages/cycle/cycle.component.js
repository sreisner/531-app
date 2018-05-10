import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from 'material-ui/styles';
import { AppBar531 } from '../../core/appBar531/appBar531.component';

const styles = theme => ({});

class Cycle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queryParams: {}
        };
    }

    componentDidMount() {
        this.setState({
            queryParams: queryString.parse(this.props.location.search)
        });
    }

    render() {
        return (
            <div>
                <AppBar531 title="Cycle" />
            </div>
        );
    }
}

Cycle.propTypes = {
    classes: PropTypes.object.isRequired
};

Cycle = withStyles(styles)(Cycle);
export { Cycle };