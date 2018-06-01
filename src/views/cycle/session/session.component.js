import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../../../core/loading/loading.component';

const styles = theme => ({});

let Session = props => <h1>Test</h1>;

Session.propTypes = {
  classes: PropTypes.object.isRequired,
};

Session = withStyles(styles)(Session);

class SessionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return <Session session={this.state.session} />;
  }
}

export default SessionContainer;
