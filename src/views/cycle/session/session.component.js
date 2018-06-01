import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../../core/loading/loading.component';
import CyclesService from '../../../services/api/cycles/cycles.service';

const styles = theme => ({});

let Session = props => <p>{props.session.jumpsThrows}</p>;

Session.propTypes = {
  classes: PropTypes.object.isRequired,
};

Session = withStyles(styles)(Session);

class SessionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { cycleId, sessionId } = this.props.match.params;
    CyclesService.getSession(cycleId, sessionId).then(session =>
      this.setState({ session, loading: false })
    );
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return <Session session={this.state.session} />;
  }
}

export default withRouter(SessionContainer);
